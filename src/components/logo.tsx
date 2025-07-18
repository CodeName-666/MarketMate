import { Tag } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Tag className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold font-headline tracking-tight">MarketMate</span>
    </Link>
  );
}
