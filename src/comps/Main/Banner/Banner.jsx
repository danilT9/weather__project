import { styled } from "styled-components";
import { getCitySuggestions } from "../../../api/weather/weather";
import { useState } from "react";
import backgroundImage from "../../../assets/banner/background.svg";
import searchImage from "../../../assets/banner/search.svg";

const BannerDiv = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 500px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage});
  background-color: black;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const TitleBanner = styled.p`
  font-weight: 600;
  font-size: 32px;
`

const PhraseDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  font-size: 20px;
  flex-wrap: wrap;
  margin-bottom: 150px;
  margin-right: 192px;

  p {
    margin: 0;
    line-height: 1.4;
  }
  
  p:first-child {
    max-width: 345px;
    padding-right: 25px;
    border-right: 2px solid white;
    text-align: right;
  }

  p:last-child {
    max-width: 130px;
    padding-left: 25px;
    text-align: left;
  }
`

const InputFormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
`

const InputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;

  * {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid black;
    height: 40px;
  }
  
  input {
    width: 580px;
    border-radius: 10px 0px 0px 10px;
    background-color: #D9D9D9;
  }
  button {
    width: 45px;
    border-radius: 0px 10px 10px 0px;
    background: url(${searchImage});
    background-color: #FFB36C;
    background-size: 19px;
    background-position: center;
    background-repeat: no-repeat;
  }
  button:hover {
    background-color: #FFBB6C;
  }
`;

const SuggestionsList = styled.ul`
  width: 580px;
  position: absolute;
  top: 37px;
  background: #D9D9D9;
  border: 1px solid black;
  border-top: none;
  border-radius: 0 0 10px 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  color: #000;
  font-size: 14px;
  &:hover {
    background-color: #c6c6c6;
  }
`;

export const Banner = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const today = new Date();
  const monthYear = today.toLocaleDateString("en-UA", { month: "long", year: "numeric" });
  const weekDay = today.toLocaleDateString("en-UA", { weekday: "long" });
  const day = today.getDate();

  const date = `${monthYear} ${weekDay}, ${day}th`;
  
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length >= 2) {
      const list = await getCitySuggestions(value);
      setSuggestions(list);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (cityItem) => {
    setInputValue(`${cityItem.name}, ${cityItem.country}`);
    setSuggestions([]);
    if (onCitySelect) {
      onCitySelect({ lat: cityItem.lat, lon: cityItem.lon });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    if (suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
    }
  };
  
  return (
    <BannerDiv>
      <TitleBanner>Weather dashboard</TitleBanner>
      <PhraseDiv>
        <p>
          Create your personal list of favorite cities and always be aware of
          the weather.
        </p>
        <p>{date}</p>
      </PhraseDiv>
      <InputFormDiv>
        <InputForm onSubmit={handleSubmit}>
          <input type="text" placeholder="Search location..." value={inputValue} onChange={handleInputChange} />
          <button type="submit"></button>
        </InputForm>
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((cityItem, idx) => (
              <SuggestionItem key={idx} onClick={() => handleSelectSuggestion(cityItem)}>
                {cityItem.name} {cityItem.state ? `, ${cityItem.state}` : ''} ({cityItem.country})
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </InputFormDiv>
    </BannerDiv>
  );
};