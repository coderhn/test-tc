import { hooks } from '@wove/react';
import { Select } from 'antd';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
import { I18nProvider } from 'components/i18n-provider';
import { Counter } from './counter';
import { Datetime } from './date-time';
import { RawText } from './raw-text';
import { Translation } from './translation';
import './style.less';

export const Dashboard = () => {
  const [locale, setLocale] = useState<string>(
    localStorage.getItem('lang') || 'zh'
  );

  const handleLocaleChange = hooks.useCallbackRef(async (locale) => {
    setLocale(locale);
  });

  return (
    <I18nProvider locale={locale}>
      <div>
        <p className="font-semibold text-red-700">
          This is example template with i18n &nbsp;
          <Link href="https://next-intl-docs.vercel.app">
            https://next-intl-docs.vercel.app
          </Link>
        </p>
        <hr />
        <div className="flex items-center">
          <div className="mx-1">locale:</div>
          <Select
            className="w-80"
            defaultValue={'en'}
            onChange={handleLocaleChange}
            options={[
              { label: 'English', value: 'en' },
              { label: '简体中文', value: 'zh' },
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
    </I18nProvider>
  );
};
