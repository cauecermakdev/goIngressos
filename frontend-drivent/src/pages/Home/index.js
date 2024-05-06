import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUsersApi } from '../../services/homeApi';
import funkPhoto from  '../../assets/images/funk_.png';
import logo from  '../../assets/images/logo.png';
import rockPhoto from  '../../assets/images/rock.png';
import sambaPhoto from  '../../assets/images/samba.png';
import trapPhoto from  '../../assets/images/trap.png';
import { getCategories } from '../../services/categoriesApi';

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedCard, setSelectedCard] = useState(-1); // Estado para controlar o card selecionado
  const [categories, setCategories] = useState([]);
  const arrayColor = ['#51BD91', '#78C2ED', '#E78383', '#EB78ED', '#7884ED'];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao obter categorias pages Component:', error);
      }
    }

    async function fetchUsers() {
      try {
        const usersData = await getUsersApi(selectedCard !== -1 ? categories[selectedCard].name: '');
        setAllUsers(usersData);
      } catch (error) {
        console.error('Erro ao obter dados do usuario componente Home:', error);
      }
    }
    
    fetchUsers();
    fetchCategories();
  }, [selectedCard]);

  function formatarData(dataNascimento) {
    const data = new Date(dataNascimento);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = data.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }
   
  return (
    <HomeContainer>
      
      <MenuLateral>  
        <ContainerPhoto>
          <PhotoLogo imageUrl={logo}/>
        </ContainerPhoto>

        <LineDivision></LineDivision>

        <ContainerCategoriesMenuLateral>
          <HeadMenuLateral>Categories</HeadMenuLateral>
          {categories?.map((category, i) => (
            <div key={category.id}>
              <CategoriesButton  
                onClick={() => selectedCard === i ? setSelectedCard(-1) : setSelectedCard(i)} 
                color={arrayColor[i]} 
                selected={selectedCard === i}
              >
                {category.name}
              </CategoriesButton>
            </div>
          ))}
        </ContainerCategoriesMenuLateral>
      </MenuLateral>

      <CategoriesContainer>
        <CardCategoryHead>
          <TitleCategoryHead>Users</TitleCategoryHead>
          <TitleCategoryHead>email</TitleCategoryHead>
          <TitleCategoryHead>whatsapp</TitleCategoryHead>
          <TitleCategoryHead>data Nasc</TitleCategoryHead>
        </CardCategoryHead>

        {allUsers?.map((user, i) => (
          <div key={user.id}>
            <CardCategory
              onClick={() => setSelectedCard(i)} // Define o card como selecionado ao clicar
              selected={selectedCard === i} // Passa o estado de seleção para o componente estilizado
            >
              <TitleCategory>
                {user.nome}
              </TitleCategory>
              <TitleCategory>
                {user.email}
              </TitleCategory>
              <TitleCategory>
                {user.whatsapp}
              </TitleCategory>
              <TitleCategory>
                {formatarData(user.dataNascimento)}
              </TitleCategory>
            </CardCategory>
          </div>
        ))}
      </CategoriesContainer>
    </HomeContainer>
  );
}

export const ContainerPhoto = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const CategoriesButton = styled.button`
  width: 100px;
  padding: 5px 0px;
  background-color:#2A2B2F;
  border: 0px;
  border-radius:15px;
  color:${props => props.selected? 'white' : props.color};
  background-color:${props => props.selected? props.color: '#2A2B2F'};
  letter-spacing:1px;
  margin:5px 0px;
`;

export const HomeContainer = styled.div`
  display:flex;
  height:100%;
`;

export const ContainerCategoriesMenuLateral = styled.div`
  width:100%;
  margin-left:30px;
`;

export const LineDivision = styled.div`
  width:100%;
  border-top: 3px solid rgba(0,0,0,0.1);
  margin-bottom:20px;
`;

export const MenuLateral = styled.div`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:bottom;
  width:300px;
  background-color:#212226;
`;

export const HeadMenuLateral = styled.div` 
  color:white;
  margin:0px 0px 25px 0px;
  opacity:0.7;
  letter-spacing:1px;
`;

export const CategoriesContainer = styled.div`  
  background-color:#1C1E28;
  width: 100%;
  height:100vh;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content:center;
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;

export const CardCategoryHead = styled.div`
  background-color: #26272B;
  margin-top:100px;
  font-weight: 700;
  letter-spacing:1px;
  border-radius: 20px 20px 0px 0px;
  width:1000px;
  height:50px;
  display:flex;
  align-items:center;
  justify-content:center;
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo
  font-weigth:600;
`;

export const CardCategory = styled.div`
  border: 0.5px solid rgba(255,255,255,0.1);
  width:1000px;
  display:flex;
  align-items:bottom;
  justify-content:center;
  cursor: pointer; // Adiciona cursor de apontar ao passar o mouse
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo
`;

export const TitleCategoryHead = styled.div`
  font-weigth:400;
  font-size:32px;
  width:100%;
  height:30px; 
  display:flex;
  align-items:center;
  justify-content:center ;
  color: white;
  font-size:14px;
  opacity:0.7;
`;

export const TitleCategory = styled.div`
  width:100%;
  height:30px; 
  background-color: #302D32;
  display:flex;
  align-items:center;
  justify-content:center ;
  color: white;
  font-size:14px;
  border-right: 0.5px solid rgba(255,255,255,0.1);
`;

export const TitleEmail = styled.div`
  width:200px;
  height:30px; 
  background-color: #302D32;
  display:flex;
  align-items:center;
  justify-content:center;
  color: white;
  font-size:14px;
`;
export const PhotoLogo = styled.div`
  background-image: url(${props => props.imageUrl});
  width:150px;
  height:100px;
  background-size: cover;
  margin: 100px 0px;
`;

