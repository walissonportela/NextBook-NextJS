'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useFilter } from '@/contexts/FilterContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation'; 

// Import dos componentes 
import {
  HeaderContainer, 
  HeaderContent, 
  LogoContainer, 
  SearchForm, 
  SearchInputContainer,
  SearchInput, 
  SearchButton, 
  SearchIconWrapper, 
  ActionsContainer, 
  IconButton,
  DropdownMenu, 
  DropdownLink, 
  DropdownButton, 
  UserMenuContainer,
  UserGreetingButton, 
  AvatarCircle, 
  CartBadge, 
  SearchIcon, 
  CartIcon, 
  UserIcon,
  LogInIcon, 
  UserPlusIcon, 
  LogOutIcon
} from './HeaderComponents'; 

export default function Header() {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const { setSearchQuery } = useFilter();
  const [localSearch, setLocalSearch] = useState('');
  const { toggleCart, cartCount } = useCart();
  const router = useRouter(); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    router.push('/'); 
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement) || !event.target.closest('#user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isUserMenuOpen]); 

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer href="/">
          <Image src="/images/nb_logo.svg" alt="Nextbook Logo" width={200} height={60} />
        </LogoContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchInputContainer>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <SearchInput
              placeholder="Pesquise por seu próximo livro..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </SearchInputContainer>
          <SearchButton type="submit">Pesquisar</SearchButton>
        </SearchForm>

        <ActionsContainer>
          <IconButton onClick={toggleCart}>
            <CartIcon />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </IconButton>
          
          <UserMenuContainer id="user-menu-container">
            {isLoading ? (
              <AvatarCircle style={{ width: '40px', height: '40px' }} />
            ) : isAuthenticated && user ? (
              <>
                <UserGreetingButton onClick={() => setUserMenuOpen(prev => !prev)}>
                  <AvatarCircle> <UserIcon /> </AvatarCircle>
                  <span>Olá, {(user.name || user.email).split('@')[0]}</span>
                </UserGreetingButton>
                <DropdownMenu $isOpen={isUserMenuOpen}>
                  <DropdownButton onClick={logout}>
                    <LogOutIcon /> <span>Sair</span>
                  </DropdownButton>
                </DropdownMenu>
              </>
            ) : (
              <>
                <IconButton onClick={() => setUserMenuOpen(prev => !prev)}>
                  <UserIcon />
                </IconButton>
                <DropdownMenu $isOpen={isUserMenuOpen}>
                  <DropdownLink href="/login"><LogInIcon /><span>Login</span></DropdownLink>
                  <DropdownLink href="/register"><UserPlusIcon /><span>Cadastro</span></DropdownLink>
                </DropdownMenu>
              </>
            )}
          </UserMenuContainer>
        </ActionsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}