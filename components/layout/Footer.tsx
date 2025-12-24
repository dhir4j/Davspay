'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  &:first-child {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FooterAddress = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
  margin-top: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.neon};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const LogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoContainer>
            <Image
              src="/images/zoomedlogo.png"
              alt="Davspay Solutions"
              width={300}
              height={100}
              style={{ objectFit: 'contain' }}
            />
          </LogoContainer>
          <FooterAddress>
            7th Floor, Block E-12/8,<br />
            Vrindavan Tower, Sanjay Palace,<br />
            Agra, Uttar Pradesh<br />
            Phone: +91 97588 13335
          </FooterAddress>
          <SocialLinks>
            <SocialIcon
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <FiGithub />
            </SocialIcon>
            <SocialIcon
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Twitter"
            >
              <FiTwitter />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </SocialIcon>
            <SocialIcon
              href="mailto:contact@davspaysolution.com"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Email"
            >
              <FiMail />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Products</FooterTitle>
          <FooterLink href="/#features">Payment Gateway</FooterLink>
          <FooterLink href="/#features">UPI Integration</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="/developers">Developer API</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Developers</FooterTitle>
          <FooterLink href="/developers">Documentation</FooterLink>
          <FooterLink href="/developers/api-reference">API Reference</FooterLink>
          <FooterLink href="/developers/sdk">SDK</FooterLink>
          <FooterLink href="/developers/guides">Integration Guides</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/developers">Developers</FooterLink>
          <FooterLink href="/#">Support</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="/#">Privacy Policy</FooterLink>
          <FooterLink href="/#">Terms of Service</FooterLink>
          <FooterLink href="/#">Refund Policy</FooterLink>
          <FooterLink href="/#">Compliance</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© {currentYear} Davspay Solution. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>
          Built with Next.js & Styled Components
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
