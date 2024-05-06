import api from './api';

export async function signUp(email, password, whatsapp, nome, dataNascimento, likedCategories, likedLocations ) {
  console.log('entra signUp');
  const response = await api.post('/sign-up', { email, password, whatsapp, nome, dataNascimento, likedCategories, likedLocations });
  return response.data;
}

