/**
 * The tour: a checklist of things to try in this demo, each one showing a
 * BuildBase capability and saying where it comes from.
 *
 * Content lives in `catalog.ts` (English, on purpose: it is documentation,
 * not UI chrome). Progress lives in Postgres (`TourProgress`), one row per
 * person per task, written by detection wherever a task leaves a trace and
 * by "Mark done" where it does not.
 */

export type TourGroupId =
  | 'start'
  | 'workspaces'
  | 'team'
  | 'billing'
  | 'usage'
  | 'credits'
  | 'features'
  | 'permissions'
  | 'notifications'
  | 'push'
  | 'agents'
  | 'webhooks'
  | 'platform';

/** How a task gets ticked. */
export type TourDetection =
  /** An SDK lifecycle event forwarded to /api/events (`workspace:created`, ...). */
  | { kind: 'sdk-event'; event: string }
  /** A platform webhook received at /api/webhooks/buildbase (`subscription.created`, ...). */
  | { kind: 'webhook'; event: string }
  /** Something this app did on the person's behalf (created a document, called a tool, ...). */
  | { kind: 'action'; action: string }
  /** Nothing to observe: the person confirms it. */
  | { kind: 'manual' };

/** Where a capability comes from, shown on the task. */
export interface TourSource {
  /** SDK hooks, components or server calls the task uses. */
  sdk?: string[];
  /** The console screen that configures it, as a path under the console. */
  console?: { screen: string; note?: string; image?: string };
  /** This app's own code that the task touches. */
  app?: string[];
}

export interface TourTask {
  id: string;
  group: TourGroupId;
  title: string;
  /** Why a buyer would care: one or two sentences. */
  why: string;
  /** What to do, in order. */
  steps: string[];
  /** Where to do it in this app, as a route under the locale prefix. */
  href?: string;
  source: TourSource;
  /** A snippet worth copying, when one helps. */
  code?: { title: string; lang: 'tsx' | 'ts' | 'bash' | 'json'; body: string };
  detect: TourDetection;
  /** Tasks that must be done first. */
  requires?: string[];
}

export interface TourGroup {
  id: TourGroupId;
  title: string;
  summary: string;
}
