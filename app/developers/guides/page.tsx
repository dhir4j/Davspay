'use client';

import styled from 'styled-components';
import { FiCheckCircle, FiClock, FiCode } from 'react-icons/fi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

const GuidesPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  padding-top: calc(${({ theme }) => theme.spacing.xl} + 70px);
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
`;

const GuideCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GuideTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StepContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const Step = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-left: ${({ theme }) => theme.spacing.xl};
  position: relative;

  &::before {
    content: attr(data-step);
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 0.875rem;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  overflow-x: auto;
`;

const Code = styled.pre`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  .keyword { color: #C792EA; }
  .string { color: #C3E88D; }
  .comment { color: #546E7A; font-style: italic; }
  .function { color: #82AAFF; }
  .number { color: #F78C6C; }
  .property { color: #FFCB6B; }
`;

const InfoBox = styled.div<{ $type?: 'info' | 'warning' | 'success' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-left: 4px solid;

  ${({ $type, theme }) => {
    switch ($type) {
      case 'warning':
        return `
          background: #FEF3C7;
          border-color: #F59E0B;
          color: #92400E;
        `;
      case 'success':
        return `
          background: #D1FAE5;
          border-color: #10B981;
          color: #065F46;
        `;
      default:
        return `
          background: ${theme.colors.primary}20;
          border-color: ${theme.colors.primary};
          color: ${theme.colors.text};
        `;
    }
  }}

  strong {
    font-weight: 700;
  }
`;

const List = styled.ul`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;

  li {
    margin-bottom: 0.5rem;
  }
`;

export default function IntegrationGuides() {
  return (
    <GuidesPage>
      <Navbar />

      <HeroSection>
        <Container>
          <PageTitle>Integration Guides</PageTitle>
          <PageSubtitle>
            Step-by-step guides to integrate Davspay into your application
          </PageSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          {/* Quick Start Guide */}
          <GuideCard variant="glass">
            <GuideTitle>
              <FiCheckCircle />
              Quick Start Guide
            </GuideTitle>
            <StepDescription>
              Get started with Davspay in under 10 minutes. This guide will walk you through
              creating your first payment integration.
            </StepDescription>

            <StepContainer>
              <Step data-step="1">
                <StepTitle>Create Your Account</StepTitle>
                <StepDescription>
                  Sign up for a Davspay account at <a href="https://dashboard.davspaysolution.com/register">dashboard.davspaysolution.com</a>.
                  You'll receive instant access to your test API keys.
                </StepDescription>
              </Step>

              <Step data-step="2">
                <StepTitle>Get Your API Keys</StepTitle>
                <StepDescription>
                  Navigate to Settings → API Keys in your dashboard. You'll see two sets of keys:
                </StepDescription>
                <List>
                  <li><strong>Test Keys:</strong> For development and testing (begins with test_)</li>
                  <li><strong>Live Keys:</strong> For production use (begins with live_)</li>
                </List>
                <InfoBox $type="warning">
                  <strong>Important:</strong> Never expose your API keys in client-side code or public repositories.
                  Always use them server-side only.
                </InfoBox>
              </Step>

              <Step data-step="3">
                <StepTitle>Install the SDK</StepTitle>
                <StepDescription>
                  Install the Davspay SDK for your preferred language:
                </StepDescription>
                <CodeBlock>
                  <Code>{`# Node.js
npm install @davspay/node-sdk

# Python
pip install davspay

# PHP
composer require davspay/sdk`}</Code>
                </CodeBlock>
              </Step>

              <Step data-step="4">
                <StepTitle>Create Your First Payment</StepTitle>
                <StepDescription>
                  Initialize the SDK and create a payment:
                </StepDescription>
                <CodeBlock>
                  <Code>{`const Davspay = require('@davspay/node-sdk');

// Initialize with your test API key
const davspay = new Davspay({
  apiKey: 'test_your_key_here',
  environment: 'sandbox'
});

// Create a payment
const payment = await davspay.payments.create({
  amount: 100000, // ₹1000 in paise
  currency: 'INR',
  customer: {
    email: 'customer@example.com',
    phone: '+919876543210',
    name: 'John Doe'
  },
  description: 'Test Payment',
  callback_url: 'https://yoursite.com/callback'
});

// Redirect customer to payment URL
console.log(payment.payment_url);</Code>
                </CodeBlock>
              </Step>

              <Step data-step="5">
                <StepTitle>Handle Payment Callback</StepTitle>
                <StepDescription>
                  After payment, the customer will be redirected to your callback_url with payment status:
                </StepDescription>
                <CodeBlock>
                  <Code>{`app.get('/callback', async (req, res) => {
  const { payment_id, status } = req.query;

  // Verify payment status from our server
  const payment = await davspay.payments.retrieve(payment_id);

  if (payment.status === 'captured') {
    // Payment successful - update your database
    res.send('Payment successful!');
  } else {
    // Payment failed or pending
    res.send('Payment failed or pending');
  }
});</Code>
                </CodeBlock>
              </Step>
            </StepContainer>

            <InfoBox $type="success">
              <strong>Congratulations!</strong> You've successfully integrated Davspay payments.
              Test your integration thoroughly before going live.
            </InfoBox>
          </GuideCard>

          {/* Webhook Integration */}
          <GuideCard variant="glass">
            <GuideTitle>
              <FiClock />
              Webhook Integration
            </GuideTitle>
            <StepDescription>
              Webhooks allow you to receive real-time notifications about payment events.
              This is the recommended way to handle payment confirmations.
            </StepDescription>

            <StepContainer>
              <Step data-step="1">
                <StepTitle>Configure Webhook URL</StepTitle>
                <StepDescription>
                  In your Davspay dashboard, go to Settings → Webhooks and add your webhook endpoint URL.
                  This should be a POST endpoint on your server that can receive JSON payloads.
                </StepDescription>
                <InfoBox>
                  <strong>Example:</strong> https://yoursite.com/webhooks/davspay
                </InfoBox>
              </Step>

              <Step data-step="2">
                <StepTitle>Implement Webhook Handler</StepTitle>
                <StepDescription>
                  Create an endpoint to receive webhook notifications:
                </StepDescription>
                <CodeBlock>
                  <Code>{`const express = require('express');
const app = express();

app.post('/webhooks/davspay',
  express.json(),
  async (req, res) => {
    // Get signature from headers
    const signature = req.headers['x-davspay-signature'];

    // Verify webhook signature
    const isValid = davspay.webhooks.verify(
      req.body,
      signature,
      process.env.WEBHOOK_SECRET
    );

    if (!isValid) {
      return res.status(400).send('Invalid signature');
    }

    // Process webhook event
    const { event, data } = req.body;

    switch (event) {
      case 'payment.captured':
        // Payment successful
        await handleSuccessfulPayment(data);
        break;

      case 'payment.failed':
        // Payment failed
        await handleFailedPayment(data);
        break;

      case 'refund.completed':
        // Refund processed
        await handleRefund(data);
        break;
    }

    // Return 200 to acknowledge receipt
    res.status(200).send('OK');
  }
);</Code>
                </CodeBlock>
              </Step>

              <Step data-step="3">
                <StepTitle>Test Your Webhooks</StepTitle>
                <StepDescription>
                  Use the webhook testing tool in your dashboard to send test events to your endpoint.
                  This helps you verify your integration before going live.
                </StepDescription>
              </Step>
            </StepContainer>

            <InfoBox $type="info">
              <strong>Best Practice:</strong> Always verify webhook signatures to ensure requests are coming from Davspay.
              Store webhook events in your database for audit trails and debugging.
            </InfoBox>
          </GuideCard>

          {/* Production Checklist */}
          <GuideCard variant="glass">
            <GuideTitle>
              <FiCode />
              Production Checklist
            </GuideTitle>
            <StepDescription>
              Before going live, make sure you've completed these essential steps:
            </StepDescription>

            <List style={{ paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Switch to Live API Keys:</strong> Replace test keys with live keys from your dashboard
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Complete KYC:</strong> Submit your business documents for verification
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Enable HTTPS:</strong> All production integrations must use HTTPS
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Set Up Webhooks:</strong> Configure production webhook endpoints
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Test Error Scenarios:</strong> Handle failed payments, network errors, and timeouts
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Set Up Monitoring:</strong> Implement logging and monitoring for payment flows
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FiCheckCircle style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                <div>
                  <strong>Security Review:</strong> Never expose API keys, validate all webhooks, use HTTPS
                </div>
              </li>
            </List>

            <InfoBox $type="success">
              <strong>Need Help?</strong> Our support team is available 24/7 at support@davspaysolution.com
              or call +91 97588 13335 for immediate assistance.
            </InfoBox>
          </GuideCard>
        </Container>
      </ContentSection>

      <Footer />
    </GuidesPage>
  );
}
