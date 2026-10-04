'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Devices, Sessions, useSaaSAuth } from '@buildbase/sdk/react';
import { toast } from 'sonner';
import { Bot, Fingerprint, LogOut, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Link } from '@/i18n/routing';

/**
 * Where a person sees and ends their own sessions. Everything here is the
 * SDK's: `<Sessions>` and `<Devices>` list and revoke, `signOut({ everywhere })`
 * revokes every session the user has, and passkeys register on the hosted
 * auth domain, which is why that card opens the SDK's settings screen.
 */
export default function SecurityPage() {
  const t = useTranslations('account.security');
  const { signOut, openWorkspaceSettings } = useSaaSAuth();
  const [confirming, setConfirming] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const signOutEverywhere = async () => {
    setSigningOut(true);
    try {
      await signOut({ everywhere: true });
    } catch {
      toast.error(t('everywhere.failed'));
      setSigningOut(false);
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Sessions
        title={t('sessions.title')}
        description={t('sessions.description')}
        signOutLabel={t('sessions.signOut')}
        emptyLabel={t('sessions.empty')}
      />

      <Devices
        title={t('devices.title')}
        description={t('devices.description')}
        signOutLabel={t('devices.signOut')}
        emptyLabel={t('devices.empty')}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <LogOut className="h-5 w-5" />
            <CardTitle className="text-base">{t('everywhere.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>{t('everywhere.description')}</CardDescription>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConfirming(true)}
            >
              {t('everywhere.button')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Fingerprint className="h-5 w-5" />
            <CardTitle className="text-base">{t('passkeys.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>{t('passkeys.description')}</CardDescription>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openWorkspaceSettings('security')}
            >
              {t('passkeys.button')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-base">{t('agents.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>{t('agents.description')}</CardDescription>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/profile">{t('agents.button')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {t('everywhere.confirmTitle')}
            </DialogTitle>
            <DialogDescription>{t('everywhere.confirmBody')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={signingOut}>
                {t('everywhere.cancel')}
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={signingOut}
              onClick={signOutEverywhere}
            >
              {signingOut ? t('everywhere.working') : t('everywhere.button')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
