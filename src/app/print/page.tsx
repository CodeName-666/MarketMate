"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Printer, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface Article {
  id: number;
  description: string;
  price: number;
}

interface PrintData {
  articles: Article[];
  sellerNumber: number;
}

// A simple SVG barcode placeholder
const Barcode = ({ text }: { text: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="40"
    viewBox="0 0 150 40"
    aria-label={`Barcode for ${text}`}
  >
    <rect x="0" y="0" width="150" height="40" fill="white" />
    <g fill="black">
      <rect x="10" y="5" width="2" height="30" />
      <rect x="14" y="5" width="4" height="30" />
      <rect x="20" y="5" width="2" height="30" />
      <rect x="24" y="5" width="2" height="30" />
      <rect x="30" y="5" width="4" height="30" />
      <rect x="36" y="5" width="2" height="30" />
      <rect x="42" y="5" width="2" height="30" />
      <rect x="48" y="5" width="4" height="30" />
      <rect x="54" y="5" width="2" height="30" />
      <rect x="60" y="5" width="4" height="30" />
      <rect x="66" y="5" width="2" height="30" />
      <rect x="70" y="5" width="2" height="30" />
      <rect x="76" y="5" width="4" height="30" />
      <rect x="82" y="5" width="2" height="30" />
      <rect x="88" y="5" width="4" height="30" />
      <rect x="94" y="5" width="2" height="30" />
      <rect x="100" y="5" width="2" height="30" />
      <rect x="106" y="5" width="4" height="30" />
      <rect x="112" y="5" width="2" height="30" />
      <rect x="116" y="5" width="4" height="30" />
      <rect x="122" y="5" width="2" height="30" />
      <rect x="128" y="5" width="2" height="30" />
      <rect x="132" y="5" width="4" height="30" />
      <rect x="138" y="5" width="2" height="30" />
    </g>
  </svg>
);


export default function PrintPage() {
  const [data, setData] = React.useState<PrintData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const storedData = localStorage.getItem('marketmate_print_data');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setError("No data found for printing. Please go back to the dashboard and try again.");
      }
    } catch (err) {
      setError("Failed to load data for printing. It might be corrupted.");
      console.error(err);
    }
  }, []);

  const handlePrint = () => {
    window.print();
    toast({
        title: "Printing...",
        description: "Your browser's print dialog should be open."
    })
  };

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Could not generate page</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => router.push('/dashboard')}>Go back to Dashboard</Button>
        </div>
    );
  }

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen">Loading print preview...</div>;
  }

  return (
    <div className="bg-gray-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-background p-4 rounded-lg shadow-md mb-8 no-print flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Print Preview</h1>
            <p className="text-muted-foreground">This is how your labels will look. Use your browser's print options to adjust layout and size.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>Back to Dashboard</Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print Labels
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {data.articles.map((article) => (
            <Card key={article.id} className="break-inside-avoid shadow-none border-dashed">
              <CardContent className="p-3 text-center space-y-2">
                <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold">No. {data.sellerNumber}</span>
                    <span className="text-xs font-bold">Art. {article.id}</span>
                </div>
                <p className="font-semibold text-sm truncate">{article.description}</p>
                <div className="w-full">
                    <Barcode text={`${data.sellerNumber}-${article.id}`} />
                </div>
                <p className="text-xl font-bold bg-primary text-primary-foreground rounded-md py-1">
                  €{article.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
