/**
 * Two published workflows the tour's Workflows group expects:
 *  - "Welcome email" on user.registered: a plain email from the first sender
 *    the org has (skipped, with a note, when the org has no sender yet).
 *  - "Provision on form" on form.submitted: an HTTP Webhook action that calls
 *    this app's /api/buildbase/provision with the shared secret.
 *
 * Both are imported with a full flow and then published; a workflow that is
 * not published never runs.
 */
const SITE = (
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  ''
).replace(/\/$/, '');
const SECRET = process.env.BUILDBASE_WEBHOOK_SECRET ?? '';

function node(id, kind, type, config, x, y, label) {
  return { id, kind, type, position: { x, y }, data: { label, config } };
}

async function ensureWorkflow(api, name, trigger, flow) {
  const existing = (await api.list('workflows', { $limit: 100 })).find(
    (w) => w.name === name
  );
  if (existing) {
    console.log(
      `workflow "${name}" exists: ${existing._id} (${existing.status})`
    );
    if (existing.status !== 'published' && existing.status !== 'active') {
      await api
        .post(`workflows/${existing._id}/publish`)
        .catch((e) => console.log('  publish:', e.message));
    }
    return existing;
  }
  const created = await api.post('workflows/import', {
    name,
    description: `Seeded for the tour: ${name}`,
    trigger,
    flow,
  });
  const id = created?._id ?? created?.data?._id;
  console.log(`workflow "${name}" imported: ${id}`);
  const pub = await api.post(`workflows/${id}/publish`);
  console.log(`  published: ${pub?.status ?? pub?.data?.status ?? 'ok'}`);
  return created;
}

export async function seed(api) {
  if (!SITE || !SECRET) {
    console.log(
      'SITE_URL or BUILDBASE_WEBHOOK_SECRET missing: the provisioning workflow needs both; skipping'
    );
  } else {
    await ensureWorkflow(
      api,
      'Provision on form',
      { type: 'triggers.form.submitted', config: {} },
      {
        nodes: [
          node(
            'trigger',
            'trigger',
            'triggers.form.submitted',
            {},
            0,
            0,
            'Form submitted'
          ),
          node(
            'provision',
            'action',
            'actions.http_webhook',
            {
              url: `${SITE}/api/buildbase/provision`,
              method: 'POST',
              headers: { 'x-webhook-secret': SECRET },
              body: JSON.stringify({
                source: 'workflow',
                formId: '{{trigger.formId}}',
                formName: '{{trigger.formName}}',
                recordId: '{{trigger.recordId}}',
                data: '{{trigger.data}}',
              }),
              timeout: 15000,
            },
            320,
            0,
            'Call the app'
          ),
        ],
        edges: [{ id: 'e1', source: 'trigger', target: 'provision' }],
      }
    );
  }

  const senders = await api
    .list('emails/senders', { $limit: 5 })
    .catch(() => []);
  const sender = senders[0];
  if (!sender) {
    console.log(
      'no email sender on this org: "Welcome email" workflow skipped (add a sender in Emails → Senders and re-run)'
    );
    return;
  }
  await ensureWorkflow(
    api,
    'Welcome email',
    { type: 'triggers.user.registered', config: {} },
    {
      nodes: [
        node(
          'trigger',
          'trigger',
          'triggers.user.registered',
          {},
          0,
          0,
          'User registered'
        ),
        node(
          'welcome',
          'action',
          'actions.send_email',
          {
            mode: 'plain',
            senderId: sender._id,
            to: '{{trigger.email}}',
            subject: 'Welcome to the BuildBase demo, {{trigger.name}}',
            html: '<p>Hi {{trigger.name}},</p><p>This email came from a workflow that runs on <code>user.registered</code>. The app never sent it; the platform did.</p>',
            text: 'Hi {{trigger.name}}, this email came from a workflow on user.registered.',
          },
          320,
          0,
          'Send welcome'
        ),
      ],
      edges: [{ id: 'e1', source: 'trigger', target: 'welcome' }],
    }
  );
}
