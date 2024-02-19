import { hooks } from '@wove/react';
import {
  useEffect,
  type PropsWithChildren,
  useState,
  useCallback,
  type FC,
} from 'react';
import { type IntlError, IntlProvider } from 'use-intl';
import zhCNMessage from '../../i18n/zh.json';

type I18nProviderProps = {
  locale: string;
};

export const I18nProvider: FC<PropsWithChildren<I18nProviderProps>> = ({
  locale,
  children,
}) => {
  const [messages, setMessages] = useState(zhCNMessage);

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

  const handleMessageFallback = hooks.useCallbackRef(
    (info: { error: IntlError; key: string; namespace?: string }) => {
      return (
        // '`getMessageFalback` called for ' +
        [info.namespace, info.key].filter((part) => part).join('.')
      );
    }
  );

  const loadingMessages = useCallback(async () => {
    try {
      if (locale === 'en') {
        const messages = (
          await import(
            /* webpackChunkName: "matrix/shared-chunks/i18n-en" */
            `../../i18n/en.json`
          )
        ).default;
        setMessages(messages);
      }
      // else if (locale === 'de') ?
    } catch (err) {
      setMessages(zhCNMessage);
    }
  }, [locale]);

  useEffect(() => {
    void loadingMessages();
  }, [loadingMessages, locale]);

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
      {children}
    </IntlProvider>
  );
};
