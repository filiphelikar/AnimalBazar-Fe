import { useState, useEffect } from 'react';

type FetchStatus = 'loading' | 'success' | 'error';

interface UseFetchResult<T> {
  data: T | null;
  status: FetchStatus;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchData();
  }, [url]);

  return { data, status };
}
