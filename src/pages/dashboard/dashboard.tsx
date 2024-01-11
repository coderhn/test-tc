import './dashboard.less';
import { hooks } from '@wove/react';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { IntlError, IntlProvider } from 'use-intl';
import { Translation } from './translation';
import { Counter } from './counter';
import { Datetime } from './date-time';
import { RawText } from './raw-text';
import Link from 'antd/es/typography/Link';

export const Dashboard = () => {
  const [messages, setMessages] = useState({});
  const handleError = hooks.useCallbackRef((error: IntlError) => {
    if (
      error.message ===
      (process.env.NODE_ENV === 'production'
        ? 'MISSING_MESSAGE'
        : 'MISSING_MESSAGE: Could not resolve `missing` in `Index`.')
    ) {
      // Do nothing, this error is triggered on purpose
    } else {
      console.error(JSON.stringify(error.message));
    }
  });

  const [loading, setLoading] = useState(false);

  let [locale, setLocale] = useState<'en' | 'de'>('en');

  async function loadingMessages() {
    setLoading(true);
    const messages = (await import(`../../i18n/${locale}.json`)).default;
    setMessages(messages);
    setLoading(false);
  }

  useEffect(() => {
    void loadingMessages();
  }, [locale]);

  const handleLocaleChange = hooks.useCallbackRef(async (locale) => {
    setLocale(locale);
  });

  const handleMessageFallback = hooks.useCallbackRef(
    (info: { error: IntlError; key: string; namespace?: string }) => {
      return (
        '`getMessageFalback` called for ' +
        [info.namespace, info.key].filter((part) => part).join('.')
      );
    }
  );

  return (
    <IntlProvider
      defaultTranslationValues={{
        globalString: 'Global string',
        highlight: (chunks) => <strong>{chunks}</strong>,
      }}
      messages={messages}
      timeZone="Asia/Shanghai"
      locale={locale}
      formats={{
        dateTime: {
          medium: {
            dateStyle: 'medium',
            timeStyle: 'short',
            hour12: false,
          },
        },
      }}
      onError={handleError}
      getMessageFallback={handleMessageFallback}
    >
      <div>
        <p className="text-red-700 font-semibold">
          This is example template with i18n &nbsp;
          <Link href="https://next-intl-docs.vercel.app">
            https://next-intl-docs.vercel.app
          </Link>
        </p>
        <hr />
        <div className="flex items-center">
          <div className="mx-1">locale:</div>
          <Select
            loading={loading}
            className="w-80"
            defaultValue={'en'}
            onChange={handleLocaleChange}
            options={[
              { label: 'English', value: 'en' },
              { label: 'German', value: 'de' },
            ]}
          />
        </div>
        <hr />
        <Translation />
        <hr />
        <Counter />
        <hr />
        <Datetime />
        <hr />
        <RawText />
      </div>
    </IntlProvider>
  );
};
