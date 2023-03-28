'use client'

import Link from 'next/link';
import Nav from '@root/components/NavBar/NavBar';
import Footer from '@root/components/Footer/Footer';
import './globals.css';
import Pusher from 'pusher-js';
import { PusherProvider } from 'context/PusherContext.js';

Pusher.logToConsole = true;
const pusher = new Pusher('48a91d99d52f3a702af0', { cluster: 'us2' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <PusherProvider pusher={pusher}>
        <body>
          {/* navbar here will be rendered on all pages inside this route */}
          <Nav />
          {children}
          <Footer />
        </body>
      </PusherProvider>
    </html>
  );
}
