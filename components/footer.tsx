export function Footer() {
  return (
    <footer className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-lg font-bold uppercase tracking-tighter mb-2">TECHNICALLY CREATIVE</div>
            <p className="text-sm text-muted-foreground">Production engineering. Automated.</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-mono text-muted-foreground mb-2">info@tc.agency</p>
            <p className="text-sm font-mono text-muted-foreground">Detroit / Los Angeles / Everywhere</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Technically Creative. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
