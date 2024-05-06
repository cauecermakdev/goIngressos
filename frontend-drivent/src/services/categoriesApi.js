import api from './externalApi';

export async function getCategories() {
  try {
    const response = await api.get('/categories/categories');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter categorias services categoresApi:', error);
    return { error: 'Erro ao obter categorias services categoresApi' };
  }
}
