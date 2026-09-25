/** The release-notes collection the Collections page reads, with three records. */
export const RELEASE_NOTES = {
  name: 'Release notes',
  slug: 'release-notes',
  fields: [
    {
      slug: 'title',
      helpText: 'Short name of the change',
      title: 'Title',
      type: 'text',
      required: true,
    },
    {
      slug: 'version',
      helpText: 'Semver, like 0.2.0',
      title: 'Version',
      type: 'text',
      required: true,
    },
    {
      slug: 'date',
      helpText: 'When it shipped',
      title: 'Date',
      type: 'date',
      required: false,
    },
    {
      slug: 'body',
      helpText: 'What changed, for people',
      title: 'Notes',
      type: 'rich-text',
      required: false,
    },
  ],
  records: [
    {
      title: 'Tour launch',
      version: '0.2.0',
      date: '2026-09-24T00:00:00.000Z',
      body: '<p>67 tasks in 13 groups, progress per account.</p>',
    },
    {
      title: 'Documents with metering',
      version: '0.2.0',
      date: '2026-09-24T00:00:00.000Z',
      body: '<p>Quota, credits and a hard cap at the plan limit.</p>',
    },
    {
      title: 'Eight languages',
      version: '0.2.1',
      date: '2026-09-25T00:00:00.000Z',
      body: '<p>The tour itself is translated, right-to-left included.</p>',
    },
  ],
};

function defaultFor(type) {
  switch (type) {
    case 'number':
      return 0;
    case 'bool':
      return false;
    case 'date':
      return '2026-01-01T00:00:00.000Z';
    case 'email':
      return 'hello@example.com';
    case 'link':
      return 'https://example.com';
    case 'rich-text':
      return '<p></p>';
    default:
      return '-';
  }
}

/** Create (or find) a collection with one live version carrying `fields`. */
export async function ensureCollection(api, { name, slug, fields }) {
  const all = await api.list('collections', { pagination: false });
  let coll = all.find((c) => c.slug === slug);
  if (!coll) coll = await api.post('collections', { name, slug });
  const versions = await api.list(`collections/${coll._id}/versions`, {
    pagination: false,
  });
  let live = versions.find((v) => v.live);
  if (!live) {
    let draft = versions.find((v) => !v.live);
    if (!draft)
      draft = await api.post(`collections/${coll._id}/versions`, {
        name: 'v1',
      });
    // Every field key is required by the API, defaultValue included, and the
    // default has to suit the type.
    const complete = fields.map((f) => ({
      helpText: '',
      defaultValue: defaultFor(f.type),
      ...f,
    }));
    await api.patch(`collections/${coll._id}/versions/${draft._id}`, {
      fields: complete,
    });
    live = await api.patch(`collections/${coll._id}/versions/${draft._id}`, {
      live: true,
    });
    live = { ...draft, ...live, live: true };
  }
  console.log(
    'collection',
    slug,
    coll._id,
    'live version',
    live.version ?? '?',
    live._id
  );
  return { collection: coll, version: live };
}

export async function seed(api) {
  const { collection, version } = await ensureCollection(api, RELEASE_NOTES);
  const records = await api.list(`collections/data/${RELEASE_NOTES.slug}`, {
    latest: true,
    version: version.version ?? 1,
  });
  for (const r of RELEASE_NOTES.records) {
    if (records.some((x) => x.data?.title === r.title)) continue;
    const rec = await api.post(
      `collections/${collection._id}/versions/${version._id}/records`,
      r
    );
    console.log('record', r.title, rec?._id ?? rec?.id ?? 'created');
  }
}
