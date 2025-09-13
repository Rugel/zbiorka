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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          padding: 32,
          maxWidth: 400,
          margin: '1rem auto',
        }}
      >
        <h1
          style={{
        color: status === 'success' ? '#2e7d32' : '#c62828',
        marginBottom: 16,
        fontSize: 28,
        fontWeight: 700,
        textAlign: 'center',
          }}
        >
          {status === 'success' ? 'Potwierdzenie subskrypcji' : 'Błąd'}
        </h1>
        <p
          style={{
        color: '#333',
        fontSize: 18,
        textAlign: 'center',
        margin: 0,
          }}
        >
          {message}
        </p>
      </div>
  );
}