'use client'

interface Props {
  id?: string
}

export default function DeleteButton(props: Props) {
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
    <button onClick={deleteItem}>Delete</button>
  );
}
