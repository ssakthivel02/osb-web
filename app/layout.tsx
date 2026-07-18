import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OmSaravanaBhava Learning Ecosystem',
  description: 'AI-native learning, certification and community platform.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
