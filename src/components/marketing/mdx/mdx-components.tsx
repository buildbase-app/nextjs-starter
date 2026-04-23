import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { Callout } from './callout';
import { CodeBlock } from './code-block';
import { ImageZoom } from './image-zoom';

/**
 * Central MDX element overrides.
 *
 * Every tag authors use in .mdx files routes through this map.
 * Styling lives here and flows down to every MDX surface (blog,
 * changelog, marketing pages) — never re-style these at the post level.
 */

function isExternal(href?: string) {
  return !!href && /^(https?:)?\/\//.test(href);
}

/**
 * Extract plain text from React children tree — used to get the raw
 * code string from `<pre><code>...</code></pre>` for the copy button.
 */
function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && 'props' in node) {
    return extractText(
      (node as { props: { children?: ReactNode } }).props.children
    );
  }
  return '';
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="text-foreground mt-12 text-3xl font-bold tracking-tight md:text-4xl"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="text-foreground mt-14 text-2xl font-bold tracking-tight md:text-3xl"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="text-foreground mt-10 text-xl font-bold tracking-tight md:text-2xl"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className="text-foreground mt-8 text-lg font-bold tracking-tight md:text-xl"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="text-foreground my-5 text-base leading-relaxed md:text-lg"
    />
  ),
  a: ({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) => {
    if (isExternal(href)) {
      return (
        <a
          {...rest}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? '#'}
        className="text-primary underline underline-offset-4 hover:no-underline"
      >
        {children}
      </Link>
    );
  },
  ul: (props) => (
    <ul
      {...props}
      className="text-foreground my-5 flex list-disc flex-col gap-2 pl-6 text-base md:text-lg"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="text-foreground my-5 flex list-decimal flex-col gap-2 pl-6 text-base md:text-lg"
    />
  ),
  li: (props) => <li {...props} className="leading-relaxed" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-primary text-muted-foreground my-6 border-l-2 pl-5 italic"
    />
  ),
  hr: (props) => <hr {...props} className="border-border my-12 border-t" />,
  img: (props: ComponentPropsWithoutRef<'img'>) => <ImageZoom {...props} />,
  table: (props) => (
    <div className="border-border my-6 overflow-x-auto rounded-md border">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-muted" />,
  tr: (props) => (
    <tr {...props} className="border-border border-b last:border-b-0" />
  ),
  th: (props) => (
    <th
      {...props}
      className="text-foreground px-4 py-3 text-left font-medium"
    />
  ),
  td: (props) => (
    <td {...props} className="text-muted-foreground px-4 py-3 align-top" />
  ),
  code: (props) => (
    <code
      {...props}
      className="bg-muted text-foreground border-border rounded border px-1.5 py-0.5 font-mono text-[0.875em]"
    />
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
    const code = extractText(children);
    return (
      <CodeBlock code={code} {...props}>
        {children}
      </CodeBlock>
    );
  },
  // Custom components available to authors without importing:
  Callout,
};
