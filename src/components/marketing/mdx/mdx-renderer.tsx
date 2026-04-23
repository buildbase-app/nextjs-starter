'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import { mdxComponents } from './mdx-components';

interface MdxRendererProps {
  /** Pre-compiled MDX code emitted by Contentlayer (post.body.code). */
  code: string;
}

/**
 * Thin client wrapper around Contentlayer's compiled MDX output.
 * Keep rendering logic here so server pages stay server-only and
 * all MDX surfaces share the same components map.
 *
 * useMDXComponent memoizes internally on `code`, so the "component
 * created during render" warning is a false positive here.
 */
/* eslint-disable react-hooks/static-components */
export function MdxRenderer({ code }: MdxRendererProps) {
  const Content = useMDXComponent(code);
  return <Content components={mdxComponents} />;
}
/* eslint-enable react-hooks/static-components */
