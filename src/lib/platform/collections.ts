import 'server-only';
import { adminFetch } from '@/lib/buildbase-admin';

/**
 * A custom collection: a schema that lives on immutable versions, records
 * stored against a version. The app reads the live version's records, so
 * publishing a new version in the console changes what renders here with
 * no deploy.
 */

export const COLLECTION_SLUG = 'release-notes';

export interface CollectionField {
  slug: string;
  title: string;
  type: string;
  required?: boolean;
}

export interface CollectionVersion {
  _id: string;
  name: string;
  version: number;
  live: boolean;
  fields: CollectionField[];
}

export interface CollectionRecord {
  _id: string;
  data: Record<string, unknown>;
  createdAt: string;
}

export interface CollectionView {
  collection: { _id: string; name: string; slug: string };
  version: CollectionVersion | null;
  records: CollectionRecord[];
}

type Page<T> = { docs: T[] } | T[];
const docsOf = <T>(r: Page<T>): T[] => (Array.isArray(r) ? r : (r?.docs ?? []));

export async function getCollectionView(
  slug = COLLECTION_SLUG
): Promise<CollectionView | null> {
  const collections = docsOf(
    await adminFetch<Page<{ _id: string; name: string; slug: string }>>(
      'collections',
      {
        query: { filter: { slug }, pagination: false },
      }
    )
  );
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return null;
  const versions = docsOf(
    await adminFetch<Page<CollectionVersion>>(
      `collections/${collection._id}/versions`,
      {
        query: { pagination: false, sort: { version: -1 } },
      }
    )
  );
  const version = versions.find((v) => v.live) ?? null;
  const records = version
    ? docsOf(
        await adminFetch<Page<CollectionRecord>>(`collections/data/${slug}`, {
          query: { latest: true, version: version.version },
        })
      )
    : [];
  return { collection, version, records };
}

export async function deleteRecord(
  collectionId: string,
  versionId: string,
  recordId: string
) {
  await adminFetch(
    `collections/${collectionId}/versions/${versionId}/records/${recordId}`,
    {
      method: 'DELETE',
    }
  );
}
