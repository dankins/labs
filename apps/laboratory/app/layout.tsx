import { AppContainer } from '@danklabs/pattern-library/core';
import './global.css';

export const metadata = {
  title: 'Dank Labs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
