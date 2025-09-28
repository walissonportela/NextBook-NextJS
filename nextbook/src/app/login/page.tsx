'use client'

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

const MailIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );
const LockIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> );
const EyeIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
const EyeOffIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg> );

const AuthContainer = styled.div`
  display: flex; min-height: 100vh; width: 100%; background-color: #f9fafb;
`;
const WelcomeHalf = styled.div`
  width: 50%; background-color: #2563EB; color: #FFFFFF;
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; padding: 2rem; text-align: center;
  @media (max-width: 900px) { display: none; }
`;
const WelcomeContent = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
`;
const WelcomeTitle = styled.h1`
  font-size: 3rem; font-weight: 700; line-height: 1.1;
`;
const Tagline = styled.p`
  font-size: 1.25rem; color: rgba(255, 255, 255, 0.8); max-width: 350px;
`;
const FormHalf = styled.div`
  width: 50%; display: flex; justify-content: center;
  align-items: center; padding: 2rem;
  @media (max-width: 900px) { width: 100%; }
`;
const FormWrapper = styled.div`
  background-color: #ffffff; padding: 2.5rem; border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%; max-width: 450px;
`;
const Title = styled.h1`
  font-size: 2rem; font-weight: 700; text-align: center;
  margin-bottom: 2rem; color: #1F2937;
`;
const Form = styled.form`
  display: flex; flex-direction: column; gap: 1.5rem;
`;
const InputGroup = styled.div`
  display: flex; flex-direction: column;
`;
const InputWrapper = styled.div`
  position: relative; display: flex; align-items: center;
`;
const Label = styled.label`
  margin-bottom: 0.5rem; font-weight: 500; color: #374151;
  display: flex; align-items: center; gap: 0.5rem;
`;
const Input = styled.input`
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #D1D5DB; border-radius: 8px; font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none; border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;
const ToggleVisibilityButton = styled.button`
  background: none; border: none; position: absolute;
  top: 50%; transform: translateY(-50%); right: 10px;
  cursor: pointer; color: #6B7280; z-index: 1;
`;
const SubmitButton = styled.button`
  padding: 1rem; border-radius: 8px; font-weight: 600; font-size: 1.1rem;
  cursor: pointer; transition: all 0.2s ease-in-out; border: none;
  background-color: #3B82F6; color: #FFFFFF; margin-top: 1rem;
  &:hover { 
    background-color: #2563EB; transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
  }
  &:disabled { background-color: #9CA3AF; cursor: not-allowed; }
`;
const RegisterPrompt = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #4B5563;

  a {
    color: #3B82F6;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Autenticando...');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken } = response.data;

      login(accessToken);
      
      toast.dismiss(loadingToast);
      toast.success('Login bem-sucedido!');
      
    } catch (error: any) {
      toast.dismiss(loadingToast);
      const errorMessage = error.response?.data?.message || "Ocorreu um erro inesperado.";
      toast.error(`Falha no login: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <WelcomeHalf>
        <WelcomeContent>
          <Image src="/images/nb_logo.svg" alt="Nextbook Logo" width={500} height={500} />
          <WelcomeTitle>Bem-vindo de Volta!</WelcomeTitle>
          <Tagline>Sua próxima grande leitura te espera.</Tagline>
        </WelcomeContent>
      </WelcomeHalf>
      <FormHalf>
        <FormWrapper>
          <Title>Acesse sua Conta</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="email"><MailIcon /> E-mail</Label>
              <InputWrapper>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputWrapper>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password"><LockIcon /> Senha</Label>
              <InputWrapper>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ToggleVisibilityButton type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </ToggleVisibilityButton>
              </InputWrapper>
            </InputGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </SubmitButton>
          </Form>
          <RegisterPrompt>
            Não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </RegisterPrompt>
        </FormWrapper>
      </FormHalf>
    </AuthContainer>
  );
}