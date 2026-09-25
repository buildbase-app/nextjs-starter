import { getTranslations } from 'next-intl/server';
import { BookOpen, FileText, MessageCircleQuestion, Quote } from 'lucide-react';
import {
  sanitizeHtml,
  type DocFolder,
  type DocPost,
  type Faq,
  type RichContent,
  type Testimonial,
} from '@/lib/platform/content';
import { FaqList } from './faq-list';
import { DocsBrowser } from './docs-browser';

interface HelpCenterProps {
  configured: boolean;
  policy: RichContent | null;
  faqs: Faq[];
  docs: { folders: DocFolder[]; posts: DocPost[] };
  testimonials: Testimonial[];
}

export async function HelpCenter({
  configured,
  policy,
  faqs,
  docs,
  testimonials,
}: HelpCenterProps) {
  const t = await getTranslations('help');
  const empty = !policy && faqs.length === 0 && docs.posts.length === 0;

  if (!configured || empty) {
    return (
      <div className="bg-muted/40 mt-8 rounded-xl border p-6 text-sm">
        <p className="font-medium">{t('notConfigured.title')}</p>
        <p className="text-muted-foreground mt-1">
          {configured ? t('notConfigured.empty') : t('notConfigured.token')}
        </p>
        <code className="bg-background mt-3 block rounded border px-2 py-1 font-mono text-xs">
          node scripts/seed-org.mjs content
        </code>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-14">
      {policy && (
        <section id="policy" className="scroll-mt-20">
          <SectionHeading
            icon={FileText}
            title={policy.title}
            hint={t('from.richContent')}
          />
          <div
            className="prose prose-neutral dark:prose-invert mt-4 max-w-none text-[15px] leading-relaxed [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(policy.content) }}
          />
        </section>
      )}

      {docs.posts.length > 0 && (
        <section id="docs" className="scroll-mt-20">
          <SectionHeading
            icon={BookOpen}
            title={t('docs.title')}
            hint={t('from.docs')}
          />
          <DocsBrowser
            folders={docs.folders}
            posts={docs.posts.map((p) => ({
              ...p,
              content: sanitizeHtml(p.content ?? ''),
            }))}
          />
        </section>
      )}

      {faqs.length > 0 && (
        <section id="faq" className="scroll-mt-20">
          <SectionHeading
            icon={MessageCircleQuestion}
            title={t('faq.title')}
            hint={t('from.faqs')}
          />
          <FaqList
            faqs={faqs.map((f) => ({ ...f, answer: sanitizeHtml(f.answer) }))}
          />
        </section>
      )}

      {testimonials.length > 0 && (
        <section id="testimonials" className="scroll-mt-20">
          <SectionHeading
            icon={Quote}
            title={t('testimonials.title')}
            hint={t('from.testimonials')}
          />
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li
                key={item._id}
                className="bg-card flex flex-col rounded-xl border p-5"
              >
                <p className="text-sm leading-relaxed">“{item.content}”</p>
                <p className="mt-4 text-sm font-medium">{item.name}</p>
                <p className="text-muted-foreground text-xs">
                  {item.position}
                  {typeof item.company === 'object' && item.company?.name
                    ? ` · ${item.company.name}`
                    : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  hint,
}: {
  icon: React.ElementType;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <Icon className="text-muted-foreground h-5 w-5" /> {title}
      </h2>
      <span className="text-muted-foreground font-mono text-xs">{hint}</span>
    </div>
  );
}
