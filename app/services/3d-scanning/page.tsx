import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Scan, Map, Ruler, FileText, Plane, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "3D Scanning & Aerial Surveying | Venue Documentation | TC Agency",
  description:
    "TC Agency provides high-precision 3D scanning and aerial surveying for venue documentation, site analysis, and production planning. LiDAR, photogrammetry, and drone-based capture.",
  keywords: [
    "3D scanning",
    "LiDAR",
    "photogrammetry",
    "aerial surveying",
    "venue scanning",
    "TC Agency",
    "Technically Creative",
  ],
}

export default function ScanningPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <div className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">
            Service / 3D Scanning & Aerial Surveying
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">Reality Capture</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            High-precision 3D scanning and aerial surveying that captures every dimension of your venue. The foundation
            for accurate planning and visualization.
          </p>
        </div>

        {/* Services Grid */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-background p-12">
              <Scan className="w-10 h-10 text-emerald-500 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Terrestrial 3D Scanning</h2>
              <p className="text-muted-foreground mb-6">
                Ground-based LiDAR and photogrammetry capture for interior spaces, stages, and structures.
                Sub-millimeter accuracy for production-critical measurements.
              </p>
              <div className="space-y-3">
                <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Applications</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Venue as-built documentation</li>
                  <li>• Stage and set piece capture</li>
                  <li>• Obstruction and sightline analysis</li>
                  <li>• Rigging point verification</li>
                  <li>• Heritage and historical preservation</li>
                </ul>
              </div>
            </div>
            <div className="bg-background p-12">
              <Plane className="w-10 h-10 text-emerald-500 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Aerial Surveying</h2>
              <p className="text-muted-foreground mb-6">
                Drone-based capture for outdoor venues, festival sites, and large-scale installations. Orthomosaic
                mapping and volumetric analysis.
              </p>
              <div className="space-y-3">
                <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Applications</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Festival site topology</li>
                  <li>• Stadium and arena exteriors</li>
                  <li>• Construction progress monitoring</li>
                  <li>• Large-scale art installations</li>
                  <li>• Environmental impact assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                label: "Accuracy",
                value: "±2mm",
                desc: "Point cloud precision",
              },
              {
                icon: Map,
                label: "Range",
                value: "130m",
                desc: "Maximum capture distance",
              },
              {
                icon: Scan,
                label: "Density",
                value: "2M pts/sec",
                desc: "Scan acquisition rate",
              },
              {
                icon: Ruler,
                label: "Resolution",
                value: "0.6mm @ 10m",
                desc: "Point spacing at range",
              },
            ].map((spec, i) => (
              <div key={i} className="border border-border p-6 text-center">
                <spec.icon className="w-6 h-6 text-emerald-500 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-1">{spec.value}</div>
                <div className="text-sm font-mono text-emerald-500 uppercase mb-2">{spec.label}</div>
                <div className="text-xs text-muted-foreground">{spec.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Equipment & Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-border p-6">
              <h3 className="font-bold mb-4">LiDAR Scanners</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Leica RTC360</li>
                <li>• Leica BLK360</li>
                <li>• FARO Focus Premium</li>
                <li>• Trimble X7</li>
              </ul>
            </div>
            <div className="border border-border p-6">
              <h3 className="font-bold mb-4">Aerial Platforms</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• DJI Matrice 350 RTK</li>
                <li>• DJI Mavic 3 Enterprise</li>
                <li>• Zenmuse L1 LiDAR</li>
                <li>• Zenmuse P1 Photogrammetry</li>
              </ul>
            </div>
            <div className="border border-border p-6">
              <h3 className="font-bold mb-4">Processing Software</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Leica Cyclone REGISTER 360</li>
                <li>• Autodesk ReCap Pro</li>
                <li>• DJI Terra</li>
                <li>• Pix4Dmapper</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12">Deliverables</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {[
              {
                icon: FileText,
                title: "Point Cloud Data",
                formats: ["E57", "LAS/LAZ", "PTS", "RCP/RCS"],
                desc: "Raw and registered point cloud data in industry-standard formats for downstream processing.",
              },
              {
                icon: Map,
                title: "3D Mesh Models",
                formats: ["OBJ", "FBX", "glTF", "USD"],
                desc: "Textured mesh models optimized for real-time visualization and VFX workflows.",
              },
              {
                icon: Ruler,
                title: "CAD Drawings",
                formats: ["DWG", "DXF", "PDF"],
                desc: "2D floor plans, sections, and elevations extracted from scan data with annotated dimensions.",
              },
              {
                icon: Scan,
                title: "Orthomosaic Maps",
                formats: ["GeoTIFF", "KML", "Shapefile"],
                desc: "Georeferenced aerial imagery and topographic data for site planning and analysis.",
              },
            ].map((item, i) => (
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
          <h2 className="text-2xl font-bold mb-12">Capture Process</h2>
          <div className="max-w-3xl">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-12">
                {[
                  {
                    title: "Site Assessment",
                    desc: "Initial consultation to determine scope, access requirements, and deliverable specifications. We coordinate with venue management and production teams.",
                  },
                  {
                    title: "Capture Planning",
                    desc: "Develop scan positions, flight plans, and ground control point placement. We optimize for coverage while minimizing time on-site.",
                  },
                  {
                    title: "Data Acquisition",
                    desc: "Execute the capture plan with quality checks at each station. Real-time registration ensures complete coverage before leaving site.",
                  },
                  {
                    title: "Processing & QA",
                    desc: "Register scans, clean noise, and generate deliverables. Rigorous quality assurance against project specifications.",
                  },
                  {
                    title: "Delivery & Integration",
                    desc: "Package data for downstream workflows. We support direct integration into Unreal Engine, Vectorworks, AutoCAD, and visualization platforms.",
                  },
                ].map((step, i) => (
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

        {/* CTA */}
        <section className="border-t border-border pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to capture your venue?</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss your scanning requirements and how accurate reality capture can improve your production
              workflow.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
