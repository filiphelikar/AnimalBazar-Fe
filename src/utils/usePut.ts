import { useState } from 'react';

type FetchStatus = 'loading' | 'success' | 'error';

const usePutRequest = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  const putRequest = async (postData: FormData) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: postData,
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

  return { data, status, putRequest };
};

export default usePutRequest;
