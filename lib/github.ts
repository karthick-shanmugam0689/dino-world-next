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
  status: string // 'queued' | 'in_progress' | 'completed'
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

/** Best-effort scrape of the PR URL from the "Filing the paperwork" step's log (gh pr create prints it). */
export async function findPrUrlInJobLog(jobId: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/actions/jobs/${jobId}/logs`,
      { headers: authHeaders() },
    )
    if (!res.ok) return null
    const text = await res.text()
    const match = text.match(/https:\/\/github\.com\/[^\s]+\/pull\/\d+/)
    return match?.[0] ?? null
  } catch {
    return null
  }
}
