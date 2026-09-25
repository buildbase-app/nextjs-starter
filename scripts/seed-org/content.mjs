/**
 * Editorial content the /help page reads: a rich-text block, a FAQ
 * collection, a docs folder with two posts, three testimonials.
 */
const RICH = {
  slug: 'refund-policy',
  title: 'Refund policy',
  content:
    '<h2>Refunds</h2><p>Cancel within 14 days of your first payment and we refund it in full, no questions. After that, cancellation takes effect at the end of the period you paid for.</p><ul><li>Refunds go back to the card you paid with.</li><li>Credit packages are refundable while unused.</li><li>Edit this text in the console under Rich content; the app reads it live.</li></ul>',
};

const FAQS = [
  [
    'Do I need to write any auth code?',
    '<p>No. Sign-up, sign-in, passkeys, sessions and devices are hosted by the platform; this app only keeps a session id in a cookie.</p>',
  ],
  [
    'Where do the plans on the pricing page come from?',
    '<p>From the pricing group in the console. Change a price there and the page changes; nothing is hard-coded in this repo.</p>',
  ],
  [
    'Can I self-host?',
    '<p>Yes. The platform ships as a self-hosted image; the SDK only needs a server URL.</p>',
  ],
  [
    'How is this help center built?',
    '<p>Every section is read from the organization API on the server: rich content, docs, FAQ collections and testimonials. This answer was written in the console.</p>',
  ],
];

const DOCS_FOLDER = { name: 'Getting started', slug: 'getting-started' };
const DOCS = [
  {
    slug: 'welcome',
    title: 'Welcome to the demo',
    description: 'What this app is and how to read the tour.',
    content:
      '<p>This app is a working Next.js starter on the BuildBase SDK and a guided tour of every capability. Sign in, open the Tour, and work through the groups in order.</p><h2>Where things come from</h2><p>Each task names its source: an SDK hook, a console screen, or a file in this repository.</p>',
  },
  {
    slug: 'your-first-document',
    title: 'Your first document',
    description: 'Creating a document records usage and spends a credit.',
    content:
      '<ol><li>Open Documents.</li><li>Create one with any title.</li><li>Read the metering line: the documents quota moved and one credit was spent.</li></ol><p>Both numbers come from the plan the workspace is on.</p>',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Raman',
    position: 'CTO',
    company: { name: 'Northwind Logistics' },
    content:
      'We replaced three vendors and four months of auth work with one SDK. The console did the rest.',
  },
  {
    name: 'Marcus Lee',
    position: 'Founder',
    company: { name: 'Acme Design' },
    content:
      'Billing, seats and credits worked on the first afternoon. That never happens.',
  },
  {
    name: 'Elena Fischer',
    position: 'Head of Product',
    company: { name: 'Tomasz & Co' },
    content:
      'The tour is how we evaluated it: every feature, live, before we paid.',
  },
];

export async function seed(api) {
  // Rich content
  let rich = null;
  try {
    rich = await api.get(`rich-content/slug/${RICH.slug}`);
  } catch (e) {
    if (e.status !== 404) throw e;
  }
  if (!rich) rich = await api.post('rich-content', RICH);
  console.log('rich-content', RICH.slug, rich._id ?? rich.id);

  // FAQ collection + questions
  const collections = await api.list('faqs/collections', { pagination: false });
  let coll = collections.find((c) => c.slug === 'demo-help');
  if (!coll) {
    coll = await api.post('faqs/collections', {
      title: 'Help center',
      slug: 'demo-help',
      description: 'Questions the demo app shows on its help page.',
    });
  }
  const existing = await api.list(`faqs/collections/${coll._id}/faqs`, {
    pagination: false,
  });
  const toAdd = [];
  for (const [question, answer] of FAQS) {
    if (existing.some((f) => f.question === question)) continue;
    const faq = await api.post('faqs', { question, answer });
    toAdd.push(String(faq._id ?? faq.id));
  }
  if (toAdd.length)
    await api.patch(`faqs/collections/${coll._id}/faqs/add`, { faqs: toAdd });
  console.log(
    'faq collection demo-help',
    coll._id,
    `${existing.length + toAdd.length} questions`
  );

  // Docs folder + posts
  const folders = await api.list('docs/folders', { pagination: false });
  let folder = folders.find((f) => f.slug === DOCS_FOLDER.slug);
  if (!folder) folder = await api.post('docs/folders', DOCS_FOLDER);
  const posts = await api.list('docs', { pagination: false });
  for (const doc of DOCS) {
    let post = posts.find((p) => p.slug === doc.slug);
    if (!post) {
      post = await api.post('docs', { title: doc.title });
      await api.patch(`docs/${post._id}`, {
        slug: doc.slug,
        folder: String(folder._id),
        description: doc.description,
        content: doc.content,
      });
      await api.patch(`docs/${post._id}`, { published: true });
    }
    console.log('doc', `${DOCS_FOLDER.slug}/${doc.slug}`, post._id);
  }

  // Testimonials
  const have = await api.list('testimonials', { pagination: false });
  for (const t of TESTIMONIALS) {
    let item = have.find((x) => x.name === t.name);
    if (!item) {
      item = await api.post('testimonials', t);
      await api.patch(`testimonials/${item._id}`, { published: true });
    }
    console.log('testimonial', t.name, item._id);
  }
}
