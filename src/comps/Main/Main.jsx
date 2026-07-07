import { useState } from "react";
import { Banner } from "./Banner/Banner";
import { Weather } from "./Weather/Weather";
import { PetsNews } from "./PetsNews/PetsNews";
import { Nature } from "./Nature/Nature";
import { styled } from "styled-components";

const Container = styled.main`
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 70px;
`;

export const Main = () => {
  const [coords, setCoords] = useState({ lat: 50.0755, lon: 14.4378 });
  
  return (
    <main>
      <Banner onCitySelect={setCoords} />
      <Container>
        <Weather coords={coords} />
        <PetsNews />
        <Nature />
      </Container>
    </main>
  );
};
