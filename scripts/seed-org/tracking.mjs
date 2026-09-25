/**
 * One analytics tag in the org's library, attached to this app's client, so
 * the Tracking page has something to ask consent for. PostHog with a
 * placeholder key: it loads and records nothing useful, which is the point
 * of a demo tag. Replace the key in the console to see real data.
 */
const CLIENT_ID = process.env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID;
const PLACEHOLDER_KEY = 'phc_buildbasedemo0000000000000000000000000';

export async function seed(api) {
  const scripts = await api.list('organizations/tracking/scripts');
  let script = scripts.find((s) => s.name === 'Demo analytics (PostHog)');
  if (!script) {
    script = await api.post('organizations/tracking/scripts', {
      name: 'Demo analytics (PostHog)',
      provider: 'posthog',
      providerId: PLACEHOLDER_KEY,
      host: 'us.i.posthog.com',
      consentCategory: 'analytics',
      enabled: true,
    });
    script = script?.data ?? script;
    console.log(`tracking script created: ${script?._id}`);
  } else {
    console.log(`tracking script exists: ${script._id}`);
  }
  if (!CLIENT_ID) {
    console.log(
      'NEXT_PUBLIC_BUILDBASE_CLIENT_ID missing: not attached to a client'
    );
    return;
  }
  const clients = await api.list('auth/settings', { $limit: 50 });
  const client = clients.find((c) => c.clientId === CLIENT_ID);
  if (!client) {
    console.log(
      `auth client ${CLIENT_ID} not found on this org; attach the tag by hand under Auth → Clients`
    );
    return;
  }
  const current = (client.trackingScripts ?? []).map((s) =>
    typeof s === 'string' ? s : s._id
  );
  if (current.includes(script._id)) {
    console.log(`already attached to client ${client._id}`);
    return;
  }
  await api.patch(`auth/settings/${client._id}`, {
    trackingScripts: [...current, script._id],
  });
  console.log(`attached to client ${client._id}`);
}
