import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { agentPrompt, cloneCommand } from '@/config/site';
import { CopyCommand } from './copy-command';

/**
 * The close: the two ways to take the app, said plainly. No gradient box;
 * the display face and the drafting grid carry it.
 */
export async function CtaBanner() {
  const [t, tHero, tAgent] = await Promise.all([
    getTranslations('home.cta'),
    getTranslations('home.hero'),
    getTranslations('home.agentPrompt'),
  ]);

  return (
    <section className="grain relative w-full overflow-hidden border-t">
      <div
        aria-hidden
        className="drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <h2 className="font-display text-foreground max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.01em] text-balance">
          {t('heading')}
        </h2>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg text-pretty">
          {t('description')}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button size="lg" className="h-11 px-6 text-[15px]" asChild>
            <Link href="/dashboard/tour">{t('signIn')}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 px-5 text-[15px]"
            asChild
          >
            <Link href="/blog">{t('howBuilt')}</Link>
          </Button>
        </div>
        <CopyCommand
          className="mt-6 w-full sm:w-fit sm:max-w-full"
          command={cloneCommand}
          label={tHero('cloneLabel')}
          copyLabel={tHero('copy')}
          copiedLabel={tHero('copied')}
        />
        <p className="text-muted-foreground mt-8 text-sm">{tAgent('label')}</p>
        <CopyCommand
          prompt
          className="mt-2 max-w-2xl"
          command={agentPrompt}
          label={tAgent('label')}
          copyLabel={tHero('copy')}
          copiedLabel={tHero('copied')}
        />
      </div>
    </section>
  );
}
