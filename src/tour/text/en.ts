import type { TourText } from './types';

/** The tour's text, English. Every other language file mirrors this shape. */
export const en: TourText = {
  groups: {
    start: {
      title: 'Get started',
      summary: 'Sign up, sign in, and see what a session is.',
    },
    workspaces: {
      title: 'Workspaces',
      summary:
        'Every customer of your app gets a workspace. Create, switch, rename, delete.',
    },
    team: {
      title: 'Team',
      summary: 'Invite by email, roles, seats, and what each role may do.',
    },
    billing: {
      title: 'Plans and billing',
      summary:
        'Trials, plans, checkout, invoices and the billing portal, all from the console.',
    },
    usage: {
      title: 'Usage and quotas',
      summary: 'Meter what your app does and let the plan set the limit.',
    },
    credits: {
      title: 'Credits',
      summary: 'A prepaid balance your app spends, and packages people buy.',
    },
    features: {
      title: 'Feature flags',
      summary:
        'Switch a feature on for a workspace or a user without a deploy.',
    },
    permissions: {
      title: 'Permissions',
      summary: 'Roles per workspace, checked by the SDK and by the server.',
    },
    notifications: {
      title: 'Notifications',
      summary: 'Email, push and an inbox every user can come back to.',
    },
    push: {
      title: 'Push',
      summary: 'Browser push, subscribed and delivered from the platform.',
    },
    agents: {
      title: 'Agents and MCP',
      summary: 'Connect Claude or any MCP client to this app as yourself.',
    },
    webhooks: {
      title: 'Webhooks',
      summary: 'Platform events mirrored into this app’s own database.',
    },
    content: {
      title: 'Content',
      summary: 'Docs, FAQs and copy written in the console, read by this app.',
    },
    forms: {
      title: 'Forms',
      summary: 'A form built in the console, rendered and submitted from here.',
    },
    collections: {
      title: 'Collections',
      summary: 'Custom data with versioned schemas, stored on the platform.',
    },
    assets: {
      title: 'Assets',
      summary:
        'Files uploaded through the app, stored and served by the platform.',
    },
    links: {
      title: 'Short links',
      summary: 'Share links that count every click.',
    },
    audience: {
      title: 'Audience and attributes',
      summary:
        'Custom attributes on a user, a waitlist, and a marketing audience.',
    },
    tracking: {
      title: 'Tracking',
      summary: 'Analytics tags with consent, custom events and attribution.',
    },
    workflows: {
      title: 'Workflows',
      summary: 'Automations built in the console, started by what you do here.',
    },
    reports: {
      title: 'Reports',
      summary: 'Every module reports; this app charts a few.',
    },
    platform: {
      title: 'Platform',
      summary: 'Languages, themes, your data, and taking this repo home.',
    },
  },
  tasks: {
    'sign-up': {
      title: 'Create your account',
      why: 'Sign-up, email verification and the session are the platform’s, hosted on its pages. This app ships no auth code.',
      steps: [
        'Click Sign in on the home page.',
        'Register with your email and the code you receive.',
        'You land back here, signed in.',
      ],
    },
    'trust-device': {
      title: 'Trust this device',
      why: 'A trusted device stays signed in for 90 days and skips extra checks. Every device and session is listed, and can be signed out.',
      steps: [
        'During sign-in, choose Trust this device.',
        'Open Profile → Devices and sessions to see it listed.',
      ],
    },
    'add-passkey': {
      title: 'Add a passkey',
      why: 'Passwordless sign-in with a fingerprint, face or device PIN. Enabled per organization in the console; nothing to build.',
      steps: [
        'Open Profile → Security.',
        'Add a passkey and follow your browser’s prompt.',
        'Sign out and sign in with it.',
      ],
    },
    'see-session': {
      title: 'See how the session reaches your server',
      why: 'The SDK holds a session id; this app keeps it in an httpOnly cookie and its API routes call BuildBase with it. Your server never handles a password.',
      steps: [
        'Open Profile.',
        'Read the “How this works” panel: the cookie, the server client, and which call made the profile.',
      ],
    },
    'sign-out-everywhere': {
      title: 'Sign out everywhere',
      why: 'Ends every session on every device on the platform, not just the browser you are in.',
      steps: [
        'Open Profile → Devices and sessions.',
        'Sign out another session, or use Sign out everywhere.',
      ],
    },
    'first-workspace': {
      title: 'Notice your first workspace',
      why: 'A workspace is the tenant: every plan, quota, credit balance and member belongs to one. The platform created your first one on sign-up.',
      steps: [
        'Look at the workspace name in the sidebar.',
        'Open the switcher to see it listed.',
      ],
    },
    'create-workspace': {
      title: 'Create a second workspace',
      why: 'One person can belong to several tenants. Each has its own billing.',
      steps: [
        'Open the workspace switcher.',
        'Choose Create workspace and name it.',
      ],
    },
    'switch-workspace': {
      title: 'Switch between them',
      why: 'Switching swaps every context at once: subscription, usage, credits, members, features.',
      steps: [
        'Open the switcher and pick the other workspace.',
        'Watch the dashboard cards change.',
      ],
    },
    'rename-workspace': {
      title: 'Rename a workspace',
      why: 'The built-in settings screen handles the general settings; you decide which sections show.',
      steps: ['Open Settings → General.', 'Change the name and save.'],
    },
    'workspace-settings-screens': {
      title: 'Open every built-in settings screen',
      why: 'Account, Security, Devices, Connected agents, General, Members, Plan and billing, Usage, Credits, Features, Notifications, Danger zone: all provided, all switchable off.',
      steps: ['Open Settings.', 'Click through the sidebar sections.'],
    },
    'delete-workspace': {
      title: 'Delete the second workspace',
      why: 'The danger zone is offered only when the settings allow a person to own more than one.',
      steps: [
        'Switch to the second workspace.',
        'Settings → Danger zone → Delete.',
      ],
    },
    'invite-member': {
      title: 'Invite someone by email',
      why: 'The address needs no account. They get an email, follow the link, sign up or in, and accept. A pending invitation holds a seat.',
      steps: [
        'Open Team.',
        'Enter an email address you can read and a role, and send.',
      ],
    },
    'pending-seat': {
      title: 'See the pending invitation hold a seat',
      why: 'Seats are billed while an invitation is pending, so the seat count on Team and the plan agree.',
      steps: [
        'On Team, read the seat cards and the note under the invite form: the pending row is counted.',
      ],
    },
    'accept-invitation': {
      title: 'Accept an invitation',
      why: 'From the email link, or from the pending list inside the app. Arriving by the link proves the address, so no separate verification.',
      steps: [
        'Open the invitation email in the other mailbox and follow its link.',
        'Sign up or in. The invitation banner at the top of every dashboard page has Accept.',
      ],
    },
    'change-role': {
      title: 'Change a member’s role',
      why: 'Roles are per workspace and defined in the console. The member is told by email and in their inbox.',
      steps: [
        'On Team, pick another role next to a member who is not the owner.',
      ],
    },
    'viewer-limits': {
      title: 'See what a viewer cannot do',
      why: 'The SDK hides what a role may not do, and the server refuses it anyway.',
      steps: [
        'Sign in as the viewer.',
        'Open Permissions and Documents: the actions a viewer lacks are missing or disabled.',
      ],
    },
    'revoke-invitation': {
      title: 'Revoke a pending invitation',
      why: 'The link stops working and the seat is released.',
      steps: ['Invite another address and revoke it from the pending list.'],
    },
    'seat-limit': {
      title: 'Hit the seat limit',
      why: 'The plan sets the seats. At the limit the invite form gives way to the limit message, and the server answers 402.',
      steps: ['Invite until the form says the limit is reached.'],
    },
    'see-trial': {
      title: 'See your trial',
      why: 'A new workspace starts on a trial the plan defines. The dashboard says how long is left.',
      steps: ['Open the dashboard and read the trial card.'],
    },
    'compare-plans': {
      title: 'Compare the plans',
      why: 'The pricing page is generated from the plans in the console: names, prices per interval, quotas, limits and features. Change a price there and it changes here.',
      steps: ['Open Pricing.', 'Switch the billing interval and currency.'],
    },
    subscribe: {
      title: 'Subscribe with a test card',
      why: 'Checkout is Stripe’s, created by the platform for your workspace. Use card 4242 4242 4242 4242.',
      steps: [
        'On Pricing, choose a plan.',
        'Pay with the test card.',
        'You return to the dashboard on the plan.',
      ],
    },
    'trial-banner-gone': {
      title: 'Watch the trial banner disappear',
      why: 'Gates re-render from the subscription context the moment it changes.',
      steps: [
        'Back on the dashboard, the trial card is gone and the plan card shows the plan.',
      ],
    },
    'view-invoice': {
      title: 'View an invoice',
      why: 'Invoices come from Stripe through the platform, with a hosted PDF.',
      steps: ['Open Invoices and open the latest one.'],
    },
    'billing-portal': {
      title: 'Open the billing portal',
      why: 'Card changes, receipts and cancellation on Stripe’s portal, opened for the workspace.',
      steps: ['On the dashboard’s plan card, choose Manage billing.'],
    },
    upgrade: {
      title: 'Upgrade to the next plan',
      why: 'Prorated by Stripe; the quotas and features change with the plan.',
      steps: ['On Pricing, choose the higher plan.'],
    },
    'cancel-resume': {
      title: 'Cancel, then resume',
      why: 'Cancellation runs to the period end and can be undone until then.',
      steps: ['Cancel from the plan card.', 'Resume from the same place.'],
    },
    'seat-price': {
      title: 'See seat pricing change when a member joins',
      why: 'Per-seat plans bill members and pending invitations. The SDK computes the same number the platform bills.',
      steps: ['On Team, invite someone; read the seat line and the plan card.'],
    },
    'record-usage': {
      title: 'Record usage',
      why: 'Your app meters what it does (a document created, a video processed); the plan says how much is included.',
      steps: [
        'Open Documents and create one.',
        'Read the "What the platform recorded" line under the form.',
        'Open Usage: the documents quota moved.',
      ],
    },
    'usage-threshold': {
      title: 'Cross the warning threshold',
      why: 'A gate renders at 80% so you can nudge before the limit.',
      steps: ['Create documents until the notice appears above the list.'],
    },
    'usage-limit': {
      title: 'Hit the limit',
      why: 'At the included amount the server answers 402 and the create button locks, unless the plan allows overage. The UI and the server read the same quota.',
      steps: ['Keep creating until the button locks and a create is refused.'],
    },
    'usage-log': {
      title: 'Read the usage log',
      why: 'Every recorded unit is a row, per workspace and per quota.',
      steps: ['On Usage, open the log.'],
    },
    'see-balance': {
      title: 'See your credit balance',
      why: 'A prepaid balance per workspace, granted by the plan or bought in packages.',
      steps: ['Open Credits.'],
    },
    'spend-credits': {
      title: 'Spend credits on an action',
      why: 'Your server consumes; the balance updates in every open tab.',
      steps: [
        'On Documents, create one: it spends a credit.',
        'Watch the sidebar balance and the metering line change.',
      ],
    },
    'credits-low': {
      title: 'Run low',
      why: 'A gate at a threshold, so you can offer a top-up before it runs out.',
      steps: [
        'Keep creating documents until the low-balance notice shows above the list.',
      ],
    },
    'buy-credits': {
      title: 'Buy a package',
      why: 'Packages are defined in the console; checkout is Stripe’s.',
      steps: ['On Credits, buy the 100-credit package with the test card.'],
    },
    'credit-transactions': {
      title: 'Read the transactions',
      why: 'Every grant, purchase and spend is a row, with the bucket it came from.',
      steps: ['On Credits, scroll to Transactions.'],
    },
    'feature-off': {
      title: 'See a feature that is off',
      why: 'Documents has three sections behind workspace flags: exports, sharing, e-signatures. Off shows a locked state, not a broken button.',
      steps: [
        'Open Documents and scroll to Feature gates.',
        'Find a section marked Disabled.',
      ],
    },
    'feature-on': {
      title: 'See it switched on',
      why: 'Flags change from the console with no deploy. A plan can grant them, and a workspace can be overridden by hand.',
      steps: [
        'Upgrade to a plan that includes a feature, or ask us to switch one on for your workspace.',
        'Reload Documents: the section unlocks.',
      ],
    },
    'user-feature': {
      title: 'A flag on a person, not a workspace',
      why: 'User features follow the person across workspaces; workspace features follow the tenant.',
      steps: [
        'Open Profile: the features listed there are yours, not the workspace’s.',
      ],
    },
    'permission-matrix': {
      title: 'Read your permission matrix',
      why: 'What your role in this workspace allows, resolved by the platform.',
      steps: ['Open Permissions.'],
    },
    'forbidden-action': {
      title: 'Try a forbidden action',
      why: 'The buttons are disabled for a viewer; if you call the API anyway the server answers 403. Both read the role the platform holds for you in this workspace.',
      steps: [
        'As a viewer, open Documents: create and delete are disabled.',
        'Send the request anyway, from a terminal or the MCP tools: 403.',
      ],
    },
    'custom-role': {
      title: 'See a custom role',
      why: 'Roles and their permissions are defined per organization in the console.',
      steps: [
        'Read the roles on Permissions: this demo defines admin, editor and viewer.',
      ],
    },
    'inbox-first-item': {
      title: 'Find your first notification',
      why: 'Everything the app sends you lands in an inbox you can come back to: one item per notification, however it was delivered.',
      steps: [
        'Click the bell in the header, or open Inbox in the sidebar.',
        'Everything the app has sent you is there; opening the panel marks it seen, not read.',
      ],
    },
    'send-notification': {
      title: 'Send a notification from the app',
      why: 'One call sends by email and push; the platform’s gate decides which channels fire.',
      steps: [
        'Open Notifications. The form is filled in with the "Comment added" event.',
        'Send it to yourself, then look at the bell.',
      ],
    },
    'inbox-live': {
      title: 'Watch it arrive live',
      why: 'Open inboxes are told over a socket and refetch; no reload.',
      steps: ['Keep the inbox open in one tab and send from another.'],
    },
    'open-from-email': {
      title: 'Open it from the email',
      why: 'Clicking the email link marks the inbox item read; merely opening the email does not.',
      steps: [
        'Open the email you received and follow its link.',
        'The inbox item is read, "by email click".',
      ],
    },
    'mark-all-read': {
      title: 'Mark all as read, archive one',
      why: 'Read, seen and archived are separate states, kept per person.',
      steps: ['In the inbox, archive one item and mark the rest read.'],
    },
    'notification-preferences': {
      title: 'Turn a channel off for yourself',
      why: 'Each member chooses how they are interrupted; the workspace admin sets the defaults and can mark an event required.',
      steps: [
        'Settings → Notifications.',
        'Turn email off for "Comment added"; send again and see it arrive in the inbox only.',
      ],
    },
    'required-event': {
      title: 'See a required event',
      why: 'An admin can make an event required; members cannot switch it off.',
      steps: ['Settings → Notifications: "Weekly report" is locked.'],
    },
    'delivery-log': {
      title: 'See the console’s delivery log',
      why: 'Every notification every user was sent, with what email and push did, and whether it was read.',
      steps: [
        'Read the screenshot on this task; the log is in the console, not the app.',
      ],
    },
    'push-subscribe': {
      title: 'Subscribe this browser to push',
      why: 'Web push with the platform’s VAPID keys and a service worker the SDK ships.',
      steps: [
        'Open Notifications and enable push.',
        'Allow the browser prompt.',
      ],
    },
    'push-receive': {
      title: 'Receive a push',
      why: 'Sent per device, delivered by the browser even when the tab is closed.',
      steps: ['Send the "Comment added" event to yourself with push on.'],
    },
    'push-click': {
      title: 'Click it',
      why: 'The click goes through the platform’s link check and marks the inbox item read.',
      steps: ['Click the push notification.'],
    },
    'mcp-config': {
      title: 'Set up your MCP client',
      why: 'This app is an MCP server. Any MCP client signs in with your BuildBase account and acts as you.',
      steps: [
        'Open Profile → Connected agents.',
        'Pick your client in the guide and follow its steps: the server address is this app’s /api/mcp.',
      ],
    },
    'mcp-connect': {
      title: 'Connect an agent',
      why: 'The client discovers the OAuth server from /.well-known, signs you in on the hosted pages, and receives a token this app minted with its own secret.',
      steps: ['Restart the client and approve the connection.'],
    },
    'mcp-call': {
      title: 'Ask it to list your documents',
      why: 'Built-in tools read your account; the app’s own tools read and write its data, under your permissions.',
      steps: [
        'Ask: "List my documents in BuildBase Demo".',
        'The agent calls list_documents; the tour ticks the moment a tool runs as you.',
      ],
    },
    'mcp-write': {
      title: 'Ask it to create one',
      why: 'A write through an agent is metered and permission-checked exactly like a click.',
      steps: [
        'Ask: "Create a document called Agent test".',
        'That needs the documents:write scope you granted on the consent screen.',
      ],
    },
    'agent-list': {
      title: 'See the connected agent, and disconnect it',
      why: 'Every agent grant is listed with its scopes, and can be revoked.',
      steps: ['Profile → Connected agents → Disconnect.'],
    },
    'llms-txt': {
      title: 'Read what agents read',
      why: 'llms.txt, the API catalog and the .well-known documents are generated from one config.',
      steps: [
        'Open /llms.txt, then /.well-known/mcp/server-card.json and /openapi.json.',
      ],
    },
    'webhook-received': {
      title: 'See a platform event land in this app’s database',
      why: 'Subscriptions, workspaces and members change on the platform; webhooks tell your server, signed.',
      steps: [
        'Do anything the platform notices: invite someone, subscribe, buy credits.',
        'Open Events: the webhooks table lists what arrived, each one signature-checked before it was stored.',
      ],
    },
    'sdk-events': {
      title: 'See the browser events too',
      why: 'The SDK emits lifecycle events in the browser; this app forwards them to keep its own tables in step.',
      steps: ['On Events, read the app-event table.'],
    },
    'switch-language': {
      title: 'Switch language',
      why: 'Eight languages in the SDK’s own screens and in this app, with ICU plurals and native numerals.',
      steps: ['Use the language switcher in the header.'],
    },
    rtl: {
      title: 'Try Arabic',
      why: 'Right-to-left layout in the SDK screens, not just translated strings.',
      steps: ['Switch to العربية and open Settings.'],
    },
    'dark-mode': {
      title: 'Toggle dark mode',
      why: 'The SDK’s screens follow your app’s .dark class and CSS variables.',
      steps: ['Use the theme toggle.'],
    },
    'export-data': {
      title: 'Export your data',
      why: 'GDPR Article 15: this app’s own data plus your profile from the platform, in one file.',
      steps: ['Profile → Export my data.'],
    },
    'clone-it': {
      title: 'Take it home',
      why: 'Everything you just did is in this repository. Clone it, point it at your organization, and start from here.',
      steps: [
        'git clone https://github.com/buildbase-app/nextjs-starter',
        'Copy .env.example to .env.local and fill in your org and client.',
        'npm install && npm run dev',
      ],
    },
    // content
    'help-policy': {
      title: 'Read the help center',
      why: 'Editorial content lives in the console, not in this repo: a policy block, docs, FAQs, testimonials. The app reads it over the organization API with a server-only token.',
      steps: [
        'Open the help center.',
        'Read the refund policy block.',
        'Change its text in the console and reload.',
      ],
    },
    'help-doc': {
      title: 'Open a doc',
      why: 'Docs have folders and a published flag; the app lists folders from the tree and shows only what is published.',
      steps: ['On the help center, pick a doc in the left column.'],
    },
    'help-faq': {
      title: 'Expand a FAQ',
      why: 'A FAQ collection is a curated list of questions; the same question can sit in several collections.',
      steps: [
        'On the help center, open a question under Frequently asked.',
        'Add one in the console and reload.',
      ],
    },
    'help-testimonials': {
      title: 'See the testimonials',
      why: 'Testimonials are drafts until someone publishes them in the console.',
      steps: ['Scroll to What customers say on the help center.'],
    },
    // forms
    'form-submit': {
      title: 'Submit the contact form',
      why: 'The form schema is built in the console and served publicly; each submission becomes a collection record and fires form.submitted. This app proxies the submit through its own server to add its checks.',
      steps: [
        'Open Forms.',
        'Fill in the contact form and send it.',
        'It appears under Latest submissions.',
      ],
    },
    'form-invalid': {
      title: 'Send something the form refuses',
      why: 'The platform validates against the live schema and returns every error at once; the app shows them as they came.',
      steps: [
        'Leave a required field empty or type an invalid email.',
        'Send, and read the errors.',
      ],
    },
    'form-console': {
      title: 'See the submission in the console',
      why: "Every submission is a record in the form's collection, with a chart of submissions over time.",
      steps: [
        'Open the Forms screen in the console and find the Contact form.',
      ],
    },
    'form-workflow': {
      title: 'Wire a workflow to the form',
      why: 'form.submitted is a workflow trigger: send a confirmation email, post to Slack, call your server. Built in the console, nothing to deploy here.',
      steps: [
        'In the console, create a workflow on the form.submitted trigger.',
        'Submit the form again and watch the instance run.',
      ],
    },
    // collections
    'collection-read': {
      title: 'Read the release notes',
      why: 'A collection is custom data with a versioned schema. The app reads records of the live version, so a schema change is a publish, not a deploy.',
      steps: [
        'Open Collections.',
        "The table columns are the live version's fields.",
      ],
    },
    'collection-delete': {
      title: 'Delete a record',
      why: "Record writes go through the organization API with the app's token; the console shows the change at once.",
      steps: [
        'Delete one release note from the table.',
        'Check the records screen in the console.',
      ],
    },
    'collection-version': {
      title: 'Publish a new version',
      why: 'Live versions are immutable. A new version copies the fields, you add one, you set it live, and the table gains a column.',
      steps: [
        'In the console, add a version to release-notes with an extra field and set it live.',
        'Reload Collections.',
      ],
    },
    // assets
    'upload-asset': {
      title: 'Upload a file',
      why: 'Files are stored and served by the platform, 5 MB each, public or private. The browser never sees the org token: the server forwards the upload.',
      steps: [
        'Open Assets.',
        'Pick an image and wait for it to appear in the gallery, with its width and height.',
      ],
    },
    'asset-in-console': {
      title: 'See it in the console',
      why: 'The same file, in the organization’s asset list, with everything the platform knows about it.',
      steps: [
        'Open the console’s Assets screen.',
        'Find the file you just uploaded.',
      ],
    },
    'asset-private': {
      title: 'Make it private',
      why: 'Visibility is a switch on the platform; a private file’s public URL stops working at once.',
      steps: [
        'On the file card, choose Make private.',
        'Open its URL: it no longer serves.',
        'Make it public again.',
      ],
    },
    // links
    'create-link': {
      title: 'Create a short link',
      why: 'The platform issues a 12-character id and redirects for it; you keep the destination.',
      steps: ['Open Short links.', 'Name it and create it for this app’s URL.'],
    },
    'click-link': {
      title: 'Click it and see the count',
      why: 'Every click is recorded with its country, device and time; the count here is read back from the platform.',
      steps: [
        'Choose Follow: the short URL opens in a new tab and lands on the destination.',
        'Come back and refresh: the count went up.',
      ],
    },
    'change-link-destination': {
      title: 'Change the destination',
      why: 'The short URL stays the same, so links already shared keep working.',
      steps: [
        'Choose Change destination, enter another URL, save.',
        'Follow the link again: it lands on the new place.',
      ],
    },
    'link-analytics-console': {
      title: 'See the analytics screen',
      why: 'The console charts clicks over time and lists each one.',
      steps: [
        'Open the console’s Links → Analytics screen.',
        'Find your clicks.',
      ],
    },
    // audience
    'finish-onboarding': {
      title: 'Finish the onboarding checklist',
      why: 'Custom attributes are key/value pairs on the user, written by the SDK from the browser, as you. The keys are defined in the console so they can be filtered on later.',
      steps: [
        'Open Audience.',
        'Tick all three boxes, add a role title, and finish.',
        'The attributes card shows onboarded=true.',
      ],
    },
    'attributes-in-console': {
      title: 'See the attributes on your record',
      why: 'What the app wrote is on your user in the console, where an admin can filter or segment by it.',
      steps: [
        'Open the console’s Users screen and your own record.',
        'Find onboarded and role-title.',
      ],
    },
    'set-country': {
      title: 'Pick a country, timezone and currency',
      why: 'The SDK ships the lists (countries, timezones, currencies) so a picker needs no download; the choice is saved as attributes.',
      steps: [
        'On Audience, pick a country, a timezone and a currency.',
        'Save preferences.',
      ],
    },
    'subscribe-newsletter': {
      title: 'Subscribe to the newsletter',
      why: 'An audience contact is a marketing record, separate from the account: it can exist without one and is what campaigns send to.',
      steps: [
        'On Audience, subscribe with your email.',
        'The server creates the contact and adds it to the newsletter list.',
      ],
    },
    'join-waitlist': {
      title: 'Join the waitlist, signed out',
      why: 'The platform’s beta waitlist: the form and its copy come from the console, signups are approved there.',
      steps: [
        'Open /waitlist in a private window.',
        'Leave a name and an email.',
        'In the console, Users → Beta, approve the signup.',
      ],
    },
    // tracking
    'tracking-consent': {
      title: 'Give consent, and watch tags load',
      why: 'Analytics and ad tags are set in the console, not in this code. The SDK loads them only after consent, and the banner lists what is actually installed, never a vendor that did not load.',
      steps: [
        'Open Tracking.',
        'Read the consent list: it is built from the tags attached to this app.',
        'Accept all, or analytics only, and see which providers install.',
      ],
    },
    'tracking-custom-event': {
      title: 'Fire a custom event',
      why: 'Sign-ups and purchases fire on their own; your own events go through track() to the data layer and every installed vendor.',
      steps: [
        'On Tracking, click "Track a custom event".',
        'Watch it appear in the live log with its parameters.',
      ],
    },
    'tracking-attribution': {
      title: 'See where you came from',
      why: 'Click ids and campaign parameters are captured on the first page a visitor lands on and ride on every later event, across subdomains.',
      steps: [
        'Reload the Tracking page with ?utm_source=demo&utm_campaign=tour.',
        'Read the attribution card.',
      ],
    },
    'tracking-console-tag': {
      title: 'See the tag in the console',
      why: 'GA4, Meta, PostHog, Clarity and eleven more, each with a consent category and a privacy text the console generates for your policy.',
      steps: [
        'Open Settings → Tracking in the console.',
        'Open Auth → Clients and see the tag attached to this app.',
      ],
    },
    // workflows
    'workflow-runs': {
      title: 'See your workflow runs',
      why: 'Workflows are built in the console: triggers, actions and conditions. The app never calls one; it causes the events they listen for, and can read what ran for each person.',
      steps: [
        'Open Automations.',
        'Read the runs the platform started for you, with status and node counts.',
      ],
    },
    'workflow-cause': {
      title: 'Cause a workflow to run',
      why: 'A sign-up, a form submission, a payment or a low balance starts a run. Nothing in the app names the workflow.',
      steps: [
        'Submit the contact form on Forms.',
        'Return to Automations and refresh: a run for "Provision on form" appears.',
      ],
    },
    'workflow-provision-call': {
      title: 'Receive a call from a workflow',
      why: 'An HTTP Webhook action can call your own server. The call is unsigned and the authorization header is stripped, so it carries a shared secret in x-webhook-secret and the route is idempotent, because the platform retries.',
      steps: [
        'Cause the "Provision on form" workflow.',
        'On Automations, read the provisioning call the app received and stored.',
      ],
    },
    'workflow-console-run': {
      title: 'Open the run in the console',
      why: 'Per-node results, logs, retries and a dead-letter queue, without any of it in your code.',
      steps: [
        'Open Workflows → Instances in the console.',
        "Open your run and read each node's output.",
      ],
    },
    // reports
    'reports-view': {
      title: 'View a report from the platform',
      why: 'Every module has chart and count endpoints, the same ones the console dashboards draw from. This app charts sign-ups, form submissions and link clicks for the last thirty days.',
      steps: [
        'Open Reports.',
        'Read the three charts and the headline counts.',
      ],
    },
    'reports-console': {
      title: 'Compare with the console dashboard',
      why: 'The numbers agree because they come from the same endpoints; some are rollups refreshed every ten minutes.',
      steps: ['Open the console dashboard and find the same sign-up curve.'],
    },
    'see-badge': {
      title: 'See the badge',
      why: 'A "Built with BuildBase" image and link, rendered on the server with no script and no network call, with an optional referral code.',
      steps: ['Scroll to the footer on the home page.'],
    },
    'slack-alert': {
      title: 'Get a Slack alert when someone signs up',
      why: 'Team alerts for up to 55 system events go to one Slack incoming-webhook URL. Console only: the app just causes the events.',
      steps: [
        'In the console, Settings → Slack: paste an incoming-webhook URL and pick "user.registered".',
        'Sign up a test user and watch the Slack channel.',
      ],
    },
    'receive-campaign': {
      title: 'Receive an email campaign',
      why: 'Audience-scale email is written and sent from the console: template, verified sending domain, audience list, per-recipient drafts, open and click tracking.',
      steps: [
        'Join the newsletter on Audience.',
        'In the console, Emails → Campaigns: create one to that list and send.',
        'Read it in your inbox.',
      ],
    },
    'unsubscribe-campaign': {
      title: 'Unsubscribe from it',
      why: 'The {{unsubscribe}} merge tag resolves to a hosted page; the contact is marked unsubscribed and skipped from then on.',
      steps: [
        'Click unsubscribe in the campaign email.',
        'In the console, find the contact under Audience: unsubscribed.',
      ],
    },
    'delete-account': {
      title: 'Delete your account',
      why: 'GDPR Article 17: erased here and on the platform.',
      steps: ['Profile → Delete my account. This ends the tour.'],
    },
  },
};
