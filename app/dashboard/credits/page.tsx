'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiClock, FiDownload } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 999px;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressFill = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  transition: width 0.3s ease;
`;

const UsageText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    width: 64px;
    height: 64px;
    margin: 0 auto 1rem;
    opacity: 0.3;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9375rem;
  }
`;

export default function CreditsPage() {
  return (
    <DashboardLayout>
      <PageHeader>
        <PageTitle>Credits Management</PageTitle>
        <PageSubtitle>Monitor and manage your API credits and usage</PageSubtitle>
      </PageHeader>

      <StatsGrid>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatValue>0</StatValue>
          <StatLabel>Available Credits</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatValue>0</StatValue>
          <StatLabel>Used This Month</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatValue>--</StatValue>
          <StatLabel>Renewal Date</StatLabel>
        </StatCard>
      </StatsGrid>

      <Card>
        <CardTitle>Credit Usage</CardTitle>
        <div>
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            <strong>0</strong> of <strong>0</strong> credits used
          </p>
          <ProgressBar>
            <ProgressFill $percentage={0} />
          </ProgressBar>
          <UsageText>0% of monthly quota used</UsageText>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Button variant="primary" size="md">
            Purchase Credits
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
          <Button variant="outline" size="sm">
            <FiDownload style={{ marginRight: '0.5rem' }} />
            Export
          </Button>
        </CardHeader>
        <EmptyState>
          <FiTrendingUp />
          <h3>No Usage Data</h3>
          <p>Credit usage history will appear here</p>
        </EmptyState>
      </Card>
    </DashboardLayout>
  );
}
