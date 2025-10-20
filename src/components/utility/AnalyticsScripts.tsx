"use client";

import Script from "next/script";
import React from "react";

interface AnalyticsScriptsProps {
  clarityProjectId: string | undefined;
}

function AnalyticsScripts({ clarityProjectId }: AnalyticsScriptsProps) {
  if (!clarityProjectId) return null;

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `,
      }}
    />
  );
}

export default AnalyticsScripts;
