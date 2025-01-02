import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchQuery } from '../../features/searchQuery';

export const useDebounce = (value: string, delay: number) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: value }));
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return;
};
