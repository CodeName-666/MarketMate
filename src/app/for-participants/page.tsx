
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LogIn, CheckCircle } from 'lucide-react';

export default function ForParticipantsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/login">
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
                Ihr <span className="text-primary">einfachster Weg</span> zum Verkaufen und Helfen
              </h1>
              <p className="text-lg text-muted-foreground">
                Melden Sie sich als Verkäufer oder Helfer an, verwalten Sie Ihre Artikel online und drucken Sie Ihre Etiketten mit einem Klick.
              </p>
               <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Schnelle und einfache Anmeldung zu Märkten.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Digitale Artikellisten und Preisverwaltung.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Automatisches Generieren von Etiketten und Barcodes.</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/register">
                    Jetzt als Teilnehmer anmelden <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="outline">
                  <Link href="/login">
                    Zum Teilnehmer-Login
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="https://placehold.co/800x600.png"
                alt="MarketMate Dashboard Preview for sellers"
                width={800}
                height={600}
                className="object-cover rounded-xl shadow-2xl"
                data-ai-hint="market stall shopping"
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
