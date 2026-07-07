import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { getNewsFromApi } from "../../../api/news/news";

const Container = styled.div`
font-family: "Montserrat", sans-serif;
font-weight: 500;
  gap: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1152px;
  width: 100%;
  
  p:nth-child(1) {
    width: 100%;
    font-size: 20px;
    justify-content: start;
  }
`

const PetsNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const PetsNewsContainerList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 6px;
  margin: 0;
`

const PetsNewsContainerListItemStyled = styled.li`
  display: flex;
  flex-direction: column;
  width: 270px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 500;
  img {
    border-radius: 10px;
    width: 270px;
    height: 208px;
  }
`

const PetsNewsContainerListItem = ({ src, title }) => {
  const placeholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1920px-No-Image-Placeholder.svg.png";
  const handleImgError = (e) => {
    e.target.onerror = null; 
    e.target.src = placeholder;
  };
  
  return (
    <PetsNewsContainerListItemStyled>
      <div>
        <img src={src || placeholder} width="270px" height="208px" alt={title} onError={handleImgError} />
      </div>
      <p>{title}</p>
    </PetsNewsContainerListItemStyled>
  );
}

const PetsNewsSeeMoreButtonStyled = styled.button`
  font-size: 14px;
  padding: 10px 30px;
  background-color: #FFB36C;
  border: none;
  border-radius: 10px;
  width: 130px;
`;

export const PetsNews = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const nowDate = new Date();
        const dateString = `${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDate()}`;
        const res = await getNewsFromApi({ data: dateString });
        if (res && res.articles) {
          setArticles(res.articles)
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleSeeMore = () => {
    setVisibleArticles(prevVisible => prevVisible + 4);
  }

  if (isLoading) return <p>Loading...</p>
  
  return (
    <Container>
      <p>Interacting with our pets</p>
      <PetsNewsContainer>
        <PetsNewsContainerList>
          {articles.slice(0, visibleArticles).map((a, i) => (
            <PetsNewsContainerListItem
              key={i}
              src={a.urlToImage}
              title={a.title}
            />
          ))}
        </PetsNewsContainerList>
        {visibleArticles < articles.length && (
          <PetsNewsSeeMoreButtonStyled onClick={handleSeeMore}>See more</PetsNewsSeeMoreButtonStyled>
        )}
      </PetsNewsContainer>
    </Container>
  );
}