import type { SilhouetteKey } from '../data/types'

interface Props {
  kind: SilhouetteKey
  className?: string
  title?: string
}

/**
 * Stylized side-profile silhouettes, all in a 120x80 viewBox facing right.
 * Drawn with currentColor so cards/pages can tint them per species.
 */
export function DinoIcon({ kind, className, title }: Props) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="currentColor"
      role="img"
      aria-label={title ?? kind}
    >
      {SILHOUETTES[kind]}
    </svg>
  )
}

const eyeFill = 'var(--icon-eye, #101a16)'

const SILHOUETTES: Record<SilhouetteKey, React.ReactNode> = {
  trex: (
    <g>
      {/* tail */}
      <path d="M2 42 L54 34 L54 54 Z" />
      {/* body */}
      <ellipse cx="62" cy="44" rx="19" ry="13" transform="rotate(-8 62 44)" />
      {/* neck */}
      <path d="M70 38 C74 28 78 20 84 15 L94 22 C87 28 82 35 80 42 Z" />
      {/* skull with open jaw */}
      <path d="M82 8 L106 11 L113 17 L111 23 L95 26 L105 33 L99 38 L87 29 L80 26 C79 19 80 13 82 8 Z" />
      <circle cx="90" cy="15" r="2.4" fill={eyeFill} />
      {/* tiny arm */}
      <path d="M73 42 l8 4 l-2.5 4 l-7 -4 z" />
      {/* far leg */}
      <path opacity="0.65" d="M64 48 C64 58 66 63 63 69 L61 74 L72 74 L69 66 L71 54 Z" />
      {/* near leg */}
      <path d="M50 48 C48 58 52 64 49 70 L46 74 L59 74 L55 67 L58 54 Z" />
    </g>
  ),
  raptor: (
    <g>
      {/* long stiff tail */}
      <path d="M2 33 L52 38 L52 47 Z" />
      {/* body */}
      <ellipse cx="61" cy="42" rx="16" ry="9" transform="rotate(-10 61 42)" />
      {/* neck */}
      <path d="M70 37 C75 30 79 26 85 23 L92 30 C86 33 81 37 78 43 Z" />
      {/* head with pointed snout */}
      <path d="M83 18 L104 23 L112 28 L103 32 L94 33 L82 29 C81 25 81 21 83 18 Z" />
      <circle cx="90" cy="24" r="2" fill={eyeFill} />
      {/* feathered arm */}
      <path d="M64 42 l11 5 l-4 5 l-9 -6 z" />
      {/* far leg */}
      <path opacity="0.65" d="M64 46 C64 54 68 56 66 62 L63 70 L60 74 L71 74 L68 65 L71 52 Z" />
      {/* near leg, bent, with sickle claw */}
      <path d="M54 47 C52 55 58 57 56 63 L52 70 L48 74 L60 74 L58 66 L62 54 Z" />
      <path d="M50 73 C44 71 44 65 49 63 L51 68 Z" />
    </g>
  ),
  ceratops: (
    <g>
      {/* tail */}
      <path d="M5 52 L40 46 L40 61 Z" />
      {/* body */}
      <ellipse cx="54" cy="52" rx="23" ry="14" />
      {/* frill */}
      <ellipse cx="84" cy="35" rx="11" ry="15" transform="rotate(14 84 35)" />
      {/* head + beak */}
      <path d="M82 28 L104 39 L113 47 L103 53 L88 54 C82 49 80 37 82 28 Z" />
      <circle cx="93" cy="41" r="2.2" fill={eyeFill} />
      {/* brow horns */}
      <path d="M92 32 C94 22 99 16 106 13 L101 26 C97 28 94 30 93 34 Z" />
      <path d="M87 30 C88 23 91 18 96 15 L92 27 C90 28 88 29 87 32 Z" />
      {/* nose horn */}
      <path d="M102 42 L107 33 L110 44 Z" />
      {/* legs */}
      <path opacity="0.65" d="M44 58 h8 l-1 16 h-7 Z" />
      <path opacity="0.65" d="M64 58 h8 l-1 16 h-7 Z" />
      <path d="M36 60 h9 v14 h-9 Z" />
      <path d="M58 60 h9 v14 h-9 Z" />
    </g>
  ),
  stego: (
    <g>
      {/* raised tail */}
      <path d="M4 36 L28 46 L23 56 L3 44 Z" />
      {/* thagomizer spikes */}
      <path d="M7 36 L2 24 L12 33 Z" />
      <path d="M14 40 L12 27 L20 37 Z" />
      {/* body */}
      <ellipse cx="50" cy="51" rx="27" ry="15" />
      {/* back plates */}
      <path d="M28 40 L33 26 L40 38 Z" />
      <path d="M40 36 L46 20 L53 34 Z" />
      <path d="M53 34 L60 20 L66 35 Z" />
      <path d="M66 37 L73 26 L78 40 Z" />
      {/* neck + small low head */}
      <path d="M72 46 C79 48 85 52 90 58 L86 63 L76 60 Z" />
      <path d="M85 56 C91 55 96 57 99 61 L96 65 L85 63 Z" />
      <circle cx="93" cy="60" r="1.6" fill={eyeFill} />
      {/* legs */}
      <path opacity="0.65" d="M38 60 h8 l-1 14 h-7 Z" />
      <path opacity="0.65" d="M62 60 h8 l-1 14 h-7 Z" />
      <path d="M30 61 h9 v13 h-9 Z" />
      <path d="M54 61 h9 v13 h-9 Z" />
    </g>
  ),
  sauropod: (
    <g>
      {/* tail */}
      <path d="M2 56 L36 49 L36 62 Z" />
      {/* body */}
      <ellipse cx="52" cy="54" rx="22" ry="13" />
      {/* tall neck */}
      <path d="M62 47 C71 37 77 25 79 10 L90 12 C88 28 82 41 73 52 Z" />
      {/* small head */}
      <ellipse cx="86" cy="9" rx="8" ry="5.5" />
      <circle cx="89" cy="8" r="1.6" fill={eyeFill} />
      {/* legs — front longer, giraffe stance */}
      <path opacity="0.65" d="M42 60 h8 l-1 15 h-7 Z" />
      <path opacity="0.65" d="M62 58 h8 l-1 17 h-7 Z" />
      <path d="M34 61 h9 v14 h-9 Z" />
      <path d="M55 59 h9 v16 h-9 Z" />
    </g>
  ),
  spino: (
    <g>
      {/* tail */}
      <path d="M2 46 L50 39 L50 55 Z" />
      {/* sail */}
      <path d="M42 40 C44 22 58 14 68 17 C78 20 83 30 82 38 Z" />
      {/* body */}
      <ellipse cx="61" cy="46" rx="20" ry="11" transform="rotate(-6 61 46)" />
      {/* neck */}
      <path d="M73 40 C77 34 82 30 88 27 L93 34 C87 37 83 41 81 45 Z" />
      {/* long crocodile snout */}
      <path d="M85 22 L114 28 L114 33 L97 35 L86 32 C85 28 84 25 85 22 Z" />
      <circle cx="91" cy="27" r="1.9" fill={eyeFill} />
      {/* arm */}
      <path d="M70 44 l9 4 l-3 4 l-7 -4 z" />
      {/* far leg */}
      <path opacity="0.65" d="M64 50 C64 58 66 62 64 68 L62 74 L72 74 L69 66 L71 55 Z" />
      {/* near leg */}
      <path d="M51 50 C49 58 53 63 50 69 L47 74 L59 74 L55 67 L58 55 Z" />
    </g>
  ),
  ankylo: (
    <g>
      {/* club tail */}
      <path d="M10 53 L32 51 L32 58 L10 58 Z" />
      <circle cx="9" cy="55" r="7" />
      {/* low wide body */}
      <ellipse cx="58" cy="56" rx="29" ry="14" />
      {/* armor spikes along the back */}
      <path d="M34 47 l4 -8 l4 7 z" />
      <path d="M44 44 l4 -9 l4 8 z" />
      <path d="M55 43 l4 -9 l4 9 z" />
      <path d="M66 44 l4 -8 l4 8 z" />
      <path d="M76 48 l3.5 -7 l3.5 7 z" />
      {/* head with little horns */}
      <path d="M84 50 L102 53 L107 59 L101 65 L86 64 C83 60 82 54 84 50 Z" />
      <path d="M97 52 L101 46 L103 53 Z" />
      <circle cx="94" cy="57" r="1.9" fill={eyeFill} />
      {/* stubby legs */}
      <path opacity="0.65" d="M46 63 h8 l-1 11 h-7 Z" />
      <path opacity="0.65" d="M68 63 h8 l-1 11 h-7 Z" />
      <path d="M38 64 h9 v10 h-9 Z" />
      <path d="M60 64 h9 v10 h-9 Z" />
    </g>
  ),
  hadro: (
    <g>
      {/* tail */}
      <path d="M2 39 L50 37 L50 52 Z" />
      {/* body */}
      <ellipse cx="59" cy="46" rx="18" ry="11" transform="rotate(-8 59 46)" />
      {/* neck */}
      <path d="M67 40 C72 32 77 26 83 22 L90 29 C84 33 80 38 77 44 Z" />
      {/* head with duck bill */}
      <path d="M83 18 C91 16 99 19 108 26 L105 31 L91 31 L82 28 C82 24 82 21 83 18 Z" />
      <circle cx="89" cy="23" r="1.9" fill={eyeFill} />
      {/* backswept tube crest */}
      <path d="M86 20 C81 11 73 6 64 6 L66 13 C73 13 79 16 84 24 Z" />
      {/* small arms */}
      <path d="M66 44 l8 5 l-3 4 l-7 -5 z" />
      {/* far leg */}
      <path opacity="0.65" d="M62 50 C62 58 64 62 62 68 L60 74 L70 74 L67 66 L69 55 Z" />
      {/* near leg */}
      <path d="M50 50 C48 58 52 63 49 69 L46 74 L58 74 L54 67 L57 55 Z" />
    </g>
  ),
  mosasaur: (
    <g>
      {/* tail tapering to a downturned shark-like fluke */}
      <path d="M2 42 L44 37 L44 50 Z" />
      <path d="M4 36 L16 24 L18 42 Z" />
      {/* long streamlined body */}
      <ellipse cx="56" cy="43" rx="24" ry="10" transform="rotate(-3 56 43)" />
      {/* front flipper */}
      <path d="M52 50 L46 62 L60 53 Z" />
      {/* rear flipper */}
      <path opacity="0.65" d="M32 48 L27 58 L38 51 Z" />
      {/* long toothy jaw */}
      <path d="M78 34 L108 29 L115 34 L108 38 L94 39 L82 44 C79 41 78 37 78 34 Z" />
      <circle cx="90" cy="36" r="2" fill={eyeFill} />
    </g>
  ),
  plesiosaur: (
    <g>
      {/* short tail */}
      <path d="M8 54 L28 50 L28 60 Z" />
      {/* small round body */}
      <ellipse cx="40" cy="53" rx="16" ry="11" />
      {/* front flipper */}
      <path d="M36 62 L28 74 L46 64 Z" />
      {/* rear flipper */}
      <path opacity="0.65" d="M20 58 L14 70 L28 62 Z" />
      {/* extremely long, gently curving neck */}
      <path d="M50 48 C64 42 76 30 82 14 L90 17 C84 34 72 46 58 54 Z" />
      {/* tiny head */}
      <ellipse cx="88" cy="12" rx="7" ry="4.5" />
      <circle cx="91" cy="11" r="1.4" fill={eyeFill} />
    </g>
  ),
  ptero: (
    <g>
      {/* far wing, spread up and back */}
      <path opacity="0.55" d="M46 40 L20 8 L36 6 L58 32 Z" />
      {/* near wing, spread forward and down */}
      <path d="M50 42 L92 12 L88 24 L60 50 Z" />
      {/* body */}
      <ellipse cx="52" cy="46" rx="13" ry="9" transform="rotate(-10 52 46)" />
      {/* legs */}
      <path opacity="0.65" d="M46 54 L42 68 L50 68 L52 56 Z" />
      <path d="M56 55 L54 70 L62 70 L62 57 Z" />
      {/* long neck */}
      <path d="M62 42 C68 36 74 32 80 30 L84 36 C79 39 74 43 70 48 Z" />
      {/* head with beak and small crest */}
      <path d="M78 24 L100 27 L106 31 L98 34 L86 33 L76 30 Z" />
      <path d="M80 24 L86 12 L90 25 Z" />
      <circle cx="86" cy="28" r="1.8" fill={eyeFill} />
    </g>
  ),
  therizino: (
    <g>
      {/* tail */}
      <path d="M2 44 L50 38 L50 52 Z" />
      {/* pot belly */}
      <ellipse cx="60" cy="46" rx="22" ry="15" transform="rotate(-4 60 46)" />
      {/* neck */}
      <path d="M74 38 C79 28 84 20 90 14 L98 20 C92 26 87 33 84 41 Z" />
      {/* small head */}
      <ellipse cx="94" cy="12" rx="7" ry="5" />
      <circle cx="97" cy="11" r="1.4" fill={eyeFill} />
      {/* long arm ending in giant claws */}
      <path d="M66 42 L52 50 L56 54 L70 48 Z" />
      <path d="M50 47 L44 43 L46 51 Z" />
      <path d="M50 50 L43 49 L47 56 Z" />
      <path d="M52 53 L46 55 L50 60 Z" />
      {/* far leg */}
      <path opacity="0.65" d="M56 58 C56 64 58 68 56 74 L66 74 L64 62 Z" />
      {/* near leg */}
      <path d="M44 58 C42 64 46 68 43 74 L53 74 L51 62 Z" />
    </g>
  ),
}
