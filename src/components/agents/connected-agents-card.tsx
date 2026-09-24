'use client';

import { useTranslations } from 'next-intl';
import { Bot } from 'lucide-react';
import { ConnectedAgents, ConnectMcpGuide } from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { siteConfig } from '@/config/site';

/**
 * The agents this person has connected over MCP, and how to connect one.
 * Both pieces are the SDK's: `ConnectedAgents` lists and revokes grants,
 * `ConnectMcpGuide` renders the per-client setup steps for the server
 * address we pass it. The MCP endpoint is this app's own /api/mcp.
 */
export function ConnectedAgentsCard() {
  const t = useTranslations('profile');
  const mcpUrl = `${siteConfig.url}/api/mcp`;

  return (
    <Card id="agents">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Bot className="h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('agents.title')}</CardTitle>
          <CardDescription>{t('agents.description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ConnectedAgents
          title={null}
          description={null}
          showConnectGuide={false}
        />
        <div className="border-t pt-6">
          <ConnectMcpGuide
            config={{
              url: mcpUrl,
              name: siteConfig.name,
              docsUrl: siteConfig.buildbase.agentGuide,
            }}
            title={t('agents.guideTitle')}
            description={t('agents.guideDescription')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
