'use client';

import { useState } from 'react';
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
  const { user } = useSaaSAuth();
  const { currentWorkspace } = useSaaSWorkspaces();
  const { isSubscribed, subscribe, unsubscribe } = usePushNotifications();

  const [sending, setSending] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastResult, setLastResult] = useState<Record<string, unknown> | null>(
    null
  );

  // Core fields
  const [event, setEvent] = useState('test_notification');
  const [title, setTitle] = useState('Test Notification');
  const [message, setMessage] = useState(
    'Hello {{name}}, this is a test from {{workspaceName}}!'
  );
  const [url, setUrl] = useState('');
  const [targetType, setTargetType] = useState<TargetType>('user');
  const [channelMode, setChannelMode] = useState<ChannelMode>('push');

  // Media fields
  const [icon, setIcon] = useState('');
  const [image, setImage] = useState('');
  const [badgeIcon, setBadgeIcon] = useState('');

  // Push behavior fields
  const [tag, setTag] = useState('');
  const [silent, setSilent] = useState(false);
  const [requireInteraction, setRequireInteraction] = useState(false);
  const [renotify, setRenotify] = useState(false);

  // Delivery fields
  const [urgency, setUrgency] = useState<Urgency>('');
  const [ttl, setTtl] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  // Action buttons
  const [action1Title, setAction1Title] = useState('');
  const [action1Action, setAction1Action] = useState('');
  const [action2Title, setAction2Title] = useState('');
  const [action2Action, setAction2Action] = useState('');

  const handleSend = async () => {
    if (!currentWorkspace) {
      toast.error('Please select a workspace first');
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
        toast.error(data.error || 'Failed to send notification');
        return;
      }

      setLastResult(data);
      toast.success(
        data.sent
          ? `Notification sent to ${data.notifiedCount ?? 1} user(s)`
          : `Notification not sent: ${data.reason || 'unknown reason'}`
      );
    } catch {
      toast.error('Network error — could not reach the server');
    } finally {
      setSending(false);
    }
  };

  const handlePushToggle = async () => {
    try {
      if (isSubscribed) {
        await unsubscribe();
        toast.success('Push notifications disabled');
      } else {
        await subscribe();
        toast.success('Push notifications enabled');
      }
    } catch {
      toast.error('Failed to toggle push notifications');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notifications Test
        </h1>
        <p className="text-muted-foreground">
          Send test notifications via the BuildBase SDK
        </p>
      </div>

      {/* Push subscription status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Browser Push Notifications
          </CardTitle>
          <CardDescription>
            Enable browser push notifications for this device
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Badge variant={isSubscribed ? 'default' : 'secondary'}>
            {isSubscribed ? 'Subscribed' : 'Not subscribed'}
          </Badge>
          <Button variant="outline" size="sm" onClick={handlePushToggle}>
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        </CardContent>
      </Card>

      {/* Send test notification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Test Notification
          </CardTitle>
          <CardDescription>
            Fill in the fields below and send a notification via the server-side
            SDK. Merge tags like {'{{name}}'}, {'{{workspaceName}}'},{' '}
            {'{{url}}'} are resolved automatically. Ad-hoc event slugs work for
            push without pre-registering; email requires a registered event.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Event name */}
          <div className="space-y-2">
            <label htmlFor="event" className="text-sm font-medium">
              Event Slug
            </label>
            <Input
              id="event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="e.g. comment_added, deployment_success"
            />
            <p className="text-muted-foreground text-xs">
              For push-only: any slug works (ad-hoc). For email: must match a
              registered event in the admin dashboard.
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title (falls back to event name)"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Push body + email {{message}}"
            />
          </div>

          {/* URL (optional) */}
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              URL
            </label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Opens on push click + {{url}} in email"
            />
          </div>

          {/* Target */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Target</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={targetType === 'user' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTargetType('user')}
              >
                <User className="mr-1.5 h-4 w-4" />
                Me only
              </Button>
              <Button
                type="button"
                variant={targetType === 'workspace' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTargetType('workspace')}
              >
                <Users className="mr-1.5 h-4 w-4" />
                All workspace members
              </Button>
            </div>
          </div>

          {/* Channel */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Channel</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={channelMode === 'both' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChannelMode('both')}
              >
                <Bell className="mr-1.5 h-4 w-4" />
                Both
              </Button>
              <Button
                type="button"
                variant={channelMode === 'email' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChannelMode('email')}
              >
                <Mail className="mr-1.5 h-4 w-4" />
                Email only
              </Button>
              <Button
                type="button"
                variant={channelMode === 'push' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChannelMode('push')}
              >
                <Smartphone className="mr-1.5 h-4 w-4" />
                Push only
              </Button>
            </div>
          </div>

          {/* Advanced options toggle */}
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
            {showAdvanced ? 'Hide' : 'Show'} Advanced Push Options
          </Button>

          {showAdvanced && (
            <div className="border-muted space-y-5 rounded-lg border p-4">
              {/* Media */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <ImageIcon className="h-4 w-4" />
                  Media
                </h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label htmlFor="icon" className="text-xs font-medium">
                      Icon URL
                    </label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="Push icon (falls back to org icon)"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="image" className="text-xs font-medium">
                      Image URL
                    </label>
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Large image in push body"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="badge" className="text-xs font-medium">
                      Badge URL
                    </label>
                    <Input
                      id="badge"
                      value={badgeIcon}
                      onChange={(e) => setBadgeIcon(e.target.value)}
                      placeholder="Status bar icon (Android)"
                    />
                  </div>
                </div>
              </div>

              {/* Behavior */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Volume2 className="h-4 w-4" />
                  Push Behavior
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label htmlFor="tag" className="text-xs font-medium">
                      Tag
                    </label>
                    <Input
                      id="tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="Replaces notification with same tag instead of stacking"
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
                      Silent
                    </Button>
                    <Button
                      type="button"
                      variant={requireInteraction ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRequireInteraction(!requireInteraction)}
                    >
                      Require Interaction
                    </Button>
                    <Button
                      type="button"
                      variant={renotify ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRenotify(!renotify)}
                    >
                      Renotify
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Silent = no sound/vibration. Require Interaction = stays
                    until user interacts. Renotify = sound again when replacing
                    via tag.
                  </p>
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4" />
                  Delivery
                </h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Urgency</label>
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
                          {u || 'Default'}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ttl" className="text-xs font-medium">
                      TTL (seconds)
                    </label>
                    <Input
                      id="ttl"
                      type="number"
                      value={ttl}
                      onChange={(e) => setTtl(e.target.value)}
                      placeholder="86400 (24h default)"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="scheduledAt"
                      className="text-xs font-medium"
                    >
                      Schedule (ISO 8601)
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

              {/* Actions */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  Action Buttons (max 2)
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 rounded-md border p-3">
                    <p className="text-muted-foreground text-xs font-medium">
                      Action 1
                    </p>
                    <Input
                      value={action1Title}
                      onChange={(e) => setAction1Title(e.target.value)}
                      placeholder="Button label (e.g. Reply)"
                    />
                    <Input
                      value={action1Action}
                      onChange={(e) => setAction1Action(e.target.value)}
                      placeholder="Action key (e.g. reply)"
                    />
                  </div>
                  <div className="space-y-2 rounded-md border p-3">
                    <p className="text-muted-foreground text-xs font-medium">
                      Action 2
                    </p>
                    <Input
                      value={action2Title}
                      onChange={(e) => setAction2Title(e.target.value)}
                      placeholder="Button label (e.g. Dismiss)"
                    />
                    <Input
                      value={action2Action}
                      onChange={(e) => setAction2Action(e.target.value)}
                      placeholder="Action key (e.g. dismiss)"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Context info */}
          <div className="bg-muted rounded-md p-3 text-sm">
            <p>
              <strong>Workspace:</strong>{' '}
              {currentWorkspace?.name || 'None selected'}
            </p>
            <p>
              <strong>User:</strong> {user?.name} ({user?.email})
            </p>
          </div>

          {/* Send button */}
          <Button onClick={handleSend} disabled={sending || !event || !message}>
            {sending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {sending ? 'Sending...' : 'Send Notification'}
          </Button>
        </CardContent>
      </Card>

      {/* Result */}
      {lastResult && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
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
