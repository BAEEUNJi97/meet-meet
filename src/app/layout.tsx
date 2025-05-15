import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Providers from "@/providers/Providers";

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: "Meet Meet",
  description: "고민하지 말고 모여봐요!",
  keywords: [
    '미밋',
    '밋밋',
    '미밋 모임 앱',
    '미밋 모임',
    'Meet Meet',
    'MeetMeet',
    'meet meet',
    'meetmeet',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'Meet Meet',
    description: '고민하지 말고 모여봐요!',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable}  antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
