
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LogIn, CheckCircle } from 'lucide-react';

export default function ForOrganizationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/login/organization">
            Login
            <LogIn className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
                Managen Sie Ihre Märkte <span className="text-primary">effizient und zentral</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                MarketMate bietet Organisationen alle Werkzeuge, um mehrere Flohmarkt-Events mühelos zu planen, zu verwalten und auszuwerten.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Zentrale Verwaltung aller Märkte und Termine.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Einfache Mitglieder- und Rollenverwaltung.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Automatisierte Finanzeinsichten und Datenexporte.</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/register">
                    Organisation registrieren <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login/organization">
                    Zum Organisations-Login
                  </Link>
                </Button>
              </div>
            </div>
            <div>
               <Image
                    src="https://placehold.co/800x600.png"
                    alt="MarketMate Dashboard Preview"
                    width={800}
                    height={600}
                    className="object-cover rounded-xl shadow-2xl"
                    data-ai-hint="team planning meeting"
                  />
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MarketMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
