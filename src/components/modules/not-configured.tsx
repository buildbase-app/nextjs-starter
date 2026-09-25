import { KeyRound } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Shown when the org API token is missing: these modules read the
 * organization through it, so without one the page has nothing to show.
 */
export function NotConfigured({ text }: { text: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="text-muted-foreground flex items-start gap-3 py-6 text-sm">
        <KeyRound className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{text}</p>
      </CardContent>
    </Card>
  );
}
