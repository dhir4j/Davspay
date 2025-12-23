'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiDownload,
  FiFilter,
  FiSearch,
  FiCopy,
} from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { useState } from 'react';

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
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const StatIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 0.875rem;
  color: ${({ $positive, theme }) => ($positive ? theme.colors.success : theme.colors.error)};
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TableControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  align-items: center;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: 3rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9375rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableBody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: ${({ $status }) => {
    switch ($status) {
      case 'success':
        return '#4ADE8020';
      case 'pending':
        return '#FBBF2420';
      case 'failed':
        return '#EF444420';
      default:
        return '#9CA3AF20';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'success':
        return '#4ADE80';
      case 'pending':
        return '#FBBF24';
      case 'failed':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  }};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    width: 64px;
    height: 64px;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    opacity: 0.3;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: 0.9375rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const CodeSnippet = styled.div`
  background: #1e1e1e;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #d4d4d4;
  overflow-x: auto;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  max-width: 700px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  pre {
    margin: 0;
    white-space: pre;
  }

  .keyword { color: #569cd6; }
  .function { color: #dcdcaa; }
  .string { color: #ce9178; }
  .comment { color: #6a9955; font-style: italic; }
  .property { color: #9cdcfe; }
  .number { color: #b5cea8; }
`;

const CopyButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;

  svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function UPICollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = [
    {
      label: 'Total Collections',
      value: '₹0',
      change: '+0%',
      positive: true,
      icon: <FiDollarSign />,
      color: '#7C3AED',
    },
    {
      label: 'Success Rate',
      value: '0%',
      change: '+0%',
      positive: true,
      icon: <FiCheckCircle />,
      color: '#4ADE80',
    },
    {
      label: 'Pending',
      value: '0',
      change: '0',
      positive: false,
      icon: <FiClock />,
      color: '#FBBF24',
    },
    {
      label: 'Failed',
      value: '0',
      change: '0',
      positive: false,
      icon: <FiXCircle />,
      color: '#EF4444',
    },
  ];

  const sampleCode = `<span class="comment">// Initialize UPI Collection Request</span>
<span class="keyword">const</span> <span class="property">upiCollection</span> = <span class="keyword">await</span> davspay.<span class="property">upi</span>.<span class="function">collect</span>({
  <span class="property">customer_vpa</span>: <span class="string">'customer@upi'</span>,
  <span class="property">amount</span>: <span class="number">10000</span>, <span class="comment">// Amount in paise (₹100.00)</span>
  <span class="property">note</span>: <span class="string">'Payment for Order #12345'</span>,
  <span class="property">merchant_id</span>: <span class="string">'YOUR_MERCHANT_ID'</span>,
  <span class="property">callback_url</span>: <span class="string">'https://yoursite.com/callback'</span>
});

<span class="comment">// Response contains collection details</span>
console.<span class="function">log</span>(<span class="string">'Collection ID:'</span>, upiCollection.<span class="property">id</span>);
console.<span class="function">log</span>(<span class="string">'Status:'</span>, upiCollection.<span class="property">status</span>);
console.<span class="function">log</span>(<span class="string">'VPA:'</span>, upiCollection.<span class="property">vpa</span>);`;

  const copyCode = () => {
    // Remove HTML tags for copying
    const plainCode = sampleCode.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(plainCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <PageHeader>
        <PageTitle>UPI Collections</PageTitle>
        <PageSubtitle>Track and manage all your UPI collection requests</PageSubtitle>
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
              <StatLabel>{stat.label}</StatLabel>
              <StatIcon $color={stat.color}>{stat.icon}</StatIcon>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatChange $positive={stat.positive}>
              {stat.positive ? '↑' : '↓'} {stat.change}
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <TableCard>
        <TableHeader>
          <TableTitle>Recent Collections</TableTitle>
          <TableControls>
            <SearchBox>
              <FiSearch />
              <SearchInput
                type="text"
                placeholder="Search by UPI ID, amount, or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>
            <Button variant="outline" size="md">
              <FiFilter style={{ marginRight: '0.5rem' }} />
              Filter
            </Button>
            <Button variant="outline" size="md">
              <FiDownload style={{ marginRight: '0.5rem' }} />
              Export
            </Button>
          </TableControls>
        </TableHeader>

        <EmptyState>
          <FiDollarSign />
          <h3>No UPI Collections Yet</h3>
          <p>Start accepting payments via UPI collect to see transactions here</p>

          <CodeSnippet>
            <CopyButton onClick={copyCode}>
              {copied ? (
                <>
                  <FiCheckCircle /> Copied
                </>
              ) : (
                <>
                  <FiCopy /> Copy
                </>
              )}
            </CopyButton>
            <pre dangerouslySetInnerHTML={{ __html: sampleCode }} />
          </CodeSnippet>

          <div style={{ marginTop: '1rem' }}>
            <Button variant="primary" size="md">
              View Integration Guide
            </Button>
          </div>
        </EmptyState>
      </TableCard>
    </DashboardLayout>
  );
}
