import { styled } from "styled-components"
import { useEffect, useState } from "react";

const Backdrop = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  width: 600px;
  height: 534px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
`;

const Title = styled.p`
  font-size: 28px;
`

const Form = styled.form`
  width: 600px;
  height: 534px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  gap: 15px;

  p {
    font-size: 14px;
  }
  input {
    width: 420px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 10px;
    border: none;
    background-color: #E4E4E4;
  }
  button {
    padding: 10px 30px;
    border: none;
    border-radius: 10px;
    background-color: #FFB36C;
  }
`;

const ContainerLogIn = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`

const LogInA = styled.a`
  text-decoration: none;
`

export const SignUp = ({ onClose, signData, setSignData }) => {
  useEffect(() => {
    const handleKeyClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyClose);
    return () => window.removeEventListener("keydown", handleKeyClose);
  }, [onClose])

  const handleChange = (e) => {
    setSignData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSumbit = (e) => {
    e.preventDefault();
    if (signData.username.length > 3 && signData.password.length > 8) {
      localStorage.setItem("account", JSON.stringify(signData));
      setSignData(({
        username: "",
        email: "",
        password: "",
      }));
      onClose()
    } else {
      alert("Incorrect data value.");
    }
  }
  
  return (
    <Backdrop onClick={() => onClose()}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Title>Sign up</Title>
        <Form onSubmit={handleSumbit}>
          <div>
            <p>Username</p>
            <input onChange={handleChange} name="username" placeholder="Username" type="text" value={signData.username} />
          </div>
          <div>
            <p>E-Mail</p>
            <input onChange={handleChange} name="email" placeholder="E-Mail" type="email" value={signData.email} />
          </div>
          <div>
            <p>Password</p>
            <input onChange={handleChange} name="password" placeholder="Password" type="password" value={signData.password} />
          </div>
          <button type="submit">Sign up</button>
        </Form>
        <ContainerLogIn>
          <p>Already have an account?</p>
          <LogInA href=".">Log In</LogInA>
        </ContainerLogIn>
      </Content>
    </Backdrop>
  )
}