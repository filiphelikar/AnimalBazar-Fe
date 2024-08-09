import { useState } from 'react';

type FetchStatus = 'loading' | 'success' | 'error' | 'špatné heslo';

const usePutRequest = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  const putRequest = async (postData: FormData) => {
    setStatus('loading');
    const response = await fetch(url, {
      method: 'PUT',
      body: postData,
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

  return { data, status, putRequest };
};

export default usePutRequest;
