import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Label } from '../../components/Auth';
import Link from '../../components/Link';

import { getCategories } from '../../services/categoriesApi';
import cervejadaPhoto from  '../../assets/images/cervejada.png';
import funkPhoto from  '../../assets/images/funk_.png';
import rockPhoto from  '../../assets/images/rock.png';
import sambaPhoto from  '../../assets/images/samba.png';
import trapPhoto from  '../../assets/images/trap.png';
import useSignUp from '../../hooks/api/useSignUp';

const imagesFolder = [
  { id: 1, path: cervejadaPhoto },
  { id: 2, path: funkPhoto },
  { id: 3, path: rockPhoto },
  { id: 4, path: sambaPhoto },
  { id: 5, path: trapPhoto },
];

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [chooseCategoryBool, setChooseCategoryBool] = useState(false);//libera componente choose category

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([15]);
  const [selectedCard, setSelectedCard] = useState([]); // Estado para controlar o card selecionado

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao obter categorias pages Component:', error);
      }
    }

    fetchCategories();
  }, []);

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        setChooseCategoryBool(true);
        toast('Agora escolha as categorias!');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  };

  async function registerUser() {
    console.log(email, password, whatsapp, nome, dataNascimento, selectedCard, locations);
    await signUp(email, password, whatsapp, nome, dataNascimento, selectedCard, locations);
    
    navigate('/sign-in');
  }

  function toggleCategories(i) {
    if (selectedCard.includes(i)) {
      // Se o card já estiver selecionado, remove-o do array
      setSelectedCard(selectedCard.filter(cardIndex => cardIndex !== i));
    } else {
      // Se o card não estiver selecionado, adiciona-o ao array
      setSelectedCard([...selectedCard, i]);
    }
  }

  return (
    chooseCategoryBool?
      <CategoryPage>
        <Title>Selecione os eventos que mais gosta</Title>
        <CategoriesContainer>
          {categories?.map((category, i) => (
            <div key={category.id}>
              <CardCategory
                // onClick={() => setSelectedCard([...selectedCard, i])} // Define o card como selecionado ao clicar
                onClick={() => toggleCategories(i)}
                selected={selectedCard.includes(i)} // Passa o estado de seleção para o componente estilizado
              >
                <PhotoCategory imageUrl={imagesFolder[i].path}/>
                <TitleCardCategory>
                  {category.name}
                </TitleCardCategory>
              </CardCategory>
            </div>
          ))}
        </CategoriesContainer>
        <ButtonCategory onClick={() => registerUser()}>
          Confirmar
        </ButtonCategory>
      </CategoryPage>:
      <AuthLayout>
        <Row>
        </Row>
        <Row>
          <Label>Cadastro</Label>
          <form onSubmit={submit}>
            <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
            <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <Input label="WhatsApp" type="text" fullWidth value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <Input label="Nome" type="text" fullWidth value={nome} onChange={e => setNome(e.target.value)} />
            <Input label="Data de Nascimento" type="text" fullWidth value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
            <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>
          </form>
        </Row>
        <Row>
          <Link to="/sign-in">Já está inscrito? Faça login</Link>
        </Row>
      </AuthLayout>
  );
}

export const CategoryPage = styled.div`
  background-color:#1C1E28;
  width: 100%;
  height:100%;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap: 4px;
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;

export const CategoriesContainer = styled.div`
  background-color:#1C1E28;
  margin: 100px 0px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content:center;
  gap: 4px;
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;

export const CardCategory = styled.div`
  flex-direction: column;
  width:150px;
  height:150px; 
  border-radius:15px 15px 0px 0px ;
  opacity: ${props => props.selected ? 1 : 0.5}; // Adiciona sombra quando selecionado
  display:flex;
  align-items:bottom;
  justify-content:center;
  margin:10px;
  cursor: pointer; // Adiciona cursor de apontar ao passar o mouse
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo
`;

export const TitleCardCategory = styled.div`
  width:150px;
  height:40px; 
  background-color: #302D32;
  display:flex;
  align-items:center;
  justify-content:center;
  color: white;
  font-size:14px;
  border-radius:0px 0px 15px 15px;
  letter-spacing:1px;
`;

export const PhotoCategory = styled.div`
  ${props => props.imageUrl ? '' : 'background-color: red;'};
  background-image: url(${props => props.imageUrl});
  width:100%;
  height:100%;
  background-size: cover;
`;

export const Title =  styled.div`
  font-size:20px;
  color:white;
  font-weigth:200;  
  opacity:0.7;
  letter-spacing:2px;
`;

export const ButtonCategory =  styled.button`
  height: 40px;
  width:200px;
  font-size: 20px;
  font-weigth:600;
  background-color: #6c9bf7;
  color: white;
  display: flex;
  border-radius:50px;
  align-items: center;
  justify-content: center;
  border: none; // Remove a borda padrão do botão
  cursor: pointer; // Adiciona cursor de apontar ao passar o mouse
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo

  &:hover {
    opacity:0.7;// Muda a cor de fundo ao passar o mouse
  }
`;
