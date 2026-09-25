'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { NotificationInbox } from '@buildbase/sdk/react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MousePointerClick, Radio } from 'lucide-react';

/**
 * The signed-in person's inbox: one item per notification the app sent
 * them, however it was delivered. The component is the SDK's; this page
 * only routes in-app links through the router and explains the rules.
 */
export default function InboxPage() {
  const t = useTranslations('inbox');
  const router = useRouter();

  const rules = [
    { icon: Radio, text: t('rules.live') },
    { icon: MousePointerClick, text: t('rules.read') },
    { icon: Mail, text: t('rules.email') },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <NotificationInbox
        title={null}
        description={null}
        live
        onSelect={(item) => {
          if (!item.link) return;
          if (item.link.startsWith('/')) router.push(item.link);
          else window.location.assign(item.link);
        }}
      />

      <Card>
        <CardContent className="grid gap-4 pt-6 text-sm sm:grid-cols-3">
          {rules.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2">
              <Icon className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-muted-foreground">{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
