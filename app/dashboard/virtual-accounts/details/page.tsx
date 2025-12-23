'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCopy, FiCheckCircle, FiAlertCircle, FiClock, FiDownload, FiRefreshCw } from 'react-icons/fi';
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.success + '20' : theme.colors.textSecondary + '20'};
  color: ${({ $status, theme }) => ($status === 'active' ? theme.colors.success : theme.colors.textSecondary)};
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.1);
  }
`;

const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  overflow-x: auto;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const CopyCodeButton = styled.button`
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
    transform: translateY(-1px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  font-size: 0.9375rem;
  cursor: pointer;
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function VirtualAccountDetailsPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const vaData = {
    vaId: 'VA' + Math.random().toString(36).substr(2, 12).toUpperCase(),
    accountNumber: '1234567890',
    ifscCode: 'DAVS0000001',
    accountHolder: 'DAVSPAY MERCHANT',
    upiId: 'merchant@davspay',
    status: 'active',
    createdAt: new Date().toLocaleDateString(),
    balance: '₹0.00',
    totalTransactions: 0,
    successfulPayments: 0,
  };

  const integrationCode = `// Initialize Davspay Client
const davspay = require('davspay-node');
const client = new davspay.Client({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET'
});

// Create Virtual Account
const virtualAccount = await client.virtualAccounts.create({
  customer_name: 'John Doe',
  customer_email: 'john@example.com',
  customer_mobile: '9876543210',
  amount: 10000, // in paise
  description: 'Payment for Order #12345'
});

// Webhook Handler
app.post('/webhook/davspay', (req, res) => {
  const signature = req.headers['x-davspay-signature'];
  const payload = req.body;

  if (davspay.webhooks.verify(payload, signature)) {
    // Process payment notification
    console.log('Payment received:', payload);
    res.status(200).send('OK');
  } else {
    res.status(400).send('Invalid signature');
  }
});`;

  return (
    <DashboardLayout>
      <PageHeader>
        <PageTitle>Virtual Account Details</PageTitle>
        <PageSubtitle>Complete information and integration details for your virtual account</PageSubtitle>
      </PageHeader>

      <ContentGrid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <StatusBadge $status={vaData.status}>
              <FiCheckCircle />
              Active
            </StatusBadge>
          </CardHeader>

          <DetailRow>
            <DetailLabel>Virtual Account ID</DetailLabel>
            <DetailValue>
              {vaData.vaId}
              <CopyButton onClick={() => copyToClipboard(vaData.vaId, 'vaId')}>
                {copiedField === 'vaId' ? <FiCheckCircle /> : <FiCopy />}
              </CopyButton>
            </DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Account Number</DetailLabel>
            <DetailValue>
              {vaData.accountNumber}
              <CopyButton onClick={() => copyToClipboard(vaData.accountNumber, 'accountNumber')}>
                {copiedField === 'accountNumber' ? <FiCheckCircle /> : <FiCopy />}
              </CopyButton>
            </DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>IFSC Code</DetailLabel>
            <DetailValue>
              {vaData.ifscCode}
              <CopyButton onClick={() => copyToClipboard(vaData.ifscCode, 'ifsc')}>
                {copiedField === 'ifsc' ? <FiCheckCircle /> : <FiCopy />}
              </CopyButton>
            </DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Account Holder Name</DetailLabel>
            <DetailValue>{vaData.accountHolder}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>UPI ID</DetailLabel>
            <DetailValue>
              {vaData.upiId}
              <CopyButton onClick={() => copyToClipboard(vaData.upiId, 'upi')}>
                {copiedField === 'upi' ? <FiCheckCircle /> : <FiCopy />}
              </CopyButton>
            </DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Created On</DetailLabel>
            <DetailValue>{vaData.createdAt}</DetailValue>
          </DetailRow>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>

          <DetailRow>
            <DetailLabel>Current Balance</DetailLabel>
            <DetailValue style={{ fontSize: '1.25rem', color: '#4ADE80' }}>{vaData.balance}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Total Transactions</DetailLabel>
            <DetailValue>{vaData.totalTransactions}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Successful Payments</DetailLabel>
            <DetailValue>{vaData.successfulPayments}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Failed Transactions</DetailLabel>
            <DetailValue>0</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Pending Settlements</DetailLabel>
            <DetailValue>₹0.00</DetailValue>
          </DetailRow>

          <ActionButtons>
            <Button variant="primary" size="md" fullWidth>
              <FiDownload style={{ marginRight: '0.5rem' }} />
              Export Report
            </Button>
            <Button variant="outline" size="md" fullWidth>
              <FiRefreshCw style={{ marginRight: '0.5rem' }} />
              Refresh
            </Button>
          </ActionButtons>
        </Card>

        <FullWidthCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TabContainer>
            <Tab $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              Overview
            </Tab>
            <Tab $active={activeTab === 'integration'} onClick={() => setActiveTab('integration')}>
              Integration Code
            </Tab>
            <Tab $active={activeTab === 'webhooks'} onClick={() => setActiveTab('webhooks')}>
              Webhooks
            </Tab>
          </TabContainer>

          {activeTab === 'integration' && (
            <>
              <CardTitle style={{ marginBottom: '1rem' }}>Integration Code</CardTitle>
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '1rem' }}>
                Use this code snippet to integrate virtual account creation and webhook handling in your application.
              </p>
              <CodeBlock>
                <CopyCodeButton onClick={() => copyToClipboard(integrationCode, 'code')}>
                  {copiedField === 'code' ? <><FiCheckCircle /> Copied</> : <><FiCopy /> Copy</>}
                </CopyCodeButton>
                <pre>{integrationCode}</pre>
              </CodeBlock>
            </>
          )}

          {activeTab === 'overview' && (
            <>
              <CardTitle style={{ marginBottom: '1rem' }}>Recent Activity</CardTitle>
              <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9CA3AF' }}>
                <FiClock style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
                <p>No recent activity</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Transactions will appear here once you start accepting payments
                </p>
              </div>
            </>
          )}

          {activeTab === 'webhooks' && (
            <>
              <CardTitle style={{ marginBottom: '1rem' }}>Webhook Configuration</CardTitle>
              <DetailRow>
                <DetailLabel>Webhook URL</DetailLabel>
                <DetailValue>
                  https://yoursite.com/webhooks/davspay
                  <CopyButton onClick={() => copyToClipboard('https://yoursite.com/webhooks/davspay', 'webhook')}>
                    {copiedField === 'webhook' ? <FiCheckCircle /> : <FiCopy />}
                  </CopyButton>
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Last Webhook Call</DetailLabel>
                <DetailValue>Never</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Success Rate</DetailLabel>
                <DetailValue>0%</DetailValue>
              </DetailRow>
              <ActionButtons style={{ marginTop: '1.5rem' }}>
                <Button variant="outline" size="md">
                  Test Webhook
                </Button>
                <Button variant="outline" size="md">
                  View Logs
                </Button>
              </ActionButtons>
            </>
          )}
        </FullWidthCard>
      </ContentGrid>
    </DashboardLayout>
  );
}
