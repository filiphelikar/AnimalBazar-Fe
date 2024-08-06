import { useState } from 'react';

type FetchStatus = 'loading' | 'success' | 'error';

const useDeleteRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  const deleteRequest = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setStatus('success');
      setData(responseData);
    } catch (error) {
      setStatus('error');
    }
  };

  return { data, status, deleteRequest };
};

export default useDeleteRequest;
