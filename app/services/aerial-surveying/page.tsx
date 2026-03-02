import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Camera,
  Thermometer,
  Map,
  BarChart3,
  ClipboardCheck,
  Mountain,
  Plane,
  Cpu,
  FileText,
  Layers,
  Box,
} from "lucide-react"
import { BreadcrumbSchema, ServicePageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Aerial Surveying | Drone Mapping & Photogrammetry | TC Agency",
  description:
    "TC Agency provides FAA Part 107 certified aerial surveying for live event venues and production sites. Drone-based photogrammetry, thermal imaging, orthomosaic mapping, and volumetric analysis with 1cm/px ground resolution.",
  keywords: [
    "aerial surveying live events",
    "drone mapping production",
    "site survey photogrammetry",
    "venue aerial documentation",
    "orthomosaic mapping",
    "thermal imaging drone",
    "volumetric analysis",
    "TC Agency",
    "Technically Creative",
  ],
  openGraph: {
    title: "Aerial Surveying | Drone Mapping & Photogrammetry | TC Agency",
    description:
      "FAA Part 107 certified drone operations for venue documentation, site analysis, and production planning. Photogrammetry, thermal imaging, and orthomosaic mapping.",
    url: "https://tc.agency/services/aerial-surveying",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aerial Surveying | Drone Mapping & Photogrammetry | TC Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerial Surveying | Drone Mapping & Photogrammetry | TC Agency",
    description:
      "FAA Part 107 certified drone operations for venue documentation, site analysis, and production planning.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/services/aerial-surveying",
  },
}

const capabilities = [
  {
    icon: Camera,
    title: "Photogrammetry",
    desc: "High-overlap aerial image capture processed into dense point clouds and textured 3D models. Accurate reconstructions of structures, terrain, and site features from hundreds of calibrated photographs.",
    applications: ["Venue reconstruction", "Set piece modeling", "As-built verification"],
  },
  {
    icon: Thermometer,
    title: "Thermal Imaging",
    desc: "Radiometric thermal capture that identifies heat signatures across roofing, electrical infrastructure, HVAC systems, and temporary power distribution. Pinpoint issues invisible to the naked eye.",
    applications: ["Electrical fault detection", "HVAC assessment", "Temporary power audits"],
  },
  {
    icon: Map,
    title: "Orthomosaic Mapping",
    desc: "Georeferenced, distortion-corrected aerial imagery stitched into a single high-resolution map. Measurable, scalable, and compatible with GIS platforms for site planning and coordination.",
    applications: ["Festival site layout", "Parking and logistics", "Crowd flow planning"],
  },
  {
    icon: BarChart3,
    title: "Volumetric Analysis",
    desc: "Precise volume calculations for stockpiles, excavation sites, and fill areas derived from drone-captured surface models. Track material quantities over time with repeatable accuracy.",
    applications: ["Stockpile measurement", "Cut/fill calculations", "Material tracking"],
  },
  {
    icon: ClipboardCheck,
    title: "Progress Documentation",
    desc: "Scheduled aerial capture that creates a visual and spatial record of construction and build-out phases. Compare conditions across dates with aligned datasets and consistent flight paths.",
    applications: ["Build-out monitoring", "Time-lapse generation", "Stakeholder reporting"],
  },
  {
    icon: Mountain,
    title: "Terrain Modeling",
    desc: "Digital elevation models and digital terrain models that map ground surface conditions with centimeter-level precision. Essential for drainage planning, grading verification, and site accessibility.",
    applications: ["Drainage analysis", "Grading verification", "Accessibility assessment"],
  },
]

const deliverables = [
  {
    icon: Map,
    title: "Orthomosaic Maps",
    formats: ["GeoTIFF", "JPEG", "KML", "Shapefile"],
    desc: "Georeferenced high-resolution aerial maps suitable for measurement, annotation, and integration with GIS and CAD platforms.",
  },
  {
    icon: Layers,
    title: "Digital Elevation Models",
    formats: ["GeoTIFF", "LAS/LAZ", "XYZ", "DXF"],
    desc: "Surface models capturing terrain elevation data for grading analysis, drainage planning, and volumetric calculations.",
  },
  {
    icon: Box,
    title: "3D Site Models",
    formats: ["OBJ", "FBX", "glTF", "PLY"],
    desc: "Textured mesh models generated from photogrammetry data, optimized for visualization in Unreal Engine and other real-time platforms.",
  },
  {
    icon: FileText,
    title: "Thermal Reports",
    formats: ["PDF", "RJPEG", "CSV", "GeoTIFF"],
    desc: "Annotated thermal analysis reports with temperature data, anomaly identification, and recommendations for remediation.",
  },
]

const processSteps = [
  {
    title: "Site Assessment",
    desc: "Initial evaluation of the survey area, airspace classification, and regulatory requirements. We coordinate with venue management, identify ground control point placement, and confirm deliverable specifications before any flight operations begin.",
  },
  {
    title: "Flight Planning",
    desc: "Mission planning with optimized flight paths, overlap ratios, altitude parameters, and sensor configurations. Every plan accounts for terrain variation, obstacle clearance, and data quality requirements specific to the project scope.",
  },
  {
    title: "Data Acquisition",
    desc: "FAA Part 107 compliant flight operations with real-time quality monitoring. Multiple sensor passes capture RGB imagery, thermal data, and LiDAR point clouds as required. Ground control points are surveyed for georeferencing accuracy.",
  },
  {
    title: "Processing",
    desc: "Raw capture data is processed through photogrammetry and GIS pipelines. Point cloud generation, mesh reconstruction, orthomosaic stitching, and thermal analysis are performed with rigorous quality checks at each stage.",
  },
  {
    title: "Delivery",
    desc: "Final deliverables are packaged in project-specified formats with full metadata and coordinate reference documentation. We support direct integration with 3D scanning ground truth data for comprehensive site models.",
  },
]

export default function AerialSurveyingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Services", url: "https://tc.agency/capabilities" },
          { name: "Aerial Surveying", url: "https://tc.agency/services/aerial-surveying" },
        ]}
      />
      <ServicePageSchema
        name="Aerial Surveying"
        description="FAA Part 107 certified drone-based aerial surveying for venue documentation, site analysis, and production planning. Photogrammetry, thermal imaging, orthomosaic mapping, and volumetric analysis."
        url="https://tc.agency/services/aerial-surveying"
      />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          {/* Header */}
          <div className="mb-16 max-w-4xl">
            <div className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">
              Service / Aerial Surveying
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Aerial Surveying
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Drone-based aerial data capture for venue and site analysis. Comprehensive spatial intelligence
              from above, delivered with the precision your production demands.
            </p>
          </div>

          {/* Overview with Performance Indicators */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our aerial surveying operations capture site conditions that ground-level observation cannot
                  reveal. Using commercial-grade drone platforms equipped with high-resolution cameras, thermal
                  sensors, and LiDAR payloads, we document topology, layouts, and site conditions from above
                  with centimeter-level accuracy.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every flight is conducted under FAA Part 107 certification with full regulatory compliance.
                  We operate across festival grounds, stadium complexes, construction sites, and venue
                  exteriors, delivering the spatial data that production teams need to plan with confidence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aerial datasets integrate directly with our{" "}
                  <Link href="/services/3d-scanning" className="text-emerald-500 hover:underline">
                    3D scanning
                  </Link>{" "}
                  ground truth data, creating unified site models that combine interior and exterior capture
                  into a single coordinate system. The result is a complete digital twin of your site, ready
                  for{" "}
                  <Link href="/services/design-visualization" className="text-emerald-500 hover:underline">
                    design visualization
                  </Link>{" "}
                  and production planning workflows.
                </p>
              </div>
              <div className="bg-accent/5 border border-border p-8">
                <h3 className="font-mono text-sm text-emerald-500 uppercase tracking-widest mb-6">
                  Performance Indicators
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-bold text-emerald-500">100 ac/day</p>
                    <p className="text-sm text-muted-foreground mt-1">Site coverage per operational day</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <p className="text-4xl font-bold text-emerald-500">1cm/px</p>
                    <p className="text-sm text-muted-foreground mt-1">Ground sampling distance</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-emerald-500">400ft AGL</p>
                    <p className="text-sm text-muted-foreground mt-1">Maximum operational altitude</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities Grid */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, i) => (
                <div key={i} className="border border-border p-6 hover:border-emerald-900/50 transition-colors">
                  <capability.icon className="w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{capability.desc}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-mono text-muted-foreground mb-2">Applications:</div>
                    <ul className="space-y-1">
                      {capability.applications.map((app, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Equipment & Technology */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Equipment & Technology</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-border p-6">
                <Plane className="w-6 h-6 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-4">Aerial Platforms</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>DJI Matrice 350 RTK</li>
                  <li>DJI Mavic 3 Enterprise</li>
                  <li>DJI Inspire 3</li>
                  <li>Autel EVO II Pro RTK</li>
                </ul>
              </div>
              <div className="border border-border p-6">
                <Camera className="w-6 h-6 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-4">Sensors & Payloads</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Zenmuse P1 (45MP full-frame)</li>
                  <li>Zenmuse L2 LiDAR</li>
                  <li>Zenmuse H30T (thermal)</li>
                  <li>RTK/PPK GNSS receivers</li>
                </ul>
              </div>
              <div className="border border-border p-6">
                <Cpu className="w-6 h-6 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-4">Processing Software</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Pix4Dmapper / Pix4Dmatic</li>
                  <li>DJI Terra</li>
                  <li>Agisoft Metashape Pro</li>
                  <li>Global Mapper / QGIS</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Deliverables */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Deliverables</h2>
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {deliverables.map((item, i) => (
                <div key={i} className="bg-background p-8">
                  <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.formats.map((format, j) => (
                      <span key={j} className="text-xs font-mono bg-accent/10 border border-border px-2 py-1">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-12">Process</h2>
            <div className="max-w-3xl">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-12">
                  {processSteps.map((step, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-emerald-500 flex items-center justify-center">
                        <span className="text-xs font-mono text-emerald-500">{(i + 1).toString().padStart(2, "0")}</span>
                      </div>
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-8">Related Services</h2>
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              <Link
                href="/services/3d-scanning"
                className="bg-background p-8 group hover:bg-accent/5 transition-colors"
              >
                <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">
                  Ground Truth
                </div>
                <h3 className="font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                  3D Scanning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Terrestrial LiDAR and photogrammetry capture for interior spaces. Combine with aerial data
                  for complete site coverage.
                </p>
              </Link>
              <Link
                href="/services/design-visualization"
                className="bg-background p-8 group hover:bg-accent/5 transition-colors"
              >
                <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">
                  Downstream
                </div>
                <h3 className="font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                  Design Visualization
                </h3>
                <p className="text-sm text-muted-foreground">
                  Transform aerial survey data into production-ready visualizations for stakeholder review and
                  design iteration.
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-border pt-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Ready to survey your site?</h2>
              <p className="text-muted-foreground mb-8">
                Let's discuss your aerial surveying requirements and how drone-captured spatial data can
                strengthen your production planning.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold uppercase tracking-wide hover:bg-emerald-600 transition-colors"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
