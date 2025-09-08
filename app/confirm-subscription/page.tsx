import { redirect } from 'next/navigation';

export default async function ConfirmSubscriptionPage({
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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', alignItems: 'center', height: '100vh'}}>
        <h1>
          {status === 'success' ? 'Potwierdzenie subskrypcji' : 'Błąd'}
        </h1>
        <p>{message}</p>
      </div>
  );
}