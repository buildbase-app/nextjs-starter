import { ensureCollection } from './collections.mjs';

/** The Contact form the Forms page renders, on its own collection. */
const CONTACT = {
  name: 'Contact',
  title: 'Contact us',
  description: 'Tell us what you are building. We answer within a day.',
  collection: {
    name: 'Contact messages',
    slug: 'contact-messages',
    fields: [
      {
        slug: 'name',
        helpText: 'How should we address you?',
        title: 'Your name',
        type: 'text',
        required: true,
      },
      {
        slug: 'email',
        helpText: 'We reply here',
        title: 'Email',
        type: 'email',
        required: true,
      },
      {
        slug: 'company',
        helpText: 'Optional',
        title: 'Company',
        type: 'text',
        required: false,
      },
      {
        slug: 'message',
        helpText: 'What are you building?',
        title: 'Message',
        type: 'rich-text',
        required: true,
      },
    ],
  },
};

export async function seed(api) {
  const { collection, version } = await ensureCollection(
    api,
    CONTACT.collection
  );
  const forms = await api.list('forms', { pagination: false });
  let form = forms.find((f) => f.name === CONTACT.name);
  if (!form) {
    form = await api.post('forms', {
      name: CONTACT.name,
      title: CONTACT.title,
      description: CONTACT.description,
      collectionId: String(collection._id),
      collectionVersionId: String(version._id),
    });
  }
  // A form is created unpublished, and the public fields and submit routes
  // answer 404 for it - the Forms page would have nothing to render.
  // `published` is only accepted on update, so set it here; this also repairs
  // a form an earlier run of this script left unpublished.
  if (!form.published) {
    form = await api.patch(`forms/${form._id}`, { published: true });
  }
  const publicId = String(form.formId ?? '')
    .split('/')
    .filter(Boolean)
    .pop();
  console.log('form', CONTACT.name, form._id, 'public id', publicId);
}
