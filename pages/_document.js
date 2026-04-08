import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { theme } from "../site.config";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.colors.primary} />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,c,s){m.collectorQueue = m.collectorQueue || r;
            m.collectorServer = c; m.collectorId = s; collectorScript = e.createElement(t);
            collectorScript.src = c + i; e.head.appendChild(m.collectorScript);
            })(window,document,'script',[],'/static/collector.js',
            'https://analytics.bythewood.me','30e69c06-9beb-4283-8919-8c7a686ab013');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
