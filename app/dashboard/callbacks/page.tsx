'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLink, FiCheckCircle, FiXCircle, FiClock, FiCode, FiCopy, FiPlus } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderContent = styled.div``;

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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
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

const HelpText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.5rem;
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

const LogsContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const LogItem = styled.div<{ $status: string }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &:last-child {
    border-bottom: none;
  }
`;

const LogIcon = styled.div<{ $status: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $status }) => {
    switch ($status) {
      case 'success':
        return '#4ADE8020';
      case 'failed':
        return '#EF444420';
      default:
        return '#FBBF2420';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'success':
        return '#4ADE80';
      case 'failed':
        return '#EF4444';
      default:
        return '#FBBF24';
    }
  }};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LogContent = styled.div`
  flex: 1;
`;

const LogTimestamp = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LogMessage = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Generate unique hash-based secret key from account name
const generateWebhookSecret = (accountName: string): string => {
  // Simple hash function to generate consistent secret from account name
  let hash = 0;
  const saltedName = accountName + 'davspay-webhook-salt-2024';

  for (let i = 0; i < saltedName.length; i++) {
    const char = saltedName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert to hex and create a webhook secret format
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  const timestamp = Date.now().toString(36).slice(-6);
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `whsec_${hexHash}${timestamp}${randomSuffix}`.substring(0, 32);
};

export default function CallbacksPage() {
  const [copied, setCopied] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://yoursite.com/webhooks/davspay');
  const [webhookSecret, setWebhookSecret] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Generate unique secret based on user's company name or email
    if (user) {
      const accountIdentifier = user.company_name || user.email || 'default-account';
      const secret = generateWebhookSecret(accountIdentifier);
      setWebhookSecret(secret);
    }
  }, [user]);

  const sampleCode = `// Express.js Webhook Handler
const express = require('express');
const crypto = require('crypto');

app.post('/webhooks/davspay', express.json(), (req, res) => {
  const signature = req.headers['x-davspay-signature'];
  const payload = JSON.stringify(req.body);

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.DAVSPAY_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).send('Invalid signature');
  }

  // Process the webhook event
  const event = req.body;

  switch (event.type) {
    case 'payment.success':
      console.log('Payment successful:', event.data);
      // Update your database
      break;
    case 'payment.failed':
      console.log('Payment failed:', event.data);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).send('OK');
});`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <PageHeader>
        <HeaderContent>
          <PageTitle>Webhooks & Callbacks</PageTitle>
          <PageSubtitle>Configure endpoints to receive real-time payment notifications</PageSubtitle>
        </HeaderContent>
        <Button variant="primary" size="md">
          <FiPlus style={{ marginRight: '0.5rem' }} />
          Add Webhook
        </Button>
      </PageHeader>

      <StatsGrid>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatValue>0</StatValue>
          <StatLabel>Total Webhooks</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatValue>0</StatValue>
          <StatLabel>Successful</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatValue>0</StatValue>
          <StatLabel>Failed</StatLabel>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatValue>0%</StatValue>
          <StatLabel>Success Rate</StatLabel>
        </StatCard>
      </StatsGrid>

      <Card>
        <CardTitle>
          <FiLink />
          Webhook Configuration
        </CardTitle>

        <FormGroup>
          <Label>Webhook URL</Label>
          <Input
            type="url"
            placeholder="https://yoursite.com/webhooks/davspay"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <HelpText>This is the URL where Davspay will send payment notifications</HelpText>
        </FormGroup>

        <FormGroup>
          <Label>Webhook Secret</Label>
          <Input type="text" value={webhookSecret || 'whsec_********************'} readOnly />
          <HelpText>Use this secret to verify webhook signatures in your application</HelpText>
        </FormGroup>

        <Button variant="primary" size="md">
          Save Configuration
        </Button>
      </Card>

      <Card>
        <CardTitle>
          <FiCode />
          Implementation Example
        </CardTitle>
        <CodeBlock>
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
          <pre>{sampleCode}</pre>
        </CodeBlock>
      </Card>

      <Card>
        <CardTitle>Recent Webhook Calls</CardTitle>
        <EmptyState>
          <FiClock style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p>No webhook calls yet</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Webhook events will appear here once you start receiving payments
          </p>
        </EmptyState>
      </Card>
    </DashboardLayout>
  );
}
