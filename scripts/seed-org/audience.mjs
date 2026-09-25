/**
 * Audience module: the attribute keys the app writes, the newsletter list
 * the subscribe route adds to, and the beta waitlist switched on.
 */
export async function seed(api) {
  const keys = [
    {
      name: 'Onboarded',
      key: 'onboarded',
      type: 'boolean',
      description: 'Finished the in-app onboarding checklist.',
    },
    {
      name: 'Role title',
      key: 'role-title',
      type: 'string',
      description: 'What the person does, in their words.',
    },
    {
      name: 'Country',
      key: 'country',
      type: 'string',
      description: 'Country picked in the app.',
    },
    {
      name: 'Timezone',
      key: 'timezone',
      type: 'string',
      description: 'Timezone picked in the app.',
    },
    {
      name: 'Currency',
      key: 'currency',
      type: 'string',
      description: 'Preferred currency picked in the app.',
    },
  ];
  const existing = await api.list('users/attributes', { limit: 100 });
  for (const k of keys) {
    const found = existing.find((a) => a.key === k.key);
    if (found) {
      console.log(`attribute ${k.key} exists ${found._id}`);
      continue;
    }
    const created = await api.post('users/attributes', {
      ...k,
      allowPublicEdit: true,
      allowPublicView: true,
    });
    console.log(`attribute ${k.key} created ${created?._id ?? created?.id}`);
  }

  const lists = await api.list('audience-lists', { limit: 100 });
  const list = lists.find((l) => l.name === 'newsletter');
  if (list) console.log(`list newsletter exists ${list._id}`);
  else {
    const created = await api.post('audience-lists', {
      name: 'newsletter',
      description: 'People who subscribed from the demo app.',
      type: 'static',
      filter: {},
    });
    console.log(`list newsletter created ${created?._id ?? created?.id}`);
  }

  // Beta waitlist config: the console creates the document; here we only switch it on.
  try {
    const cfg = await api.get('users-beta/config');
    const doc = Array.isArray(cfg?.docs) ? cfg.docs[0] : (cfg?.docs ?? cfg);
    const id = doc?._id ?? doc?.id;
    if (!id)
      console.log(
        'beta config: none yet - enable it once in the console (Users → Beta)'
      );
    else if (doc.enabled) console.log(`beta config enabled ${id}`);
    else {
      await api.patch(`users-beta/config/${id}`, { enabled: true });
      console.log(`beta config enabled ${id}`);
    }
  } catch (e) {
    console.log(`beta config: ${e.message.slice(0, 120)}`);
  }
}
