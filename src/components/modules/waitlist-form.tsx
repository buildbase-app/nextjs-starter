'use client';

import { useState } from 'react';
import { BetaForm } from '@buildbase/sdk/react';
import { Card, CardContent } from '@/components/ui/card';

/** Wraps the SDK's beta form so the page can say what happens next. */
export function WaitlistForm({
  successText,
  note,
}: {
  successText: string;
  note: string;
}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        {done ? (
          <p className="text-sm">{successText}</p>
        ) : (
          <BetaForm
            hideLogo
            onSuccess={() => setDone(true)}
            onError={(m) => setError(m)}
          />
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
        <p className="text-muted-foreground text-xs">{note}</p>
      </CardContent>
    </Card>
  );
}
