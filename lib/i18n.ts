import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './user-locale';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
    /// Because we use english translations as keys, the fallback should just print the key.
    getMessageFallback: ({ key }) => key,
    onError: (error) => {
      /// Pass.
    },
  };
});
