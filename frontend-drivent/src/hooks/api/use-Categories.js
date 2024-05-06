import useAsync from '../useAsync';

import * as categoriesApi from '../../services/categoriesApi';
import useToken from '../useToken';

export default function useCategories() {
  const token = useToken();
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    act: getCategories
  } = useAsync(() => categoriesApi.getCategories(token));
  
  return {
    categories,
    categoriesLoading,
    categoriesError,
    getCategories,
  };
}
