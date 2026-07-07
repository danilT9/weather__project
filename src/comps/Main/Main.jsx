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
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-top: 40px;
    gap: 50px;
    padding: 0 15px;
    .hidden-mobile {
      display: none !important;
    }
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    gap: 40px;
    padding: 0 10px;
  }
`;

export const Main = () => {
  const [coords, setCoords] = useState({ lat: 50.4501, lon: 30.5234 });
  return (
    <main>
      <Banner onCitySelect={setCoords} />
      <Container>
        <Weather coords={coords} />
        <div className="hidden-mobile" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "70px", alignItems: "center" }}>
          <PetsNews />
          <Nature />
        </div>
      </Container>
    </main>
  );
};