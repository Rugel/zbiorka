'use client';

import Head from 'next/head';
import Main from './modules/Main';

export default function Home() {


  return (
    <>
      <Head>
        <meta property="og:url" content="https://zbiorka.vercel.app/" />
        <meta property="og:title" content="Zbiórka odpadów komunalnych - ustawienie powiadomień e-mail - harmonogram" />
        <meta property="og:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych." />
        <meta property="og:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zbiórka odpadów - ustawienie powiadomień e-mail - harmonogram" />
        <meta name="twitter:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych." />
        <meta name="twitter:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
      </Head>
      <Main />
    </>
  );
}