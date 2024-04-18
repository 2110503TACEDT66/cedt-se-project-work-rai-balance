"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AllBooking from '@/components/AllBooking';
import getBookings from '@/libs/getBookings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default function MyBooking() {
  const router = useRouter();

  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (!session || !session.user.token) return null;

  const bookings = getBookings(session.user.token);
    

  return (
    <main>
      <AllBooking bookingsJson={bookings} />
    </main>
  );
}
