import { redirect } from 'next/navigation';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          padding: '2rem',
          maxWidth: '400px',
          margin: '1rem auto',
        }}
      >
        <h1
          style={{
        color: status === 'success' ? '#16a34a' : '#dc2626',
        marginBottom: '1rem',
        fontSize: '2rem'
          }}
        >
          {status === 'success' ? 'Anulowanie subskrypcji' : 'Błąd'}
        </h1>
        <p style={{ color: '#222', fontSize: '1.1rem', textAlign: 'center' }}>{message}</p>
      </div>
  );
}