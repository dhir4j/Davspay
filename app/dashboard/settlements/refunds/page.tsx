'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiRefreshCw, FiDownload, FiFilter } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import VerificationRequired from '@/components/VerificationRequired';

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
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
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

export default function RefundsPage() {
  return (
    <VerificationRequired>
      <DashboardLayout>
      <PageHeader>
        <PageTitle>Refunds</PageTitle>
        <PageSubtitle>Manage and track all refund transactions</PageSubtitle>
      </PageHeader>

      <StatsGrid>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatValue>0</StatValue>
          <StatLabel>Total Refunds</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatValue>₹0</StatValue>
          <StatLabel>Refund Amount</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatValue>0</StatValue>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatValue>0</StatValue>
          <StatLabel>Completed</StatLabel>
        </StatCard>
      </StatsGrid>

      <Card>
        <CardHeader>
          <CardTitle>Refund History</CardTitle>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="sm">
              <FiFilter style={{ marginRight: '0.5rem' }} />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <FiDownload style={{ marginRight: '0.5rem' }} />
              Export
            </Button>
          </div>
        </CardHeader>

        <EmptyState>
          <FiRefreshCw />
          <h3>No Refunds</h3>
          <p>Refund transactions will appear here</p>
        </EmptyState>
      </Card>
    </DashboardLayout>
    </VerificationRequired>
  );
}
