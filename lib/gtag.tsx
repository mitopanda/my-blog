import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';
import NextHead from 'next/head';

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
export const existsGaId = GA_ID !== '';

export const pageview = (path) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

export const event = ({
  action,
  category,
  label,
  value = '',
}: {
  action: string;
  category: string;
  label: object;
  value: string;
}) => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};

export const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export const GoogleAnalytics = () => (
  <>
    {existsGaId && (
      <NextHead>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga-script"
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
            `,
          }}
          strategy="afterInteractive"
        />
      </NextHead>
    )}
  </>
);
