import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ConfirmUnsubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const status = params.status as string | undefined;
  const message = params.message as string | undefined;

  if (!status || !message) {
    redirect('/?status=error&message=Brak wystarczających danych do wyświetlenia.');
  }

  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <h1>
          {status === 'success' ? 'Anulowanie subskrypcji' : 'Błąd'}
        </h1>
        <p>{message}</p>
        <Link href="/">Powrót do strony głównej</Link>
      </div>
  );
}