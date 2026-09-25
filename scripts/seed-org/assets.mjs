/** Assets module: one sample public image so the gallery is not empty. */
const NAME = 'buildbase-demo-sample.png';
// A 1×1 PNG; the point is the record, not the picture.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64'
);

export async function seed(api) {
  const existing = await api.list('assets', { limit: 100 });
  const found = existing.find((a) => a.name === NAME);
  if (found) {
    console.log(`asset ${NAME} exists ${found._id}`);
    return;
  }
  const form = new FormData();
  form.append('file', new Blob([PNG], { type: 'image/png' }), NAME);
  form.append('public', 'true');
  try {
    const created = await api.post('assets', form);
    console.log(`asset ${NAME} created ${created?._id ?? created?.id}`);
  } catch (e) {
    // A stack without object storage answers 503 here; the app's upload
    // will say the same, so this is a notice, not a failure.
    console.log(
      `asset upload refused (${e.status ?? '?'}): storage not configured on this organization?`
    );
  }
}
