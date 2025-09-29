// PÁGINA DE LOGIN (login/page.tsx)

'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { FiUser, FiArrowRight } from 'react-icons/fi';
import { isAxiosError } from 'axios';

// Import dos componentes
import {
  AuthContainer,
  WelcomeHalf,
  WelcomeContent,
  WelcomeTitle,
  Tagline,
  FormHalf,
  FormWrapper,
  Title,
  Form,
  InputGroup,
  InputWrapper,
  Label,
  Input,
  ToggleVisibilityButton,
  SubmitButton,
  RegisterPrompt,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon
} from './LoginComponents';


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
      router.push('/');
    } catch (error) { 
      toast.dismiss(loadingToast);
      let friendlyErrorMessage = "Ocorreu um erro inesperado. Tente novamente.";

      if (isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status;
          const apiMessage = error.response.data?.message;

          switch (statusCode) {
            case 401:
              friendlyErrorMessage = apiMessage || "Email ou senha inválidos.";
              break;
            case 403:
              friendlyErrorMessage = apiMessage || "Acesso negado.";
              break;
            case 400:
              friendlyErrorMessage = apiMessage || "Requisição inválida.";
              break;
            default:
              friendlyErrorMessage = "Erro no servidor. Tente novamente mais tarde.";
              break;
          }
        } else if (error.request) {
          friendlyErrorMessage = "Não foi possível conectar ao servidor.";
        }
      }
      toast.error(friendlyErrorMessage);
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
          <Title>
            <FiUser size={25} style={{ marginRight: '8px' }} />
            Acesse sua Conta
          </Title>
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
              <FiArrowRight size={20} style={{ marginLeft: '8px' }} />
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