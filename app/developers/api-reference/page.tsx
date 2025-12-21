'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

const APIPage = styled.div`
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
  max-width: 1400px;
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 100px;
  height: fit-content;

  @media (max-width: 968px) {
    position: static;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SidebarTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SidebarLink = styled.a<{ $active?: boolean }>`
  display: block;
  padding: 0.5rem 0.75rem;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  border-left: 2px solid ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
  font-size: 0.875rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(3px);
  }
`;

const MainContent = styled.div``;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
`;

const Endpoint = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const EndpointHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const Method = styled.span<{ $method: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 700;
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.mono};

  ${({ $method, theme }) => {
    switch ($method) {
      case 'POST':
        return `background: #10B981; color: white;`;
      case 'GET':
        return `background: #3B82F6; color: white;`;
      case 'PUT':
        return `background: #F59E0B; color: white;`;
      case 'DELETE':
        return `background: #EF4444; color: white;`;
      default:
        return `background: ${theme.colors.surface}; color: ${theme.colors.text};`;
    }
  }}
`;

const EndpointPath = styled.code`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
`;

const EndpointDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SubSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SubSectionTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const CodeBlock = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  overflow-x: auto;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
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
  .property { color: #82AAFF; }
  .number { color: #F78C6C; }
  .boolean { color: #FF5370; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    padding: 0.125rem 0.375rem;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span<{ $type?: string }>`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $type, theme }) => {
    switch ($type) {
      case 'required':
        return `background: #FEE2E2; color: #991B1B;`;
      case 'optional':
        return `background: ${theme.colors.primary}20; color: ${theme.colors.primary};`;
      default:
        return `background: ${theme.colors.surface}; color: ${theme.colors.text};`;
    }
  }}
`;

const CodeBlockWithCopy: React.FC<{ code: string; children: React.ReactNode }> = ({ code, children }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeBlock>
      <CopyButton onClick={copyToClipboard}>
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </CopyButton>
      <Code>{children}</Code>
    </CodeBlock>
  );
};

export default function APIReference() {
  return (
    <APIPage>
      <Navbar />

      <HeroSection>
        <Container>
          <PageTitle>API Reference</PageTitle>
          <PageSubtitle>
            Complete REST API documentation for Davspay payment gateway
          </PageSubtitle>
        </Container>
      </HeroSection>

      <ContentWrapper>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Getting Started</SidebarTitle>
            <SidebarLink href="#authentication" $active>Authentication</SidebarLink>
            <SidebarLink href="#errors">Error Handling</SidebarLink>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Endpoints</SidebarTitle>
            <SidebarLink href="#payments">Payments</SidebarLink>
            <SidebarLink href="#refunds">Refunds</SidebarLink>
            <SidebarLink href="#customers">Customers</SidebarLink>
            <SidebarLink href="#webhooks">Webhooks</SidebarLink>
          </SidebarSection>
        </Sidebar>

        <MainContent>
          <Section id="authentication">
            <SectionTitle>Authentication</SectionTitle>
            <Endpoint variant="glass">
              <EndpointDescription>
                All API requests must be authenticated using your API key. Include it in the Authorization header:
              </EndpointDescription>
              <CodeBlockWithCopy code="Authorization: Bearer your_api_key_here">
                {`<span class="property">Authorization</span>: <span class="keyword">Bearer</span> <span class="string">your_api_key_here</span>`}
              </CodeBlockWithCopy>
              <EndpointDescription>
                <strong>Base URL:</strong> <code>https://api.davspaysolution.com/v1</code>
              </EndpointDescription>
              <EndpointDescription>
                You can get your API keys from the <a href="#">Dashboard</a> under Settings → API Keys.
                Keep your API keys secure and never expose them in client-side code.
              </EndpointDescription>
            </Endpoint>
          </Section>

          <Section id="payments">
            <SectionTitle>Payments</SectionTitle>

            <Endpoint variant="glass">
              <EndpointHeader>
                <Method $method="POST">POST</Method>
                <EndpointPath>/payments</EndpointPath>
              </EndpointHeader>
              <EndpointDescription>
                Create a new payment. Returns a payment object with payment URL for customer checkout.
              </EndpointDescription>

              <SubSection>
                <SubSectionTitle>Request Body</SubSectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Parameter</Th>
                      <Th>Type</Th>
                      <Th>Required</Th>
                      <Th>Description</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td><code>amount</code></Td>
                      <Td>integer</Td>
                      <Td><Badge $type="required">Required</Badge></Td>
                      <Td>Amount in paise (e.g., 1000 for ₹10)</Td>
                    </tr>
                    <tr>
                      <Td><code>currency</code></Td>
                      <Td>string</Td>
                      <Td><Badge $type="required">Required</Badge></Td>
                      <Td>Three-letter ISO currency code (INR)</Td>
                    </tr>
                    <tr>
                      <Td><code>customer</code></Td>
                      <Td>object</Td>
                      <Td><Badge $type="required">Required</Badge></Td>
                      <Td>Customer information (email, phone, name)</Td>
                    </tr>
                    <tr>
                      <Td><code>description</code></Td>
                      <Td>string</Td>
                      <Td><Badge $type="optional">Optional</Badge></Td>
                      <Td>Description of the payment</Td>
                    </tr>
                    <tr>
                      <Td><code>callback_url</code></Td>
                      <Td>string</Td>
                      <Td><Badge $type="required">Required</Badge></Td>
                      <Td>URL to redirect after payment</Td>
                    </tr>
                    <tr>
                      <Td><code>metadata</code></Td>
                      <Td>object</Td>
                      <Td><Badge $type="optional">Optional</Badge></Td>
                      <Td>Custom metadata (max 50 key-value pairs)</Td>
                    </tr>
                  </tbody>
                </Table>
              </SubSection>

              <SubSection>
                <SubSectionTitle>Example Request</SubSectionTitle>
                <CodeBlockWithCopy code={`curl -X POST https://api.davspaysolution.com/v1/payments \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100000,
    "currency": "INR",
    "customer": {
      "email": "customer@example.com",
      "phone": "+919876543210",
      "name": "John Doe"
    },
    "description": "Payment for Order #12345",
    "callback_url": "https://yoursite.com/payment/success",
    "metadata": {
      "order_id": "12345",
      "product_name": "Premium Plan"
    }
  }'`}>
                  {`curl -X POST https://api.davspaysolution.com/v1/payments \\
  -H <span class="string">"Authorization: Bearer your_api_key_here"</span> \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "amount": 100000,
    "currency": "INR",
    "customer": {
      "email": "customer@example.com",
      "phone": "+919876543210",
      "name": "John Doe"
    },
    "description": "Payment for Order #12345",
    "callback_url": "https://yoursite.com/payment/success",
    "metadata": {
      "order_id": "12345",
      "product_name": "Premium Plan"
    }
  }'</span>`}
                </CodeBlockWithCopy>
              </SubSection>

              <SubSection>
                <SubSectionTitle>Example Response</SubSectionTitle>
                <CodeBlockWithCopy code={`{
  "id": "pay_1234567890abcdef",
  "object": "payment",
  "amount": 100000,
  "currency": "INR",
  "status": "created",
  "customer": {
    "email": "customer@example.com",
    "phone": "+919876543210",
    "name": "John Doe"
  },
  "description": "Payment for Order #12345",
  "payment_url": "https://checkout.davspaysolution.com/pay/1234567890abcdef",
  "callback_url": "https://yoursite.com/payment/success",
  "created_at": "2024-12-09T12:00:00Z",
  "metadata": {
    "order_id": "12345",
    "product_name": "Premium Plan"
  }
}`}>
                  {`{
  <span class="property">"id"</span>: <span class="string">"pay_1234567890abcdef"</span>,
  <span class="property">"object"</span>: <span class="string">"payment"</span>,
  <span class="property">"amount"</span>: <span class="number">100000</span>,
  <span class="property">"currency"</span>: <span class="string">"INR"</span>,
  <span class="property">"status"</span>: <span class="string">"created"</span>,
  <span class="property">"customer"</span>: {
    <span class="property">"email"</span>: <span class="string">"customer@example.com"</span>,
    <span class="property">"phone"</span>: <span class="string">"+919876543210"</span>,
    <span class="property">"name"</span>: <span class="string">"John Doe"</span>
  },
  <span class="property">"description"</span>: <span class="string">"Payment for Order #12345"</span>,
  <span class="property">"payment_url"</span>: <span class="string">"https://checkout.davspaysolution.com/pay/1234567890abcdef"</span>,
  <span class="property">"callback_url"</span>: <span class="string">"https://yoursite.com/payment/success"</span>,
  <span class="property">"created_at"</span>: <span class="string">"2024-12-09T12:00:00Z"</span>,
  <span class="property">"metadata"</span>: {
    <span class="property">"order_id"</span>: <span class="string">"12345"</span>,
    <span class="property">"product_name"</span>: <span class="string">"Premium Plan"</span>
  }
}`}
                </CodeBlockWithCopy>
              </SubSection>
            </Endpoint>

            <Endpoint variant="glass">
              <EndpointHeader>
                <Method $method="GET">GET</Method>
                <EndpointPath>/payments/:id</EndpointPath>
              </EndpointHeader>
              <EndpointDescription>
                Retrieve details of a specific payment by its ID.
              </EndpointDescription>

              <SubSection>
                <SubSectionTitle>Example Request</SubSectionTitle>
                <CodeBlockWithCopy code={`curl -X GET https://api.davspaysolution.com/v1/payments/pay_1234567890abcdef \\
  -H "Authorization: Bearer your_api_key_here"`}>
                  {`curl -X GET https://api.davspaysolution.com/v1/payments/pay_1234567890abcdef \\
  -H <span class="string">"Authorization: Bearer your_api_key_here"</span>`}
                </CodeBlockWithCopy>
              </SubSection>

              <SubSection>
                <SubSectionTitle>Payment Status Values</SubSectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Status</Th>
                      <Th>Description</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td><code>created</code></Td>
                      <Td>Payment created, awaiting customer action</Td>
                    </tr>
                    <tr>
                      <Td><code>pending</code></Td>
                      <Td>Payment initiated by customer</Td>
                    </tr>
                    <tr>
                      <Td><code>authorized</code></Td>
                      <Td>Payment authorized, awaiting capture</Td>
                    </tr>
                    <tr>
                      <Td><code>captured</code></Td>
                      <Td>Payment successfully captured</Td>
                    </tr>
                    <tr>
                      <Td><code>failed</code></Td>
                      <Td>Payment failed</Td>
                    </tr>
                    <tr>
                      <Td><code>cancelled</code></Td>
                      <Td>Payment cancelled by customer or merchant</Td>
                    </tr>
                  </tbody>
                </Table>
              </SubSection>
            </Endpoint>
          </Section>

          <Section id="refunds">
            <SectionTitle>Refunds</SectionTitle>

            <Endpoint variant="glass">
              <EndpointHeader>
                <Method $method="POST">POST</Method>
                <EndpointPath>/refunds</EndpointPath>
              </EndpointHeader>
              <EndpointDescription>
                Initiate a refund for a captured payment. Partial and full refunds are supported.
              </EndpointDescription>

              <SubSection>
                <SubSectionTitle>Request Body</SubSectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Parameter</Th>
                      <Th>Type</Th>
                      <Th>Required</Th>
                      <Th>Description</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td><code>payment_id</code></Td>
                      <Td>string</Td>
                      <Td><Badge $type="required">Required</Badge></Td>
                      <Td>ID of the payment to refund</Td>
                    </tr>
                    <tr>
                      <Td><code>amount</code></Td>
                      <Td>integer</Td>
                      <Td><Badge $type="optional">Optional</Badge></Td>
                      <Td>Amount to refund (defaults to full amount)</Td>
                    </tr>
                    <tr>
                      <Td><code>reason</code></Td>
                      <Td>string</Td>
                      <Td><Badge $type="optional">Optional</Badge></Td>
                      <Td>Reason for refund</Td>
                    </tr>
                  </tbody>
                </Table>
              </SubSection>
            </Endpoint>
          </Section>

          <Section id="webhooks">
            <SectionTitle>Webhooks</SectionTitle>

            <Endpoint variant="glass">
              <EndpointDescription>
                Webhooks allow you to receive real-time notifications about payment events.
                Configure your webhook URL in the Dashboard under Settings → Webhooks.
              </EndpointDescription>

              <SubSection>
                <SubSectionTitle>Webhook Events</SubSectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Event</Th>
                      <Th>Description</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td><code>payment.created</code></Td>
                      <Td>Payment object created</Td>
                    </tr>
                    <tr>
                      <Td><code>payment.captured</code></Td>
                      <Td>Payment successfully captured</Td>
                    </tr>
                    <tr>
                      <Td><code>payment.failed</code></Td>
                      <Td>Payment failed</Td>
                    </tr>
                    <tr>
                      <Td><code>refund.created</code></Td>
                      <Td>Refund initiated</Td>
                    </tr>
                    <tr>
                      <Td><code>refund.completed</code></Td>
                      <Td>Refund completed successfully</Td>
                    </tr>
                  </tbody>
                </Table>
              </SubSection>

              <SubSection>
                <SubSectionTitle>Webhook Payload Example</SubSectionTitle>
                <CodeBlockWithCopy code={`{
  "event": "payment.captured",
  "timestamp": "2024-12-09T12:00:00Z",
  "data": {
    "id": "pay_1234567890abcdef",
    "amount": 100000,
    "currency": "INR",
    "status": "captured",
    "customer": {
      "email": "customer@example.com",
      "phone": "+919876543210"
    }
  }
}`}>
                  {`{
  <span class="property">"event"</span>: <span class="string">"payment.captured"</span>,
  <span class="property">"timestamp"</span>: <span class="string">"2024-12-09T12:00:00Z"</span>,
  <span class="property">"data"</span>: {
    <span class="property">"id"</span>: <span class="string">"pay_1234567890abcdef"</span>,
    <span class="property">"amount"</span>: <span class="number">100000</span>,
    <span class="property">"currency"</span>: <span class="string">"INR"</span>,
    <span class="property">"status"</span>: <span class="string">"captured"</span>,
    <span class="property">"customer"</span>: {
      <span class="property">"email"</span>: <span class="string">"customer@example.com"</span>,
      <span class="property">"phone"</span>: <span class="string">"+919876543210"</span>
    }
  }
}`}
                </CodeBlockWithCopy>
              </SubSection>
            </Endpoint>
          </Section>
        </MainContent>
      </ContentWrapper>

      <Footer />
    </APIPage>
  );
}
