import { AppContainer } from '@021software/pattern-library/core';
import './global.css';

export const metadata = {
  title: 'Cake',
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
