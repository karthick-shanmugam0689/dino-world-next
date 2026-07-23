// Minimal GitHub REST client for the add-dino trigger + status poller.
// Deliberately dependency-free (plain fetch) — this is two small server-only
// routes, not worth pulling in @octokit for.

const OWNER = 'karthick-shanmugam0689'
const REPO = 'dino-world-next'
const WORKFLOW_FILE = 'add-dino.yml'

function authHeaders() {
  const token = process.env.GH_DISPATCH_TOKEN
  if (!token) throw new Error('GH_DISPATCH_TOKEN is not configured')
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

const DAILY_RUN_LIMIT = 20 // ~$0.50-0.60 in agent tokens per run, so worst case ~$10-12/day

export async function checkAddDinoQuota(): Promise<{ ok: true } | { ok: false; message: string; status?: number }> {
  const today = new Date().toISOString().slice(0, 10)
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/runs` +
      `?created=${encodeURIComponent('>=' + today)}&per_page=100`,
    { headers: authHeaders() },
  )
  // Fail closed on quota API errors — avoid unbounded spend when we cannot read the counter.
  if (!res.ok) {
    return {
      ok: false,
      message: 'Could not verify today’s run quota — try again in a few minutes.',
      status: 503,
    }
  }

  const data = (await res.json()) as { total_count: number; workflow_runs: WorkflowRun[] }

  if (data.workflow_runs.some((r) => r.status !== 'completed')) {
    return { ok: false, message: 'Another dino is already being researched — try again in a few minutes.', status: 429 }
  }
  if (data.total_count >= DAILY_RUN_LIMIT) {
    return { ok: false, message: `Hit today's limit of ${DAILY_RUN_LIMIT} runs — try again tomorrow.`, status: 429 }
  }
  return { ok: true }
}

export async function dispatchAddDinoWorkflow(dinoName: string, requestId: string) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
    {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref: 'main',
        inputs: { dino_name: dinoName, request_id: requestId },
      }),
    },
  )
  if (!res.ok) {
    throw new Error(`Failed to dispatch workflow: ${res.status} ${await res.text()}`)
  }
}

interface WorkflowRun {
  id: number
  status: string
  conclusion: string | null
  name: string | null
  display_title: string
  html_url: string
}

/** workflow_dispatch doesn't return a run id, so we find it by the run-name we embedded. */
export async function findRunByRequestId(requestId: string): Promise<WorkflowRun | null> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/runs?event=workflow_dispatch&per_page=10`,
    { headers: authHeaders() },
  )
  if (!res.ok) return null
  const data = (await res.json()) as { workflow_runs: WorkflowRun[] }
  return (
    data.workflow_runs.find(
      (r) => r.name?.includes(requestId) || r.display_title?.includes(requestId),
    ) ?? null
  )
}

interface JobStep {
  name: string
  status: string
  conclusion: string | null
}
interface Job {
  id: number
  name: string
  steps: JobStep[]
}

export async function getRunJob(runId: number): Promise<Job | null> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs/${runId}/jobs`,
    { headers: authHeaders() },
  )
  if (!res.ok) return null
  const data = (await res.json()) as { jobs: Job[] }
  return data.jobs[0] ?? null
}

/**
 * Find the PR opened for this request_id (embedded in the PR body as
 * `request_id: <id>`). Prefer Issues Search; fall back to listing recent PRs.
 */
export async function findPrByRequestId(requestId: string): Promise<string | null> {
  const marker = `request_id: ${requestId}`
  try {
    const q = encodeURIComponent(`repo:${OWNER}/${REPO} is:pr ${marker}`)
    const res = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=5`, {
      headers: authHeaders(),
    })
    if (res.ok) {
      const data = (await res.json()) as { items?: Array<{ html_url: string; body?: string | null }> }
      const hit = data.items?.find((i) => i.body?.includes(marker))
      if (hit) return hit.html_url
    }
  } catch {
    // fall through
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/pulls?state=all&per_page=20&sort=created&direction=desc`,
      { headers: authHeaders() },
    )
    if (!res.ok) return null
    const prs = (await res.json()) as Array<{ html_url: string; body?: string | null }>
    return prs.find((p) => p.body?.includes(marker))?.html_url ?? null
  } catch {
    return null
  }
}
