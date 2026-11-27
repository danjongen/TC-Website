/**
 * Selected work shared by the homepage, the portfolio and the station case study.
 * Every image here is a 16:9 web master (2400 x 1350) in public/images/work; the
 * sources and approved crops are recorded in docs/IMAGE-SOURCES.md.
 */

export type WorkImage = {
  src: string
  width: number
  height: number
  alt: string
  /** "RENDER" for visualisations, so no one mistakes them for photos of a finished event. */
  label?: "RENDER"
  caption?: string
}

const frame = { width: 2400, height: 1350 }

export const STATION_CASE_STUDY = "/insights/michigan-central-station-scan-to-event-plan"
export const BSB_CASE_STUDY = "/insights/ufo-pod-touring-control-infrastructure"
export const HOMECOMING_CASE_STUDY = "/insights/backstreet-boys-homecoming-dusseldorf"

/** Backstreet Boys: Into The Millennium, Homecoming. Show photos; sources and credits in docs/IMAGE-SOURCES.md. */
const small = { width: 1080, height: 608 }

export const HOMECOMING_IMAGES = {
  hoverboards: {
    src: "/images/work/bsb-homecoming-hoverboards.jpg",
    width: 1920,
    height: 1080,
    alt: "The five Backstreet Boys flying on hoverboards on the flying rig in front of a blue LED wall.",
    caption: "HOMECOMING / DÜSSELDORF",
  },
  fullBowl: {
    src: "/images/work/bsb-homecoming-full-bowl.jpg",
    width: 1920,
    height: 1080,
    alt: "The full stadium bowl under the roof trusses, with lasers fanning over the crowd and pyro along the stage front.",
    caption: "SHOW / DÜSSELDORF",
  },
  arena: {
    src: "/images/work/bsb-homecoming-arena.jpg",
    ...small,
    alt: "Rows of pale blue beams fanning out above the Backstreet Boys on stage, with the five members on a wide LED wall and fans in the foreground.",
    caption: "SHOW / DÜSSELDORF",
  },
  redLight: {
    src: "/images/work/bsb-homecoming-red-light.jpg",
    ...frame,
    alt: "Stadium washed in red light, with a tight cross of white beams rising from the stage and the five Backstreet Boys on the LED wall.",
    caption: "SHOW / DÜSSELDORF",
  },
  cardington: {
    src: "/images/work/bsb-homecoming-cardington.jpg",
    ...small,
    alt: "The full Homecoming stage set up inside a large hangar for a systems test, with LED walls, lighting rig and lifts in place and crew on the deck.",
    caption: "SYSTEMS TEST / CARDINGTON",
  },
} satisfies Record<string, WorkImage>

export const STATION_IMAGES = {
  grandHallWide: {
    src: "/images/work/mcs-grand-hall-wide.jpg",
    ...frame,
    alt: "Render of the Grand Hall at Michigan Central Station set for a seated event, with a stage, three screens, camera positions and rows of chairs beneath the vaulted ceiling and chandelier.",
    label: "RENDER",
    caption: "MICHIGAN CENTRAL STATION / GRAND HALL",
  },
  southConcourse: {
    src: "/images/work/mcs-south-concourse.jpg",
    ...frame,
    alt: "Render of the South Concourse at Michigan Central Station set for a keynote, with a wide blue stage wall, a central screen, flanking screens and a full seated audience.",
    label: "RENDER",
    caption: "MICHIGAN CENTRAL STATION / SOUTH CONCOURSE",
  },
  grandHallStage: {
    src: "/images/work/mcs-grand-hall-stage.jpg",
    ...frame,
    alt: "Closer render of the Grand Hall stage at Michigan Central Station, showing a panel discussion on a low stage in front of a large screen, with tall screens on either side and the stone columns behind.",
    label: "RENDER",
    caption: "MICHIGAN CENTRAL STATION / GRAND HALL",
  },
} satisfies Record<string, WorkImage>

export type WorkProject = {
  slug: string
  title: string
  /** Only what is confirmed. Left out rather than guessed. */
  client?: string
  role?: string
  href: string
  image: WorkImage
  /** Morph the card into the destination hero. Off when the link lands mid-page. */
  morph?: boolean
}

export const PROJECTS: WorkProject[] = [
  {
    slug: "backstreet-boys-homecoming",
    title: "Backstreet Boys: Into The Millennium – Homecoming",
    client: "Düsseldorf, Germany",
    role: "Technical direction, site coordination and production infrastructure",
    href: HOMECOMING_CASE_STUDY,
    morph: true,
    image: HOMECOMING_IMAGES.hoverboards,
  },
  {
    slug: "backstreet-boys-sphere",
    title: "Backstreet Boys / Sphere",
    client: "Into The Millennium, Las Vegas",
    role: "Automation, Power & Data Systems",
    href: BSB_CASE_STUDY,
    morph: true,
    image: {
      src: "/images/work/bsb-sphere-platform.jpg",
      ...frame,
      alt: "The five Backstreet Boys performing on a flying blue stage platform in front of a lit grid of screens at Sphere, Las Vegas.",
    },
  },
  {
    slug: "michigan-central-station",
    title: "Michigan Central Station",
    client: "Detroit, Michigan",
    role: "3D Scan, Venue Model, Renders & CAD Plans",
    href: STATION_CASE_STUDY,
    image: STATION_IMAGES.grandHallWide,
    morph: true,
  },
  {
    slug: "northline-heritage",
    title: "Northline Heritage Project",
    href: "/portfolio#northline-heritage",
    image: {
      src: "/images/work/northline-heritage-hall.jpg",
      ...frame,
      alt: "Render of a heritage exhibition hall with classic and modern race cars on display in front of large-format photographic graphics.",
      label: "RENDER",
    },
  },
]
