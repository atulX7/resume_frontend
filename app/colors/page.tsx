export default function ColorsTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Global CSS Colors Test</h1>
      
      <div className="grid gap-8">
        {/* Base Colors */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Base Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ColorCard name="background" bgClass="bg-background" textClass="text-foreground" />
            <ColorCard name="foreground" bgClass="bg-foreground" textClass="text-background" />
            <ColorCard name="primary" bgClass="bg-primary" textClass="text-primary-foreground" />
            <ColorCard name="primary-hover" bgClass="bg-primary-hover" textClass="text-primary-foreground" />
            <ColorCard name="secondary" bgClass="bg-secondary" textClass="text-secondary-foreground" />
            <ColorCard name="muted" bgClass="bg-muted" textClass="text-muted-foreground" />
            <ColorCard name="accent" bgClass="bg-accent" textClass="text-accent-foreground" />
            <ColorCard name="destructive" bgClass="bg-destructive" textClass="text-destructive-foreground" />
          </div>
        </section>

        {/* Hover States */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Hover States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors">
              Hover me (Primary)
            </button>
            <button className="p-4 bg-secondary text-secondary-foreground rounded-md hover:bg-primary-hover transition-colors">
              Hover me (Secondary)
            </button>
          </div>
        </section>

        {/* Text Colors */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Text Colors</h2>
          <div className="grid gap-2">
            <p className="text-foreground">Text Foreground</p>
            <p className="text-primary">Text Primary</p>
            <p className="text-muted-foreground">Text Muted</p>
            <p className="text-secondary-foreground">Text Secondary</p>
          </div>
        </section>

        {/* Border Colors */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Borders</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-primary rounded-md">Primary Border</div>
            <div className="p-4 border border-secondary rounded-md">Secondary Border</div>
            <div className="p-4 border border-destructive rounded-md">Destructive Border</div>
            <div className="p-4 border border-muted rounded-md">Muted Border</div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ColorCard({ name, bgClass, textClass }: { name: string, bgClass: string, textClass: string }) {
  return (
    <div className={`p-4 rounded-md ${bgClass}`}>
      <p className={`font-medium ${textClass}`}>{name}</p>
      <p className={`text-sm ${textClass}`}>Sample Text</p>
    </div>
  )
} 