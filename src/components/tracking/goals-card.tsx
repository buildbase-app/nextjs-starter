'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackGoal, useTracking } from '@buildbase/sdk/tracking';
import { Target } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/** Goal names: lowercase letters, digits, `_`, `:` and `-`, at most 64. */
const GOAL = 'tour_goal';

/**
 * Web analytics goals: count the moments that matter (a sign-up, a pressed
 * upgrade button, a document created) beside page views, in the console's
 * Analytics. `trackGoal` follows the visitor's answer to the cookie banner:
 * after a "no" nothing is sent. This app also records `document_created`
 * from the Documents page, a real conversion rather than a button.
 */
export function GoalsCard() {
  const t = useTranslations('goals');
  const { consent } = useTracking();
  const [recorded, setRecorded] = useState(0);
  const refused = consent.state?.analytics === false;

  const record = async () => {
    trackGoal(GOAL, { source: 'tracking_page' });
    setRecorded((n) => n + 1);
    // Ticks the tour task; the analytics event itself went to the platform.
    await fetch('/api/tracking/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: GOAL }),
    }).catch(() => {});
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-2 pb-3">
        <Target className="mt-0.5 h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={record}>
            {t('record')}
          </Button>
          <code className="text-muted-foreground text-xs">
            {`trackGoal('${GOAL}', { source: 'tracking_page' })`}
          </code>
        </div>
        {recorded > 0 && (
          <p className="text-sm text-green-700 dark:text-green-400">
            {refused
              ? t('notSent')
              : t('recorded', { count: recorded, name: GOAL })}
          </p>
        )}
        <p className="text-muted-foreground text-xs">{t('alsoDocuments')}</p>
      </CardContent>
    </Card>
  );
}
