import Link from 'next/link'
import Nav from '@root/components/NavBar/NavBar';
import './globals.css'
import Footer from '@root/components/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* navbar here will be rendered on all pages inside this route */}
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
