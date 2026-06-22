'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  useSaaSWorkspaces,
  usePushNotifications,
} from '@buildbase/sdk/react';
import { toast } from 'sonner';
import {
  Bell,
  Mail,
  Send,
  Smartphone,
  Users,
  User,
  Loader2,
  ImageIcon,
  Clock,
  Volume2,
  VolumeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type TargetType = 'user' | 'workspace';
type ChannelMode = 'both' | 'email' | 'push';
type Urgency = '' | 'very-low' | 'low' | 'normal' | 'high';

export default function NotificationsTestPage() {
  const t = useTranslations('notifications');
  const { user } = useSaaSAuth();
  const { currentWorkspace } = useSaaSWorkspaces();
  const { isSubscribed, subscribe, unsubscribe } = usePushNotifications();

  const [sending, setSending] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastResult, setLastResult] = useState<Record<string, unknown> | null>(
    null
  );

  const [event, setEvent] = useState('test_notification');
  const [title, setTitle] = useState('Test Notification');
  const [message, setMessage] = useState(
    'Hello {{name}}, this is a test from {{workspaceName}}!'
  );
  const [url, setUrl] = useState('');
  const [targetType, setTargetType] = useState<TargetType>('user');
  const [channelMode, setChannelMode] = useState<ChannelMode>('push');

  const [icon, setIcon] = useState('');
  const [image, setImage] = useState('');
  const [badgeIcon, setBadgeIcon] = useState('');
  const [tag, setTag] = useState('');
  const [silent, setSilent] = useState(false);
  const [requireInteraction, setRequireInteraction] = useState(false);
  const [renotify, setRenotify] = useState(false);
  const [urgency, setUrgency] = useState<Urgency>('');
  const [ttl, setTtl] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [action1Title, setAction1Title] = useState('');
  const [action1Action, setAction1Action] = useState('');
  const [action2Title, setAction2Title] = useState('');
  const [action2Action, setAction2Action] = useState('');

  const handleSend = async () => {
    if (!currentWorkspace) {
      toast.error(t('toast.workspaceRequired'));
      return;
    }

    setSending(true);
    setLastResult(null);

    try {
      const channels =
        channelMode === 'both'
          ? undefined
          : channelMode === 'email'
            ? { email: true }
            : { push: true };

      const actions = [
        action1Title && action1Action
          ? { action: action1Action, title: action1Title }
          : null,
        action2Title && action2Action
          ? { action: action2Action, title: action2Title }
          : null,
      ].filter(Boolean);

      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace._id,
          userId: targetType === 'user' ? user?.id : undefined,
          event,
          title,
          message,
          url: url || undefined,
          icon: icon || undefined,
          image: image || undefined,
          badge: badgeIcon || undefined,
          tag: tag || undefined,
          silent: silent || undefined,
          requireInteraction: requireInteraction || undefined,
          renotify: renotify || undefined,
          urgency: urgency || undefined,
          ttl: ttl ? Number(ttl) : undefined,
          scheduledAt: scheduledAt || undefined,
          actions: actions.length > 0 ? actions : undefined,
          channels,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || t('toast.workspaceRequired'));
        return;
      }

      setLastResult(data);
      toast.success(
        data.sent
          ? t('toast.sent', { count: data.notifiedCount ?? 1 })
          : t('toast.notSent', { reason: data.reason || 'unknown reason' })
      );
    } catch {
      toast.error(t('toast.networkError'));
    } finally {
      setSending(false);
    }
  };

  const handlePushToggle = async () => {
    try {
      if (isSubscribed) {
        await unsubscribe();
        toast.success(t('toast.pushDisabled'));
      } else {
        await subscribe();
        toast.success(t('toast.pushEnabled'));
      }
    } catch {
      toast.error(t('toast.pushFailed'));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {t('pushCard.title')}
          </CardTitle>
          <CardDescription>{t('pushCard.description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Badge variant={isSubscribed ? 'default' : 'secondary'}>
            {isSubscribed
              ? t('pushCard.subscribed')
              : t('pushCard.notSubscribed')}
          </Badge>
          <Button variant="outline" size="sm" onClick={handlePushToggle}>
            {isSubscribed ? t('pushCard.unsubscribe') : t('pushCard.subscribe')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            {t('sendCard.title')}
          </CardTitle>
          <CardDescription>{t('sendCard.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="event" className="text-sm font-medium">
              {t('fields.eventSlug')}
            </label>
            <Input
              id="event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder={t('placeholders.eventSlug')}
            />
            <p className="text-muted-foreground text-xs">
              {t('fields.eventSlugHint')}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              {t('fields.title')}
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('placeholders.title')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t('fields.message')}
            </label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('placeholders.message')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              {t('fields.url')}
            </label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('placeholders.url')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('fields.target')}</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={targetType === 'user' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTargetType('user')}
              >
                <User className="mr-1.5 h-4 w-4" />
                {t('buttons.meOnly')}
              </Button>
              <Button
                type="button"
                variant={targetType === 'workspace' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTargetType('workspace')}
              >
                <Users className="mr-1.5 h-4 w-4" />
                {t('buttons.allMembers')}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('fields.channel')}</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={channelMode === 'both' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChannelMode('both')}
              >
                <Bell className="mr-1.5 h-4 w-4" />
                {t('buttons.both')}
              </Button>
              <Button
                type="button"
                variant={channelMode === 'email' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChannelMode('email')}
              >
                <Mail className="mr-1.5 h-4 w-4" />
                {t('buttons.emailOnly')}
              </Button>
              <Button
                type="button"
                variant={channelMode === 'push' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChannelMode('push')}
              >
                <Smartphone className="mr-1.5 h-4 w-4" />
                {t('buttons.pushOnly')}
              </Button>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-center gap-1"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {showAdvanced
              ? t('buttons.hideAdvanced')
              : t('buttons.showAdvanced')}
          </Button>

          {showAdvanced && (
            <div className="border-muted space-y-5 rounded-lg border p-4">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <ImageIcon className="h-4 w-4" />
                  {t('advanced.media')}
                </h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label htmlFor="icon" className="text-xs font-medium">
                      {t('advanced.iconUrl')}
                    </label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder={t('advanced.iconUrlPlaceholder')}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="image" className="text-xs font-medium">
                      {t('advanced.imageUrl')}
                    </label>
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder={t('advanced.imageUrlPlaceholder')}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="badge" className="text-xs font-medium">
                      {t('advanced.badgeUrl')}
                    </label>
                    <Input
                      id="badge"
                      value={badgeIcon}
                      onChange={(e) => setBadgeIcon(e.target.value)}
                      placeholder={t('advanced.badgeUrlPlaceholder')}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Volume2 className="h-4 w-4" />
                  {t('advanced.behavior')}
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label htmlFor="tag" className="text-xs font-medium">
                      {t('advanced.tag')}
                    </label>
                    <Input
                      id="tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder={t('advanced.tagHint')}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={silent ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSilent(!silent)}
                    >
                      <VolumeOff className="mr-1.5 h-4 w-4" />
                      {t('buttons.silent')}
                    </Button>
                    <Button
                      type="button"
                      variant={requireInteraction ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRequireInteraction(!requireInteraction)}
                    >
                      {t('buttons.requireInteraction')}
                    </Button>
                    <Button
                      type="button"
                      variant={renotify ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRenotify(!renotify)}
                    >
                      {t('buttons.renotify')}
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {t('advanced.behaviorHint')}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4" />
                  {t('advanced.delivery')}
                </h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">
                      {t('advanced.urgency')}
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {(
                        ['', 'very-low', 'low', 'normal', 'high'] as Urgency[]
                      ).map((u) => (
                        <Button
                          key={u || 'default'}
                          type="button"
                          variant={urgency === u ? 'default' : 'outline'}
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setUrgency(u)}
                        >
                          {u || t('buttons.default')}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ttl" className="text-xs font-medium">
                      {t('advanced.ttl')}
                    </label>
                    <Input
                      id="ttl"
                      type="number"
                      value={ttl}
                      onChange={(e) => setTtl(e.target.value)}
                      placeholder={t('advanced.ttlPlaceholder')}
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="scheduledAt"
                      className="text-xs font-medium"
                    >
                      {t('advanced.schedule')}
                    </label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) =>
                        setScheduledAt(
                          e.target.value
                            ? new Date(e.target.value).toISOString()
                            : ''
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  {t('advanced.actions')}
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 rounded-md border p-3">
                    <p className="text-muted-foreground text-xs font-medium">
                      {t('advanced.action1')}
                    </p>
                    <Input
                      value={action1Title}
                      onChange={(e) => setAction1Title(e.target.value)}
                      placeholder={t('advanced.actionTitlePlaceholder')}
                    />
                    <Input
                      value={action1Action}
                      onChange={(e) => setAction1Action(e.target.value)}
                      placeholder={t('advanced.actionKeyPlaceholder')}
                    />
                  </div>
                  <div className="space-y-2 rounded-md border p-3">
                    <p className="text-muted-foreground text-xs font-medium">
                      {t('advanced.action2')}
                    </p>
                    <Input
                      value={action2Title}
                      onChange={(e) => setAction2Title(e.target.value)}
                      placeholder={t('advanced.actionTitlePlaceholder')}
                    />
                    <Input
                      value={action2Action}
                      onChange={(e) => setAction2Action(e.target.value)}
                      placeholder={t('advanced.actionKeyPlaceholder')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-muted rounded-md p-3 text-sm">
            <p>
              <strong>{t('context.workspace')}</strong>{' '}
              {currentWorkspace?.name || t('context.none')}
            </p>
            <p>
              <strong>{t('context.user')}</strong> {user?.name} ({user?.email})
            </p>
          </div>

          <Button onClick={handleSend} disabled={sending || !event || !message}>
            {sending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {sending ? t('buttons.sending') : t('buttons.send')}
          </Button>
        </CardContent>
      </Card>

      {lastResult && (
        <Card>
          <CardHeader>
            <CardTitle>{t('resultCard.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted overflow-auto rounded-md p-4 text-sm">
              {JSON.stringify(lastResult, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
