import Nav from '@root/components/NavBar/NavBar';
import Footer from '@root/components/Footer/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        {/* navbar here will be rendered on all pages inside this route */}
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
