'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { eventEmitter, SDKEvent } from '@buildbase/sdk';
import type { EventType } from '@buildbase/sdk';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Trash2 } from 'lucide-react';

interface LogEntry {
  id: number;
  eventType: string;
  data: unknown;
  timestamp: string;
}

let _id = 0;

const EVENT_COLORS: Record<string, string> = {
  [SDKEvent.WorkspaceChanged]: 'bg-blue-500',
  [SDKEvent.WorkspaceUpdated]: 'bg-blue-400',
  [SDKEvent.UserUpdated]: 'bg-violet-500',
  [SDKEvent.UserCreated]: 'bg-green-500',
  [SDKEvent.WorkspaceUserAdded]: 'bg-green-400',
  [SDKEvent.WorkspaceUserRemoved]: 'bg-red-500',
  [SDKEvent.WorkspaceUserRoleChanged]: 'bg-amber-500',
  [SDKEvent.WorkspaceCreated]: 'bg-teal-500',
  [SDKEvent.WorkspaceDeleted]: 'bg-red-600',
};

export default function EventsPage() {
  const t = useTranslations('events');
  const [log, setLog] = useState<LogEntry[]>([]);

  const addEntry = useCallback((eventType: EventType, data: unknown) => {
    setLog((prev) => [
      {
        id: ++_id,
        eventType,
        data,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 49),
    ]);
  }, []);

  useEffect(() => {
    const previous = eventEmitter.getCallbacks();

    eventEmitter.setCallbacks({
      handleEvent: async (eventType, data) => {
        addEntry(eventType, data);
        if (previous?.handleEvent) {
          await previous.handleEvent(eventType, data);
        }
      },
    });

    return () => {
      eventEmitter.setCallbacks(previous);
    };
  }, [addEntry]);

  const EVENT_LABELS: Record<string, string> = {
    [SDKEvent.UserCreated]: t('eventLabels.userCreated'),
    [SDKEvent.UserUpdated]: t('eventLabels.userUpdated'),
    [SDKEvent.WorkspaceChanged]: t('eventLabels.workspaceChanged'),
    [SDKEvent.WorkspaceUpdated]: t('eventLabels.workspaceUpdated'),
    [SDKEvent.WorkspaceUserAdded]: t('eventLabels.memberAdded'),
    [SDKEvent.WorkspaceUserRemoved]: t('eventLabels.memberRemoved'),
    [SDKEvent.WorkspaceUserRoleChanged]: t('eventLabels.roleChanged'),
    [SDKEvent.WorkspaceCreated]: t('eventLabels.workspaceCreated'),
    [SDKEvent.WorkspaceDeleted]: t('eventLabels.workspaceDeleted'),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLog([])}
          disabled={log.length === 0}
        >
          <Trash2 className="mr-1.5 h-4 w-4" />
          {t('clearButton')}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t('listenCard.title')}</CardTitle>
          <CardDescription>{t('listenCard.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SDKEvent).map(([, slug]) => (
              <div key={slug} className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${EVENT_COLORS[slug] ?? 'bg-gray-400'}`}
                />
                <code className="text-muted-foreground text-xs">{slug}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">{t('liveCard.title')}</CardTitle>
            <CardDescription>
              {t('liveCard.captured', { count: log.length })}
            </CardDescription>
          </div>
          <Activity className="text-muted-foreground h-5 w-5" />
        </CardHeader>
        <CardContent>
          {log.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              {t('liveCard.empty')}
            </p>
          ) : (
            <div className="space-y-2">
              {log.map((entry) => (
                <div
                  key={entry.id}
                  className="border-border flex items-start gap-3 rounded-md border p-3 text-sm"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${EVENT_COLORS[entry.eventType] ?? 'bg-gray-400'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {entry.eventType}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {EVENT_LABELS[entry.eventType] ?? entry.eventType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
