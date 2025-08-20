
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Link from 'next/link';
import { ArrowRight, LogIn, Building, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900/50">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
              Willkommen bei MarketMate
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ihre moderne All-in-One-Lösung für Flohmärkte. Wählen Sie Ihre Rolle, um loszulegen.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                        <Building className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Für Organisatoren</CardTitle>
                    <CardDescription>
                        Verwalten Sie mehrere Märkte, Mitglieder und Finanzen an einem zentralen Ort.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Button asChild className="w-full">
                      <Link href="/for-organizations">
                        Infos für Organisationen <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Für Teilnehmer</CardTitle>
                    <CardDescription>
                        Melden Sie sich als Verkäufer oder Helfer an, verwalten Sie Artikel und behalten Sie den Überblick.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Button asChild className="w-full">
                      <Link href="/for-participants">
                        Infos für Teilnehmer <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MarketMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
