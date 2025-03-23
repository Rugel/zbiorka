import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
      <meta name="apple-mobile-web-app-title" content="Zbiórka" />
      </head>
      <body>{children}</body>
    </html>
  );
}