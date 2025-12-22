'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiCreditCard,
  FiRepeat,
  FiCheckCircle,
  FiDollarSign,
  FiSettings,
  FiShield,
  FiPhone,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiUpload,
} from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Sidebar = styled(motion.aside)<{ $isOpen: boolean }>`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 968px) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 968px) {
    display: flex;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
`;

const SidebarSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}15` : 'transparent')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  transition: all 0.2s ease;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavItemCollapsible = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}15` : 'transparent')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const SubMenu = styled(motion.div)`
  margin-left: 2.5rem;
  margin-top: 0.5rem;
`;

const SubNavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}10` : 'transparent')};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SidebarFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 0.5rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.error}10;
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;

  @media (max-width: 968px) {
    margin-left: 0;
  }
`;

const TopBar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 968px) {
    display: flex;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ContentArea = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Overlay = styled(motion.div)`
  display: none;

  @media (max-width: 968px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['virtual-accounts']);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FiGrid />,
      href: '/dashboard',
    },
    {
      id: 'virtual-accounts',
      label: 'Virtual Accounts',
      icon: <FiCreditCard />,
      submenu: [
        { label: 'Transaction History', href: '/dashboard/virtual-accounts/transactions', icon: <FiRepeat /> },
        { label: 'VA Details', href: '/dashboard/virtual-accounts/details', icon: <FiCreditCard /> },
      ],
    },
    {
      id: 'upi-collections',
      label: 'UPI Collections',
      icon: <FiPhone />,
      href: '/dashboard/upi-collections',
    },
    {
      id: 'recurring-payments',
      label: 'Recurring Payments',
      icon: <FiRepeat />,
      submenu: [
        { label: 'NACH', href: '/dashboard/recurring/nach', icon: <FiRepeat /> },
        { label: 'Autopay', href: '/dashboard/recurring/autopay', icon: <FiRepeat /> },
      ],
    },
    {
      id: 'account-validation',
      label: 'Account Validation',
      icon: <FiCheckCircle />,
      submenu: [
        { label: 'Reverse Penny Drop', href: '/dashboard/validation/penny-drop', icon: <FiDollarSign /> },
        { label: 'Mobile to Account', href: '/dashboard/validation/mobile-to-account', icon: <FiPhone /> },
      ],
    },
    {
      id: 'settlements',
      label: 'Settlements & Refunds',
      icon: <FiDollarSign />,
      submenu: [
        { label: 'Settlement History', href: '/dashboard/settlements/history', icon: <FiRepeat /> },
        { label: 'Refunds', href: '/dashboard/settlements/refunds', icon: <FiDollarSign /> },
      ],
    },
    {
      id: 'bulk-services',
      label: 'Bulk Services',
      icon: <FiUpload />,
      href: '/dashboard/bulk-upload',
    },
    {
      id: 'callbacks',
      label: 'Callbacks',
      icon: <FiSettings />,
      href: '/dashboard/callbacks',
    },
    {
      id: 'credits',
      label: 'Credits',
      icon: <FiDollarSign />,
      href: '/dashboard/credits',
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardContainer>
      <AnimatePresence>
        {sidebarOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <LogoContainer href="/dashboard">
            <Image src="/images/logo.png" alt="Davspay" width={150} height={50} style={{ objectFit: 'contain' }} />
          </LogoContainer>
          <CloseButton onClick={() => setSidebarOpen(false)}>
            <FiX />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <SidebarSection>
            <SectionTitle>Dashboard</SectionTitle>
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.id}>
                  <NavItemCollapsible
                    $active={pathname?.startsWith(`/dashboard/${item.id}`) || false}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <NavItemContent>
                      {item.icon}
                      <span>{item.label}</span>
                    </NavItemContent>
                    {expandedMenus.includes(item.id) ? <FiChevronDown /> : <FiChevronRight />}
                  </NavItemCollapsible>
                  <AnimatePresence>
                    {expandedMenus.includes(item.id) && (
                      <SubMenu
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.submenu.map((subItem) => (
                          <SubNavItem
                            key={subItem.href}
                            href={subItem.href}
                            $active={pathname === subItem.href}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </SubNavItem>
                        ))}
                      </SubMenu>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavItem
                  key={item.id}
                  href={item.href || '#'}
                  $active={pathname === item.href}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavItem>
              )
            )}
          </SidebarSection>
        </SidebarContent>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>{user ? getInitials(user.full_name) : 'U'}</UserAvatar>
            <UserDetails>
              <UserName>{user?.full_name || 'User'}</UserName>
              <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
            </UserDetails>
          </UserInfo>
          <LogoutButton onClick={logout}>
            <FiLogOut />
            <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <TopBar>
          <MenuButton onClick={() => setSidebarOpen(true)}>
            <FiMenu />
          </MenuButton>
          <TopBarRight>
            {/* Add notifications, settings, etc. here */}
          </TopBarRight>
        </TopBar>

        <ContentArea>{children}</ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;
