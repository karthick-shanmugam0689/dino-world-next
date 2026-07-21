import Link from 'next/link'
import { dinosaurs, getFamily } from '../data/dinosaurs'
import { DinoIcon } from './DinoIcon'

const sorted = [...dinosaurs].sort((a, b) => a.name.localeCompare(b.name))

// group alphabetically by first letter, in order
const groups = sorted.reduce<Record<string, typeof dinosaurs>>((acc, dino) => {
  const letter = dino.name[0].toUpperCase()
  ;(acc[letter] ??= []).push(dino)
  return acc
}, {})
const letters = Object.keys(groups).sort()

// No client hooks or browser APIs here, so this renders as a Server Component.
export function DinoIndexView() {
  return (
    <main className="page index-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="crumb-sep">›</span>
        <span className="crumb-current">All dinosaurs</span>
      </nav>

      <header className="family-header">
        <p className="family-period">A–Z index</p>
        <h1>Every dinosaur in the guide</h1>
        <p className="family-desc">
          All {dinosaurs.length} species, sorted alphabetically. Jump to a letter or scroll the herd.
        </p>
      </header>

      <div className="alpha-jump">
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`}>
            {l}
          </a>
        ))}
      </div>

      {letters.map((letter) => (
        <section className="alpha-group" key={letter} id={`letter-${letter}`}>
          <h2 className="alpha-heading">{letter}</h2>
          <ul className="index-list">
            {groups[letter].map((dino) => (
              <li key={dino.id} className="index-li">
                <Link href={`/dino/${dino.id}`} className="index-row" style={{ ['--tint' as string]: dino.color }}>
                  <span className="index-row-icon">
                    <DinoIcon kind={dino.silhouette} title={dino.name} />
                  </span>
                  <span className="index-row-main">
                    <span className="index-row-name">{dino.name}</span>
                    <span className="index-row-meaning">"{dino.meaning}"</span>
                  </span>
                  <span className="index-row-family">{getFamily(dino.familyId)?.name}</span>
                  <span className={`chip chip-${dino.diet.toLowerCase()} index-row-diet`}>{dino.diet}</span>
                  <span className="index-row-len">{dino.lengthM} m</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
