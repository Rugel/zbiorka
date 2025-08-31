import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmSubscriptionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const status = searchParams.status as string | undefined;
  const message = searchParams.message as string | undefined;

  if (!status || !message) {
    redirect('/?status=error&message=Brak wystarczających danych do wyświetlenia.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          {status === 'success' ? 'Potwierdzenie subskrypcji' : 'Błąd'}
        </h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <Link
          href="/"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
}