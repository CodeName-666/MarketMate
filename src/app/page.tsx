import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';

export default function Home() {
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
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
                Your Modern <span className="text-primary">Flea Market</span> Companion
              </h1>
              <p className="text-lg text-muted-foreground">
                MarketMate helps you easily manage your articles, generate price tags, and streamline your sales process. Spend less time on admin and more time selling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/register">
                    Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#">Learn More</Link>
                </Button>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src="https://placehold.co/800x600.png"
                    alt="MarketMate Dashboard Preview"
                    width={800}
                    height={600}
                    className="object-cover"
                    data-ai-hint="market stall"
                  />
                </CardContent>
              </Card>
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
