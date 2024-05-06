import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCategories } from '../../services/categoriesApi';
import cervejadaPhoto from  '../../assets/images/cervejada.png';
import funkPhoto from  '../../assets/images/funk_.png';
import rockPhoto from  '../../assets/images/rock.png';
import sambaPhoto from  '../../assets/images/samba.png';
import trapPhoto from  '../../assets/images/trap.png';

const imagesFolder = [
  { id: 1, path: cervejadaPhoto },
  { id: 2, path: funkPhoto },
  { id: 3, path: rockPhoto },
  { id: 4, path: sambaPhoto },
  { id: 5, path: trapPhoto },
];

export default function ChooseCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // Estado para controlar o card selecionado

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

  return (
    <CategoriesContainer>
      {categories?.map((category, i) => (
        <div key={category.id}>
          <CardCategory
            onClick={() => setSelectedCard(i)} // Define o card como selecionado ao clicar
            selected={selectedCard === i} // Passa o estado de seleção para o componente estilizado
          >
            <PhotoCategory imageUrl={imagesFolder[i].path}/>
            <TitleCategory>
              {category.name}
            </TitleCategory>
          </CardCategory>
        </div>
      ))}
    </CategoriesContainer>
  );
}

export const CategoriesContainer = styled.div`
  background-color:#1C1E28;
  width: 100%;
  height:100%;
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
  width:100px;
  height:100px; 
  border-radius:20%;
  opacity: ${props => props.selected ? 1 : 0.5}; // Adiciona sombra quando selecionado
  display:flex;
  align-items:bottom;
  justify-content:center;
  margin:10px;
  cursor: pointer; // Adiciona cursor de apontar ao passar o mouse
  transition: background-color 0.3s ease; // Adiciona transição suave de cor de fundo
`;

export const TitleCategory = styled.div`
  width:100px;
  height:30px; 
  background-color: #302D32;
  display:flex;
  align-items:center;
  justify-content:center;
  color: white;
  font-size:14px;
`;

export const PhotoCategory = styled.div`
  ${props => props.imageUrl ? '' : 'background-color: red;'};
  background-image: url(${props => props.imageUrl});
  width:100%;
  height:100%;
  background-size: cover;
`;
