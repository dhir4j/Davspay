import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import { ThemeProvider } from '@/lib/ThemeContext';
import CustomCursor from '@/components/ui/CustomCursor';
import TileBackground from '@/components/ui/TileBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Davspay Solution - Modern UPI Payment Gateway',
  description: 'Secure, fast, and reliable UPI payment gateway for your business. Accept payments seamlessly with Davspay Solution.',
  keywords: ['payment gateway', 'UPI', 'payment processing', 'secure payments', 'Davspay'],
  authors: [{ name: 'Davspay Solution' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#A78BFA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <TileBackground />
            <CustomCursor />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
