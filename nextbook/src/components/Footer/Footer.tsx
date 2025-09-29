// FOOTER (app/components/Footer/Footer.tsx)

'use client';

import FooterUI from './FooterComponents';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return <FooterUI currentYear={currentYear} />;
}