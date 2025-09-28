'use client'
import styled from 'styled-components';

const GitHubIcon = () => ( <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> );
const LinkedInIcon = () => ( <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> );
const PortfolioIcon = () => ( <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> );


const FooterContainer = styled.footer`
  background-color: #2563EB;
  color: #E0E7FF; // Tom de branco levemente azulado para o texto
  padding: 1.5rem;
  margin-top: auto;
  font-size: 0.9rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) { flex-direction: column; gap: 1.5rem; }
`;

const Credits = styled.p`
  span {
    font-weight: 500;
    color: #FFFFFF;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialIconLink = styled.a`
  color: #E0E7FF;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #FFFFFF;
    transform: translateY(-2px);
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <Credits>
          © {currentYear} Nextbook. Desenvolvido por <span>Walisson Portela</span>
        </Credits>
        <SocialLinks>
          <SocialIconLink href="#" target="_blank" aria-label="GitHub"><GitHubIcon /></SocialIconLink>
          <SocialIconLink href="#" target="_blank" aria-label="LinkedIn"><LinkedInIcon /></SocialIconLink>
          <SocialIconLink href="#" target="_blank" aria-label="Portfolio"><PortfolioIcon /></SocialIconLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
}