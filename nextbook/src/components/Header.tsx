'use client'

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const SearchIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> );
const CartIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> );
const UserIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const LogInIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg> );
const UserPlusIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg> );
const LogOutIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> );

const HeaderContainer = styled.header`
  background-color: #2563EB; color: #FFFFFF; padding: 1.25rem 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); display: flex;
  justify-content: center; align-items: center; position: sticky;
  top: 0; z-index: 50; width: 100%;
`;
const HeaderContent = styled.div`
  width: 100%; max-width: 1200px; display: flex;
  justify-content: space-between; align-items: center; gap: 2rem;
`;
const LogoContainer = styled(Link)`
  display: flex; align-items: center; text-decoration: none; flex-shrink: 0;
`;
const SearchBarContainer = styled.div`
  position: relative; width: 100%; max-width: 500px;
  @media (max-width: 768px) { display: none; }
`;
const SearchInput = styled.input`
  width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px;
  border: none; background-color: rgba(255, 255, 255, 0.2);
  color: #FFFFFF; font-size: 1rem;
  &::placeholder { color: rgba(255, 255, 255, 0.7); }
  &:focus { outline: none; background-color: rgba(255, 255, 255, 0.3); }
`;
const SearchIconWrapper = styled.div`
  position: absolute; top: 50%; left: 0.75rem;
  transform: translateY(-50%); color: rgba(255, 255, 255, 0.7);
`;
const ActionsContainer = styled.div`
  display: flex; align-items: center; gap: 1.5rem; flex-shrink: 0;
`;
const IconButton = styled.button`
  background: none; border: none; color: #FFFFFF; cursor: pointer;
  position: relative; padding: 0.5rem; border-radius: 50%;
  transition: background-color 0.2s ease;
  &:hover { background-color: rgba(255, 255, 255, 0.1); }
`;
const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute; top: calc(100% + 12px); right: 0;
  background-color: white; border-radius: 12px;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 200px; z-index: 60; padding: 0.5rem;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
`;
const DropdownLink = styled(Link)`
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1rem; color: #374151; text-decoration: none;
  font-weight: 500; border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover { background-color: #f3f4f6; color: #1F2937; }
`;
const DropdownButton = styled.button`
  display: flex; align-items: center; gap: 0.75rem; width: 100%;
  padding: 0.75rem 1rem; color: #ef4444; text-decoration: none;
  font-weight: 500; border-radius: 8px; background: none; border: none;
  cursor: pointer; text-align: left; font-size: 1rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover { background-color: #fef2f2; }
`;
const UserMenuContainer = styled.div`
  position: relative;
`;
const UserGreetingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 1rem 0.25rem 0.25rem;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
  background: none;
  border: none;
  color: #FFFFFF;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const AvatarCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Header() {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement) || !event.target.closest('#user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer href="/">
          <Image src="/images/nb_logo.svg" alt="Nextbook Logo" width={200} height={60} />
        </LogoContainer>
        <SearchBarContainer>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <SearchInput placeholder="Pesquise por seu próximo livro..." />
        </SearchBarContainer>

        <ActionsContainer>
          <IconButton> <CartIcon /> </IconButton>
          
          <UserMenuContainer id="user-menu-container">
            {isLoading ? (
              <AvatarCircle style={{ width: '40px', height: '40px' }} />
            ) : isAuthenticated && user ? (
              <>
                <UserGreetingButton onClick={() => setUserMenuOpen(prev => !prev)}>
                  <AvatarCircle>
                    <UserIcon />
                  </AvatarCircle>
                  <span>Olá, {(user.name || user.email).split('@')[0]}</span>
                  </UserGreetingButton>
                <DropdownMenu $isOpen={isUserMenuOpen}>
                  <DropdownButton onClick={logout}>
                    <LogOutIcon />
                    <span>Sair</span>
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