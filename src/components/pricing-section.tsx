import { SoftwareApplicationJsonLd } from '@/components/seo/json-ld';
import { JsonLdScript } from 'next-seo';
import { PricingPlans } from '@/components/pricing-plans';
import { absoluteUrl, seoConfig } from '@/config/seo';
import { plans as plansApi } from '@/lib/buildbase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PlanVariant {
  currency: string;
  basePricing?: Record<string, number>;
}

interface FetchedPlan {
  _id: string;
  name: string;
  version: number;
  description?: string;
  pricingVariants?: PlanVariant[];
  features?: Record<string, boolean>;
  limits?: Record<string, number>;
}

interface PublicPlansData {
  items: unknown[];
  plans: FetchedPlan[];
  notes?: string;
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchPlansData(slug: string): Promise<PublicPlansData | null> {
  try {
    const res = await plansApi.getPublic(slug);
    return res as unknown as PublicPlansData;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PricingSectionProps {
  /** Pricing page slug in BuildBase. Defaults to "main-pricing". */
  slug?: string;
  /** Optional heading text. Pass null to hide. */
  title?: string | null;
  /** Optional description text. Pass null to hide. */
  description?: string | null;
  /** Include JSON-LD structured data (Product + SoftwareApplication). Defaults to true. */
  includeJsonLd?: boolean;
  /** `h1` when the section is the page (/pricing), `h2` inside another page. */
  headingLevel?: 'h1' | 'h2';
}

/**
 * Server component that fetches pricing plans and renders:
 * 1. JSON-LD structured data (Product + AggregateOffer + SoftwareApplication)
 * 2. Optional heading + description
 * 3. Interactive PricingPlans client component
 *
 * Use on `/pricing` page, landing pages, or any marketing screen.
 *
 * @example
 * // Full pricing section with heading
 * <PricingSection title="Pricing" description="Choose your plan" />
 *
 * // Embedded in a landing page without heading
 * <PricingSection title={null} />
 *
 * // Custom slug
 * <PricingSection slug="enterprise-pricing" />
 */
export async function PricingSection({
  slug = 'main-pricing',
  title = 'Pricing',
  description = 'Choose the plan that fits your needs',
  includeJsonLd = true,
  headingLevel = 'h2',
}: PricingSectionProps) {
  const Heading = headingLevel;
  const data = await fetchPlansData(slug);

  const plans = data?.plans ?? [];
  const pricingInCents = data?.notes?.toLowerCase().includes('cent') ?? false;

  // Build JSON-LD Product schemas
  const offerJsonLd = includeJsonLd
    ? plans.flatMap((plan) => {
        const variant = plan.pricingVariants?.[0];
        if (!variant?.basePricing) return [];
        const currency = variant.currency?.toUpperCase() ?? 'USD';
        const prices = Object.values(variant.basePricing).filter(
          (p): p is number => p != null
        );
        if (prices.length === 0) return [];
        const toAmount = (v: number) => (pricingInCents ? v / 100 : v);
        return [
          {
            '@type': 'Product' as const,
            name: plan.name,
            description: plan.description ?? seoConfig.brand.description,
            url: absoluteUrl('/pricing'),
            brand: { '@type': 'Brand' as const, name: seoConfig.brand.name },
            offers: {
              '@type': 'AggregateOffer' as const,
              priceCurrency: currency,
              lowPrice: toAmount(Math.min(...prices)),
              highPrice: toAmount(Math.max(...prices)),
              offerCount: prices.length,
            },
          },
        ];
      })
    : [];

  // SoftwareApplication starting price
  const firstVariant = plans[0]?.pricingVariants?.[0];
  const monthlyPrice = firstVariant?.basePricing?.monthly;
  const softwareOffer =
    includeJsonLd && monthlyPrice != null && firstVariant
      ? {
          price: pricingInCents ? monthlyPrice / 100 : monthlyPrice,
          priceCurrency: firstVariant.currency?.toUpperCase() ?? 'USD',
        }
      : undefined;

  return (
    <section>
      {/* JSON-LD — server-rendered, invisible to users, read by crawlers */}
      {includeJsonLd ? (
        <>
          <SoftwareApplicationJsonLd offers={softwareOffer} />
          {offerJsonLd.map((product, i) => (
            <JsonLdScript
              key={`product-${i}`}
              data={{ '@context': 'https://schema.org', ...product }}
              scriptKey={`pricing-product-${i}`}
            />
          ))}
        </>
      ) : null}

      {/* Optional heading */}
      {title !== null ? (
        <div className="mb-10">
          {title ? (
            <Heading
              className={
                headingLevel === 'h1'
                  ? 'text-foreground text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance'
                  : 'text-foreground text-3xl font-semibold tracking-[-0.03em] md:text-4xl'
              }
            >
              {title}
            </Heading>
          ) : null}
          {description ? (
            <p
              className={
                headingLevel === 'h1'
                  ? 'text-muted-foreground mt-5 max-w-2xl text-xl text-pretty'
                  : 'text-muted-foreground mt-3 max-w-2xl text-lg text-pretty'
              }
            >
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Interactive client component */}
      <PricingPlans
        slug={slug}
        initialData={data}
        planHeadingLevel={headingLevel === 'h1' ? 2 : 3}
      />
    </section>
  );
}
