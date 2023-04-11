'use client'

import { useSession } from "next-auth/react"

interface Props {
  id: string
}

export default function DeleteButton(props: Props) {
  const { data: session, status } = useSession();

  const deleteItem = async () => {
    const response = await fetch('/api/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.id),
    });
    const data = await response.json();
    // need error handling
    alert('deleted');
  };

  return (
    <>
      {status === 'authenticated' && (
        <button onClick={deleteItem}>Delete</button>
      )}
    </>
  );
}
