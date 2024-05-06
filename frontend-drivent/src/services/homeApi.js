import api from './externalApi';

export async function getUsersApi(categoryName) {
  const requestBody = {
    category: categoryName, // Use a variável categoryName aqui
  };

  try {
    if(categoryName.length > 0) {
      const response = await api.post('/categories/all-users', requestBody);
      return response.data;
    }else{
      const response = await api.get('/home');
      return response.data;
    }
  } catch (error) {
    console.error('Erro ao obter usuarios homeApi', error);
    return { error: 'Erro ao obter usuarios homeApi' };
  }
}
