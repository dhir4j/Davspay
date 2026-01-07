'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiArrowRight,
  FiActivity,
  FiCreditCard,
  FiShield
} from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return null;
  }

  const stats = [
    {
      label: 'Total Volume',
      value: '₹0.00',
      change: '+0%',
      subtitle: 'vs last month',
      positive: true,
      icon: <FiDollarSign />,
      color: '#3B82F6',
    },
    {
      label: 'Success Rate',
      value: '0%',
      change: '+0%',
      subtitle: 'Transaction success',
      positive: true,
      icon: <FiCheckCircle />,
      color: '#10B981',
    },
    {
      label: 'Active Collections',
      value: '0',
      change: '+0',
      subtitle: 'Active payment links',
      positive: true,
      icon: <FiActivity />,
      color: '#F59E0B',
    },
    {
      label: 'Virtual Accounts',
      value: '0',
      change: '+0',
      subtitle: 'Active VAs',
      positive: true,
      icon: <FiCreditCard />,
      color: '#8B5CF6',
    },
  ];

  const quickActions = [
    {
      title: 'Create Payment Link',
      description: 'Generate instant payment links to collect payments from customers',
      icon: <FiDollarSign />,
      href: '/dashboard/payment-links',
      color: '#3B82F6',
    },
    {
      title: 'Virtual Accounts',
      description: 'View and manage your virtual account transactions and settlements',
      icon: <FiCreditCard />,
      href: '/dashboard/virtual-accounts/transactions',
      color: '#10B981',
    },
    {
      title: 'Transaction Reports',
      description: 'Generate detailed reports and analytics for your transactions',
      icon: <FiTrendingUp />,
      href: '/dashboard/reports',
      color: '#8B5CF6',
    },
  ];

  const recentActivity = [
    {
      type: 'info',
      message: 'Welcome to DavsPay! Complete your verification to start accepting payments.',
      time: 'Just now',
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader>
        <HeaderContent>
          <WelcomeText>Welcome back, {user?.full_name || 'User'}!</WelcomeText>
          <PageTitle>Dashboard Overview</PageTitle>
          <PageSubtitle>
            Monitor your payment infrastructure, track transactions, and manage your account
          </PageSubtitle>
        </HeaderContent>
        <HeaderActions>
          <PrimaryButton onClick={() => router.push('/dashboard/verification')}>
            <FiShield />
            Complete Verification
          </PrimaryButton>
        </HeaderActions>
      </PageHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatHeader>
              <StatIcon $color={stat.color}>{stat.icon}</StatIcon>
            </StatHeader>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
            <StatFooter>
              <StatChange $positive={stat.positive}>
                {stat.positive ? '↑' : '↓'} {stat.change}
              </StatChange>
              <StatSubtitle>{stat.subtitle}</StatSubtitle>
            </StatFooter>
          </StatCard>
        ))}
      </StatsGrid>

      <SectionTitle>Quick Actions</SectionTitle>
      <QuickActionsGrid>
        {quickActions.map((action, index) => (
          <ActionCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onClick={() => router.push(action.href)}
            $color={action.color}
          >
            <ActionIconWrapper $color={action.color}>
              {action.icon}
            </ActionIconWrapper>
            <ActionContent>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionContent>
            <ActionArrow>
              <FiArrowRight />
            </ActionArrow>
          </ActionCard>
        ))}
      </QuickActionsGrid>

      <TwoColumnLayout>
        <Column>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityCard>
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityDot $type={activity.type} />
                <ActivityContent>
                  <ActivityMessage>{activity.message}</ActivityMessage>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
            <EmptyState>
              <EmptyIcon><FiActivity /></EmptyIcon>
              <EmptyText>No recent transactions</EmptyText>
              <EmptySubtext>Your recent payment activities will appear here</EmptySubtext>
            </EmptyState>
          </ActivityCard>
        </Column>

        <Column>
          <SectionTitle>Account Status</SectionTitle>
          <StatusCard>
            <StatusItem>
              <StatusLabel>Verification Status</StatusLabel>
              <StatusBadge $status="pending">Pending Verification</StatusBadge>
            </StatusItem>
            <StatusItem>
              <StatusLabel>API Access</StatusLabel>
              <StatusBadge $status="active">Active</StatusBadge>
            </StatusItem>
            <StatusItem>
              <StatusLabel>Available Credits</StatusLabel>
              <StatusValue>₹0.00</StatusValue>
            </StatusItem>
            <StatusDivider />
            <StatusAction onClick={() => router.push('/dashboard/credits')}>
              <span>Add Credits</span>
              <FiArrowRight />
            </StatusAction>
          </StatusCard>
        </Column>
      </TwoColumnLayout>
    </DashboardLayout>
  );
}

// Styled Components
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const WelcomeText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.875rem 1.5rem;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 0.875rem;
  color: ${({ $positive, theme }) => ($positive ? theme.colors.success : theme.colors.error)};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatSubtitle = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ActionCard = styled(motion.div)<{ $color: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  &:hover {
    border-color: ${({ $color }) => $color};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);

    svg {
      transform: translateX(4px);
    }
  }
`;

const ActionIconWrapper = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ActionDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const ActionArrow = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div``;

const ActivityCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 300px;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityDot = styled.div<{ $type: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.success :
    $type === 'error' ? theme.colors.error :
    theme.colors.primary};
  margin-top: 6px;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ActivityTime = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    width: 32px;
    height: 32px;
  }
`;

const EmptyText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const EmptySubtext = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const StatusLabel = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const StatusBadge = styled.div<{ $status: string }>`
  padding: 0.375rem 0.875rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8125rem;
  font-weight: 600;
  background: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.success + '15' :
    $status === 'pending' ? theme.colors.warning + '15' :
    theme.colors.error + '15'};
  color: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.success :
    $status === 'pending' ? theme.colors.warning :
    theme.colors.error};
`;

const StatusValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StatusDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const StatusAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary}10;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
