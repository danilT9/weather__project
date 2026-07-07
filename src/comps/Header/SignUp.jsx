import { useEffect } from "react";
import { styled } from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 10px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);

  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 15px;
  }
  @media (max-width: 320px) {
    padding: 20px 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  line-height: 1;
  &:hover {
    color: #000;
  }
`;

const Title = styled.h2`
  margin: 0 0 25px 0;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #333;
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
  
  label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
  }
  
  input {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    &:focus {
      border-color: #FFB36C;
      background-color: #fff;
    }
  }
`;

const SubmitButton = styled.button`
  width: 114px;
  height: 45px;
  background-color: #FFB36C;
  border: none;
  border-radius: 8px;
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  margin-top: 10px;
  transition: background 0.2s;
  box-sizing: border-box;
  &:hover {
    background-color: #ffa043;
  }
`;

export const SignUp = ({ onClose, signData, setSignData }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signData.username || !signData.email || !signData.password) return;
    localStorage.setItem("account", JSON.stringify(signData));
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Create Account</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={signData.username} 
              onChange={handleChange} 
              placeholder="Enter your username" 
              required 
            />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={signData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              required 
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={signData.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
              required 
            />
          </FormGroup>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};