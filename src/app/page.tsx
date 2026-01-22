import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-semibold">My App</h1>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-4xl font-bold tracking-tight">
          Welcome to Next.js
        </h2>
        <p className="max-w-md text-center text-muted-foreground">
          Built with TypeScript, Tailwind CSS, shadcn/ui, next-themes, and
          next-seo. Configured for static HTML export.
        </p>
        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </main>
    </div>
  );
}
