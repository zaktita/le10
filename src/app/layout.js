import "./globals.css";
import { Anton, Lato } from 'next/font/google';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "the10 - Sports Media",
  description: "The10: Your hub for sports news, interviews, highlights, and podcasts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${anton.className}`}>
        <main className={lato.className}>{children}</main>
      </body>
    </html>
  );
}
