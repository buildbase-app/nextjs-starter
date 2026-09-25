'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Folder {
  _id: string;
  name: string;
  slug: string;
  subfolders?: Folder[];
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  folder?: { _id: string; name: string; slug: string } | string | null;
  updatedAt?: string;
}

function folderIdOf(post: Post): string | null {
  if (!post.folder) return null;
  return typeof post.folder === 'string' ? post.folder : post.folder._id;
}

function flatten(
  folders: Folder[],
  depth = 0
): Array<Folder & { depth: number }> {
  return folders.flatMap((f) => [
    { ...f, depth },
    ...flatten(f.subfolders ?? [], depth + 1),
  ]);
}

/** Folders on the left, the chosen doc on the right. */
export function DocsBrowser({
  folders,
  posts,
}: {
  folders: Folder[];
  posts: Post[];
}) {
  const t = useTranslations('help');
  const [selected, setSelected] = useState<string>(posts[0]?._id ?? '');
  const current = posts.find((p) => p._id === selected) ?? posts[0];
  const tree = useMemo(() => flatten(folders), [folders]);
  const unfiled = posts.filter((p) => !folderIdOf(p));

  return (
    <div className="mt-4 grid gap-6 md:grid-cols-[240px_1fr]">
      <nav aria-label={t('docs.title')} className="space-y-3 text-sm">
        {tree.map((folder) => {
          const inFolder = posts.filter((p) => folderIdOf(p) === folder._id);
          if (inFolder.length === 0) return null;
          return (
            <div
              key={folder._id}
              style={{ paddingInlineStart: folder.depth * 12 }}
            >
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                {folder.name}
              </p>
              <ul className="mt-1 space-y-0.5">
                {inFolder.map((p) => (
                  <DocLink
                    key={p._id}
                    post={p}
                    active={p._id === current?._id}
                    onSelect={setSelected}
                  />
                ))}
              </ul>
            </div>
          );
        })}
        {unfiled.length > 0 && (
          <ul className="space-y-0.5">
            {unfiled.map((p) => (
              <DocLink
                key={p._id}
                post={p}
                active={p._id === current?._id}
                onSelect={setSelected}
              />
            ))}
          </ul>
        )}
      </nav>
      <article className="bg-card min-w-0 rounded-xl border p-6">
        {current ? (
          <>
            <h3 className="text-lg font-semibold">{current.title}</h3>
            {current.description && (
              <p className="text-muted-foreground mt-1 text-sm">
                {current.description}
              </p>
            )}
            <div
              className="[&_pre]:bg-muted mt-4 text-[15px] leading-relaxed [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-semibold [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:p-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: current.content }}
            />
          </>
        ) : (
          <p className="text-muted-foreground text-sm">{t('docs.empty')}</p>
        )}
      </article>
    </div>
  );
}

function DocLink({
  post,
  active,
  onSelect,
}: {
  post: Post;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(post._id)}
        className={cn(
          'hover:bg-muted w-full rounded-md px-2 py-1 text-start',
          active && 'bg-muted font-medium'
        )}
        aria-current={active ? 'page' : undefined}
      >
        {post.title}
      </button>
    </li>
  );
}
