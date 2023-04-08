'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Props {
  id: string;
}

export default function EditButton(props: Props) {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'authenticated' && (
        <Link href={`/editItem/${props.id}`}>
          <button>Edit</button>
        </Link>
      )}
    </>
  );
}
