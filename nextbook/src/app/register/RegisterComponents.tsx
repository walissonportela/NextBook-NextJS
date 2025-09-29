// register/RegisterComponents.tsx

import styled, { css } from 'styled-components';
import { IMaskInput } from 'react-imask';

// ÍCONES
export const UserIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
export const MailIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );
export const CpfIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> );
export const PhoneIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> );
export const LockIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> );
export const EyeIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
export const EyeOffIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg> );


// Styled Components
export const RegisterContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
`;

export const WelcomeHalf = styled.div`
  width: 50%;
  background-color: #2563EB;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const WelcomeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
`;

export const Tagline = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 350px;
`;

export const FormHalf = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const MaskedInput = styled(IMaskInput)`
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%; /* Adicionado para garantir que o MaskedInput se comporte como o Input */

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const ToggleVisibilityButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
  color: #6B7280;
  z-index: 1;
`;

export const SubmitButton = styled.button`
  background-color: #2563EB;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 70%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #1D4ED8;
  }

  &:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
  }
`;

export const StrengthChecker = styled.div<{ strength: number }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  height: 20px;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ strength }) => (strength > 0 ? '1' : '0')};
`;

export const StrengthBar = styled.div<{ strength: number }>`
  height: 8px;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease, background-color 0.3s ease;

    ${({ strength }) => {
      if (strength === 1) return css`width: 33%; background-color: #ef4444;`;
      if (strength === 2) return css`width: 66%; background-color: #f59e0b;`;
      if (strength === 3) return css`width: 100%; background-color: #10b981;`;
      return css`width: 0%;`;
    }}
  }
`;

export const StrengthLabel = styled.span<{ strength: number }>`
  font-size: 0.8rem;
  font-weight: 500;
  width: 50px;
  text-align: right;

  ${({ strength }) => {
    if (strength === 1) return css`color: #ef4444;`;
    if (strength === 2) return css`color: #f59e0b;`;
    if (strength === 3) return css`color: #10b981;`;
    return css`color: transparent;`;
  }}
`;

// Função de lógica da força da senha 
export const checkPasswordStrength = (password: string) => {
  let strength = 0; let label = '';
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  if (strength < 2) { label = 'Fraca'; strength = 1; }
  else if (strength < 4) { label = 'Média'; strength = 2; }
  else { label = 'Forte'; strength = 3; }
  if (password.length === 0) { strength = 0; label = ''; }
  return { strength, label };
};