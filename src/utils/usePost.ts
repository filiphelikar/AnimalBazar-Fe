import { useState } from 'react';

type FetchStatus = 'loading' | 'success' | 'error';

const usePostRequest = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  const postRequest = async (postData: FormData) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
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

  return { data, status, postRequest };
};

export default usePostRequest;
