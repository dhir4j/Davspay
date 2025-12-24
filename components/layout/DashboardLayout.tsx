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
  FiHelpCircle,
  FiMail,
  FiBook,
  FiExternalLink,
  FiCode,
  FiFileText,
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

const HelpButton = styled.button`
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
  margin-bottom: 0.5rem;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
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

const HelpModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 500px;
  z-index: 10000;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const HelpModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const HelpModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HelpModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const CloseModalButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HelpContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SupportPerson = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SupportAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const SupportInfo = styled.div`
  flex: 1;
`;

const SupportName = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const SupportEmail = styled.a`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const HelpLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HelpLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const HelpLinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ChatBox = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 400px;
  max-height: 600px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    right: 1rem;
    bottom: 1rem;
    max-height: 500px;
  }
`;

const ChatHeader = styled.div`
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatHeaderTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

const ChatCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div<{ $fromUser: boolean }>`
  display: flex;
  justify-content: ${({ $fromUser }) => ($fromUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ $fromUser: boolean }>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $fromUser, theme }) =>
    $fromUser ? theme.colors.primary : theme.colors.surface};
  color: ${({ $fromUser, theme }) =>
    $fromUser ? 'white' : theme.colors.text};
  font-size: 0.875rem;
  line-height: 1.5;
  word-wrap: break-word;
`;

const ChatInput = styled.form`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.surface};
`;

const ChatInputField = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ChatSendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

// Generate random support person name
const generateSupportName = () => {
  const firstNames = ['Arjun', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Ananya', 'Karan', 'Ishita', 'Rohan', 'Meera'];
  const lastNames = ['Sharma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Verma', 'Reddy', 'Joshi', 'Nair', 'Desai'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['virtual-accounts']);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [supportPerson] = useState(() => generateSupportName());
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; fromUser: boolean }>>([
    { text: `Hi! I'm ${generateSupportName().split(' ')[0]} from Davspay support. How can I help you today?`, fromUser: false }
  ]);
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

  const supportEmail = `${supportPerson.toLowerCase().replace(' ', '.')}@davspay.com`;
  const supportInitials = getInitials(supportPerson);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    setMessages([...messages, { text: chatMessage, fromUser: true }]);
    setChatMessage('');

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "Thank you for your message. Our team will look into this right away!",
        "I understand your concern. Let me check that for you.",
        "That's a great question! I'll get you the answer shortly.",
        "I've noted down your request. We'll get back to you soon!",
        "Thanks for reaching out! I'm here to help you with any questions."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, fromUser: false }]);
    }, 1000);
  };

  const openChatBox = () => {
    setHelpModalOpen(false);
    setChatBoxOpen(true);
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

      <AnimatePresence>
        {helpModalOpen && (
          <>
            <HelpModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHelpModalOpen(false)}
            />
            <HelpModal
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <HelpModalHeader>
                <HelpModalTitle>Help & Support</HelpModalTitle>
                <CloseModalButton onClick={() => setHelpModalOpen(false)}>
                  <FiX />
                </CloseModalButton>
              </HelpModalHeader>

              <HelpContent>
                <SupportPerson>
                  <SupportAvatar>{supportInitials}</SupportAvatar>
                  <SupportInfo>
                    <SupportName onClick={openChatBox}>{supportPerson}</SupportName>
                    <SupportEmail href={`mailto:${supportEmail}`}>
                      <FiMail />
                      {supportEmail}
                    </SupportEmail>
                  </SupportInfo>
                </SupportPerson>

                <HelpLinks>
                  <HelpLink href="/developers">
                    <HelpLinkContent>
                      <FiBook />
                      <span>Documentation</span>
                    </HelpLinkContent>
                    <FiExternalLink />
                  </HelpLink>
                  <HelpLink href="/developers/api-reference">
                    <HelpLinkContent>
                      <FiCode />
                      <span>API Reference</span>
                    </HelpLinkContent>
                    <FiExternalLink />
                  </HelpLink>
                  <HelpLink href="/developers/guides">
                    <HelpLinkContent>
                      <FiFileText />
                      <span>Integration Guides</span>
                    </HelpLinkContent>
                    <FiExternalLink />
                  </HelpLink>
                  <HelpLink href="mailto:support@davspay.com">
                    <HelpLinkContent>
                      <FiMail />
                      <span>Contact Support</span>
                    </HelpLinkContent>
                    <FiExternalLink />
                  </HelpLink>
                </HelpLinks>
              </HelpContent>
            </HelpModal>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatBoxOpen && (
          <ChatBox
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader>
              <ChatHeaderTitle>Chat with {supportPerson.split(' ')[0]}</ChatHeaderTitle>
              <ChatCloseButton onClick={() => setChatBoxOpen(false)}>
                <FiX />
              </ChatCloseButton>
            </ChatHeader>

            <ChatMessages>
              {messages.map((msg, index) => (
                <Message key={index} $fromUser={msg.fromUser}>
                  <MessageBubble $fromUser={msg.fromUser}>
                    {msg.text}
                  </MessageBubble>
                </Message>
              ))}
            </ChatMessages>

            <ChatInput onSubmit={handleChatSubmit}>
              <ChatInputField
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <ChatSendButton type="submit" disabled={!chatMessage.trim()}>
                Send
              </ChatSendButton>
            </ChatInput>
          </ChatBox>
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
          <HelpButton onClick={() => setHelpModalOpen(true)}>
            <FiHelpCircle />
            <span>Help & Support</span>
          </HelpButton>
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
