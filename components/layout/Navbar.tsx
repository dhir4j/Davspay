'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/lib/ThemeContext';
import Button from '@/components/ui/Button';

const Nav = styled(motion.nav)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? `${theme.colors.background}95` : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${({ $scrolled, theme }) =>
    $scrolled ? `1px solid ${theme.colors.border}` : 'none'};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.secondary};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.primary}80);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradient};
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    &::after {
      width: 80%;
    }
  }
`;

const ThemeToggle = styled(motion.button)`
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
    width: 20px;
    height: 20px;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background}98;
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 500;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Developers', href: '/developers' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <Nav
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <Logo href="/">Davspay Solution</Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </NavLinks>

        <RightSection>
          <ThemeToggle
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </ThemeToggle>

          <NavLinks>
            <Link href="/pricing">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </NavLinks>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </RightSection>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {item.name}
              </MobileNavLink>
            ))}
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" fullWidth>
                Get Started
              </Button>
            </Link>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
