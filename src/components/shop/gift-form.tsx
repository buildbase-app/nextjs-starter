'use client';

import { useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  GIFT_LIMITS,
  orderErrorMessage,
  useOrdersApi,
  useTranslation,
} from '@buildbase/sdk/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/** The platform's own bounds on a gift's recipient (its guest limits). */
const EMAIL_MAX_LENGTH = 254;
const NAME_MAX_LENGTH = 100;

/**
 * Buy an item for someone else: the checkout carries `gift`, so what the
 * item gives is held for the recipient's email and sent to them once paid,
 * with a link to the app's gift page (`claimUrl`) to claim it. A recurring
 * price, a booking and seats cannot be gifts; the platform refuses them.
 */
export function GiftForm({
  itemId,
  variantId,
  priceId,
  successUrl,
}: {
  itemId: string;
  variantId: string;
  priceId: string;
  successUrl?: string;
}) {
  const t = useTranslations('gifts');
  const locale = useLocale();
  const api = useOrdersApi();
  const sdk = useTranslation();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        {t('send')}
      </Button>
    );
  }

  const submit = async () => {
    setPending(true);
    setError(null);
    try {
      const page = window.location.href.split('?')[0];
      const start = await api.checkout(itemId, {
        variantId,
        priceId,
        successUrl: successUrl ?? page,
        cancelUrl: page,
        gift: {
          recipientEmail: email.trim(),
          recipientName: name.trim() || undefined,
          message: message.trim() || undefined,
          claimUrl: `${window.location.origin}/${locale}/gift`,
        },
      });
      if (start.url) window.location.assign(start.url);
    } catch (err) {
      setError(orderErrorMessage(err, 'orders.errors.access', sdk.t));
      setPending(false);
    }
  };

  return (
    <form
      className="w-full space-y-2 rounded-md border p-3"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <p className="text-sm font-medium">{t('title')}</p>
      <label htmlFor={`${id}-email`} className="block text-xs">
        {t('email')}
      </label>
      <Input
        id={`${id}-email`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={EMAIL_MAX_LENGTH}
        autoComplete="off"
      />
      <label htmlFor={`${id}-name`} className="block text-xs">
        {t('name')}
      </label>
      <Input
        id={`${id}-name`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={NAME_MAX_LENGTH}
      />
      <label htmlFor={`${id}-message`} className="block text-xs">
        {t('message')}
      </label>
      <textarea
        id={`${id}-message`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={GIFT_LIMITS.MESSAGE_MAX_LENGTH}
        rows={2}
        className="border-input bg-background focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
      />
      {error && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending || !email.trim()}>
          {pending ? t('starting') : t('pay')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpen(false)}
        >
          {t('cancel')}
        </Button>
      </div>
    </form>
  );
}
