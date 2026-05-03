import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tudo no Precinho | As melhores ofertas",
  description: "Ofertas que cabem no seu bolso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2512021809226490');
            fbq('track', 'PageView');
          `}
        </Script>

        <Script id="meta-pixel-link-click" strategy="afterInteractive">
          {`
            (function () {
              function buildParams(a) {
                var params = {
                  content_category: "whatsapp_group",
                  destination: a.href,
                };

                var id = a.getAttribute("data-meta-id");
                if (id) params.content_ids = [id];

                var name = a.getAttribute("data-meta-name");
                if (name) params.content_name = name;

                return params;
              }

              document.addEventListener(
                "click",
                function (e) {
                  var t = e.target;
                  if (!t || !t.closest) return;

                  var a = t.closest("a[data-meta-event]");
                  if (!a) return;

                  var ev = a.getAttribute("data-meta-event");
                  if (!ev) return;

                  if (typeof window === "undefined") return;
                  if (!window.fbq) return;

                  try {
                    window.fbq("track", ev, buildParams(a));
                  } catch (_) {}
                },
                { capture: true }
              );
            })();
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2512021809226490&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
