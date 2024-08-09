import { useState } from 'react';

type FetchStatus = 'loading' | 'success' | 'error' | 'špatné heslo';

const useDeleteRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  const deleteRequest = async (url: string) => {
    setStatus('loading');
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 403) {
        setStatus('špatné heslo');
      } else {
        setStatus('error');
      }
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    setStatus('success');
    setData(responseData);
  };

  return { data, status, deleteRequest };
};

export default useDeleteRequest;
