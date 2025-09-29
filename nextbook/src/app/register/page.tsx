// PÁGINA DE CADASTRO (register/page.tsx)

'use client'

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { FiUser, FiArrowRight } from 'react-icons/fi';
import { isAxiosError } from 'axios';

// Import dos componentes
import {
  RegisterContainer,
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
  MaskedInput,
  ToggleVisibilityButton,
  SubmitButton,
  StrengthChecker,
  StrengthBar,
  StrengthLabel,
  checkPasswordStrength, 
  UserIcon,
  MailIcon,
  CpfIcon,
  PhoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from './RegisterComponents';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', cpf: '', phone: '',
    password: '', confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { id: string, value: string } }) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    const passwordStrength = checkPasswordStrength(formData.password);
    if (passwordStrength.strength < 2) {
      toast.error("Por favor, use uma senha mais forte.");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Criando sua conta...');

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        cpf: formData.cpf.replace(/[.\-]/g, ''),
        phone: formData.phone.replace(/[\(\)\s\-]/g, ''),
        password: formData.password,
      };

      await api.post('/auth/register', userData);

      toast.dismiss(loadingToast);
      toast.success('Conta criada com sucesso! Redirecionando para o login...');

      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      toast.dismiss(loadingToast);
      let errorMessage = "Ocorreu um erro inesperado.";
      if (isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(`Falha no cadastro: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = useMemo(() => checkPasswordStrength(formData.password), [formData.password]);

  return (
    <RegisterContainer>
      <WelcomeHalf>
        <WelcomeContent>
          <Image src="/images/nb_logo.svg" alt="Nextbook Logo" width={500} height={500} />
          <WelcomeTitle>Bem-vindo à Nextbook!</WelcomeTitle>
          <Tagline>Onde cada página é uma nova aventura.</Tagline>
        </WelcomeContent>
      </WelcomeHalf>
      <FormHalf>
        <FormWrapper>
          <Title>
            <FiUser size={25} style={{ marginRight: '8px' }} />
            Crie sua Conta
          </Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="fullName"><UserIcon /> Nome Completo</Label>
              <InputWrapper>
                <Input id="fullName" type="text" required value={formData.fullName} onChange={handleChange} />
              </InputWrapper>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email"><MailIcon /> E-mail</Label>
              <InputWrapper>
                <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
              </InputWrapper>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="cpf"><CpfIcon /> CPF</Label>
              <InputWrapper>
                <MaskedInput
                  mask="000.000.000-00"
                  id="cpf"
                  value={formData.cpf}
                  onAccept={(value: string) => handleChange({ target: { id: 'cpf', value } })}
                  required
                />
              </InputWrapper>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="phone"><PhoneIcon /> Telefone</Label>
              <InputWrapper>
                <MaskedInput
                  mask="(00) 00000-0000"
                  id="phone"
                  value={formData.phone}
                  onAccept={(value: string) => handleChange({ target: { id: 'phone', value } })}
                  required
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
                  value={formData.password}
                  onChange={handleChange}
                />
                <ToggleVisibilityButton type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </ToggleVisibilityButton>
              </InputWrapper>
              <StrengthChecker strength={passwordStrength.strength}>
                <StrengthBar strength={passwordStrength.strength} />
                <StrengthLabel strength={passwordStrength.strength}>
                  {passwordStrength.label}
                </StrengthLabel>
              </StrengthChecker>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="confirmPassword"><LockIcon /> Confirmar Senha</Label>
              <InputWrapper>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <ToggleVisibilityButton type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </ToggleVisibilityButton>
              </InputWrapper>
            </InputGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
              <FiArrowRight size={20} style={{ marginLeft: '8px' }} />
            </SubmitButton>
          </Form>
        </FormWrapper>
      </FormHalf>
    </RegisterContainer>
  );
}