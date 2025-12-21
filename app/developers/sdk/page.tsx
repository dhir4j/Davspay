'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiGithub, FiDownload, FiBook } from 'react-icons/fi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const SDKPage = styled.div`
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

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const LanguageCard = styled(Card)`
  text-align: center;
  cursor: pointer;
`;

const LanguageIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.md} auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
`;

const LanguageName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const LanguageVersion = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.875rem;
`;

const TabContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const TabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm} ${({ theme }) => theme.borderRadius.sm} 0 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.primary}20;
  }
`;

const TabContent = styled.div``;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const CodeBlock = styled.div`
  position: relative;
  background: ${({ theme }) => theme.name === 'dark' ? '#1E1E2E' : '#F8F9FA'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}20;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.name === 'dark' ? '#181825' : '#E9ECEF'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CodeLanguage = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.5px;
`;

const CopyButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: ${({ theme }) => theme.colors.primary}20;
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}30;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const CodeContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background}40;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}40;
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary}60;
    }
  }
`;

const Code = styled.pre`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.875rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  white-space: pre;

  .keyword {
    color: ${({ theme }) => theme.name === 'dark' ? '#C792EA' : '#A626A4'};
    font-weight: 600;
  }
  .string {
    color: ${({ theme }) => theme.name === 'dark' ? '#C3E88D' : '#50A14F'};
  }
  .comment {
    color: ${({ theme }) => theme.name === 'dark' ? '#738A9C' : '#A0A1A7'};
    font-style: italic;
  }
  .function {
    color: ${({ theme }) => theme.name === 'dark' ? '#82AAFF' : '#4078F2'};
  }
  .number {
    color: ${({ theme }) => theme.name === 'dark' ? '#F78C6C' : '#E45649'};
  }
  .property {
    color: ${({ theme }) => theme.name === 'dark' ? '#FFCB6B' : '#C18401'};
  }
  .operator {
    color: ${({ theme }) => theme.name === 'dark' ? '#89DDFF' : '#0184BC'};
  }
  .variable {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

interface CodeBlockComponentProps {
  code: string;
  language: string;
}

const CodeBlockComponent = ({ code, language }: CodeBlockComponentProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Remove HTML tags for copying plain text
    const plainText = code.replace(/<[^>]*>/g, '');
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeBlock>
      <CodeHeader>
        <CodeLanguage>{language}</CodeLanguage>
        <CopyButton
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <FiCheck /> Copied!
            </>
          ) : (
            <>
              <FiCopy /> Copy
            </>
          )}
        </CopyButton>
      </CodeHeader>
      <CodeContent>
        <Code dangerouslySetInnerHTML={{ __html: code }} />
      </CodeContent>
    </CodeBlock>
  );
};

export default function SDK() {
  const [activeTab, setActiveTab] = useState('nodejs');

  const languages = [
    { name: 'Node.js', version: 'v2.1.0', icon: '⬢', package: '@davspay/node-sdk' },
    { name: 'Python', version: 'v2.0.5', icon: '🐍', package: 'davspay' },
    { name: 'PHP', version: 'v1.8.3', icon: '🐘', package: 'davspay/sdk' },
    { name: 'Java', version: 'v1.7.2', icon: '☕', package: 'com.davspay:sdk' },
    { name: 'Ruby', version: 'v1.5.1', icon: '💎', package: 'davspay' },
    { name: 'Go', version: 'v1.4.0', icon: '🐹', package: 'github.com/davspay/go-sdk' },
  ];

  const tabs = [
    { id: 'nodejs', label: 'Node.js' },
    { id: 'python', label: 'Python' },
    { id: 'php', label: 'PHP' },
    { id: 'java', label: 'Java' },
  ];

  const getSDKContent = () => {
    switch (activeTab) {
      case 'nodejs':
        return (
          <>
            <Section>
              <SectionTitle>Installation</SectionTitle>
              <Description>Install the Davspay Node.js SDK using npm or yarn:</Description>
              <CodeBlockComponent
                language="bash"
                code={`npm install @davspay/node-sdk
<span class="comment"># or</span>
yarn add @davspay/node-sdk`}
              />
            </Section>

            <Section>
              <SectionTitle>Quick Start</SectionTitle>
              <Description>Initialize the SDK and create your first payment:</Description>
              <CodeBlockComponent
                language="javascript"
                code={`<span class="keyword">const</span> <span class="function">Davspay</span> <span class="operator">=</span> <span class="function">require</span>(<span class="string">'@davspay/node-sdk'</span>);

<span class="comment">// Initialize the client with your API key</span>
<span class="keyword">const</span> <span class="variable">davspay</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="function">Davspay</span>({
  apiKey: <span class="string">'your_api_key_here'</span>,
  environment: <span class="string">'production'</span> <span class="comment">// or 'sandbox' for testing</span>
});`}
              />
            </Section>

            <Section>
              <SectionTitle>Create a Payment</SectionTitle>
              <Description>Create a new payment request with customer details:</Description>
              <CodeBlockComponent
                language="javascript"
                code={`<span class="keyword">async function</span> <span class="function">createPayment</span>() {
  <span class="keyword">try</span> {
    <span class="keyword">const</span> <span class="variable">payment</span> <span class="operator">=</span> <span class="keyword">await</span> davspay.payments.<span class="function">create</span>({
      amount: <span class="number">100000</span>, <span class="comment">// Amount in paise (₹1000.00)</span>
      currency: <span class="string">'INR'</span>,
      customer: {
        email: <span class="string">'customer@example.com'</span>,
        phone: <span class="string">'+919876543210'</span>,
        name: <span class="string">'John Doe'</span>
      },
      description: <span class="string">'Payment for Order #12345'</span>,
      callback_url: <span class="string">'https://yoursite.com/payment/callback'</span>,
      metadata: {
        order_id: <span class="string">'12345'</span>,
        source: <span class="string">'web'</span>
      }
    });

    console.<span class="function">log</span>(<span class="string">'Payment ID:'</span>, payment.id);
    console.<span class="function">log</span>(<span class="string">'Payment URL:'</span>, payment.payment_url);

    <span class="keyword">return</span> payment;
  } <span class="keyword">catch</span> (error) {
    console.<span class="function">error</span>(<span class="string">'Error:'</span>, error.message);
    <span class="keyword">throw</span> error;
  }
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Retrieve Payment Status</SectionTitle>
              <Description>Check the status of an existing payment:</Description>
              <CodeBlockComponent
                language="javascript"
                code={`<span class="keyword">async function</span> <span class="function">getPaymentStatus</span>(paymentId) {
  <span class="keyword">try</span> {
    <span class="keyword">const</span> <span class="variable">payment</span> <span class="operator">=</span> <span class="keyword">await</span> davspay.payments.<span class="function">retrieve</span>(paymentId);

    console.<span class="function">log</span>(<span class="string">'Status:'</span>, payment.status);
    console.<span class="function">log</span>(<span class="string">'Amount:'</span>, payment.amount);
    console.<span class="function">log</span>(<span class="string">'Created:'</span>, <span class="keyword">new</span> <span class="function">Date</span>(payment.created_at));

    <span class="keyword">return</span> payment;
  } <span class="keyword">catch</span> (error) {
    console.<span class="function">error</span>(<span class="string">'Error:'</span>, error.message);
  }
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Process Refunds</SectionTitle>
              <Description>Issue full or partial refunds to customers:</Description>
              <CodeBlockComponent
                language="javascript"
                code={`<span class="keyword">async function</span> <span class="function">processRefund</span>(paymentId, amount) {
  <span class="keyword">try</span> {
    <span class="keyword">const</span> <span class="variable">refund</span> <span class="operator">=</span> <span class="keyword">await</span> davspay.refunds.<span class="function">create</span>({
      payment_id: paymentId,
      amount: amount, <span class="comment">// Amount in paise (omit for full refund)</span>
      reason: <span class="string">'Customer requested refund'</span>,
      notes: {
        refund_type: <span class="string">'partial'</span>
      }
    });

    console.<span class="function">log</span>(<span class="string">'Refund ID:'</span>, refund.id);
    console.<span class="function">log</span>(<span class="string">'Refund Status:'</span>, refund.status);

    <span class="keyword">return</span> refund;
  } <span class="keyword">catch</span> (error) {
    console.<span class="function">error</span>(<span class="string">'Refund Error:'</span>, error.message);
  }
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Webhook Integration</SectionTitle>
              <Description>Verify and process webhook events securely:</Description>
              <CodeBlockComponent
                language="javascript"
                code={`<span class="keyword">const</span> <span class="variable">express</span> <span class="operator">=</span> <span class="function">require</span>(<span class="string">'express'</span>);
<span class="keyword">const</span> <span class="variable">app</span> <span class="operator">=</span> <span class="function">express</span>();

app.<span class="function">post</span>(<span class="string">'/webhooks/davspay'</span>, express.<span class="function">json</span>(), (req, res) <span class="operator">=></span> {
  <span class="keyword">const</span> <span class="variable">signature</span> <span class="operator">=</span> req.headers[<span class="string">'x-davspay-signature'</span>];
  <span class="keyword">const</span> <span class="variable">payload</span> <span class="operator">=</span> req.body;

  <span class="comment">// Verify webhook authenticity</span>
  <span class="keyword">const</span> <span class="variable">isValid</span> <span class="operator">=</span> davspay.webhooks.<span class="function">verify</span>(
    payload,
    signature,
    process.env.DAVSPAY_WEBHOOK_SECRET
  );

  <span class="keyword">if</span> (!isValid) {
    <span class="keyword">return</span> res.<span class="function">status</span>(<span class="number">400</span>).<span class="function">json</span>({ error: <span class="string">'Invalid signature'</span> });
  }

  <span class="comment">// Handle different event types</span>
  <span class="keyword">switch</span> (payload.event) {
    <span class="keyword">case</span> <span class="string">'payment.success'</span>:
      console.<span class="function">log</span>(<span class="string">'Payment successful:'</span>, payload.data.id);
      <span class="comment">// Update order status, send confirmation email, etc.</span>
      <span class="keyword">break</span>;

    <span class="keyword">case</span> <span class="string">'payment.failed'</span>:
      console.<span class="function">log</span>(<span class="string">'Payment failed:'</span>, payload.data.id);
      <span class="comment">// Notify customer, retry payment, etc.</span>
      <span class="keyword">break</span>;

    <span class="keyword">case</span> <span class="string">'refund.processed'</span>:
      console.<span class="function">log</span>(<span class="string">'Refund processed:'</span>, payload.data.id);
      <span class="comment">// Update accounting records</span>
      <span class="keyword">break</span>;
  }

  res.<span class="function">status</span>(<span class="number">200</span>).<span class="function">json</span>({ received: <span class="keyword">true</span> });
});

app.<span class="function">listen</span>(<span class="number">3000</span>, () <span class="operator">=></span> console.<span class="function">log</span>(<span class="string">'Server running on port 3000'</span>));`}
              />
            </Section>
          </>
        );

      case 'python':
        return (
          <>
            <Section>
              <SectionTitle>Installation</SectionTitle>
              <Description>Install the Davspay Python SDK using pip:</Description>
              <CodeBlockComponent
                language="bash"
                code={`pip install davspay

<span class="comment"># For Python 3.6+</span>
pip3 install davspay`}
              />
            </Section>

            <Section>
              <SectionTitle>Quick Start</SectionTitle>
              <Description>Initialize the client and start accepting payments:</Description>
              <CodeBlockComponent
                language="python"
                code={`<span class="keyword">import</span> davspay

<span class="comment"># Initialize the Davspay client</span>
<span class="variable">client</span> <span class="operator">=</span> davspay.<span class="function">Client</span>(
    api_key<span class="operator">=</span><span class="string">'your_api_key_here'</span>,
    environment<span class="operator">=</span><span class="string">'production'</span>  <span class="comment"># or 'sandbox' for testing</span>
)`}
              />
            </Section>

            <Section>
              <SectionTitle>Create a Payment</SectionTitle>
              <Description>Generate a payment request with customer information:</Description>
              <CodeBlockComponent
                language="python"
                code={`<span class="keyword">def</span> <span class="function">create_payment</span>():
    <span class="keyword">try</span>:
        <span class="variable">payment</span> <span class="operator">=</span> client.payments.<span class="function">create</span>(
            amount<span class="operator">=</span><span class="number">100000</span>,  <span class="comment"># Amount in paise (₹1000.00)</span>
            currency<span class="operator">=</span><span class="string">'INR'</span>,
            customer<span class="operator">=</span>{
                <span class="string">'email'</span>: <span class="string">'customer@example.com'</span>,
                <span class="string">'phone'</span>: <span class="string">'+919876543210'</span>,
                <span class="string">'name'</span>: <span class="string">'John Doe'</span>
            },
            description<span class="operator">=</span><span class="string">'Payment for Order #12345'</span>,
            callback_url<span class="operator">=</span><span class="string">'https://yoursite.com/payment/callback'</span>,
            metadata<span class="operator">=</span>{
                <span class="string">'order_id'</span>: <span class="string">'12345'</span>,
                <span class="string">'source'</span>: <span class="string">'web'</span>
            }
        )

        <span class="function">print</span>(<span class="string">f'Payment ID: {payment.id}'</span>)
        <span class="function">print</span>(<span class="string">f'Payment URL: {payment.payment_url}'</span>)

        <span class="keyword">return</span> payment

    <span class="keyword">except</span> davspay.DavspayError <span class="keyword">as</span> e:
        <span class="function">print</span>(<span class="string">f'Error: {e.message}'</span>)
        <span class="keyword">raise</span>`}
              />
            </Section>

            <Section>
              <SectionTitle>Retrieve Payment Status</SectionTitle>
              <Description>Fetch payment details and check status:</Description>
              <CodeBlockComponent
                language="python"
                code={`<span class="keyword">def</span> <span class="function">get_payment_status</span>(payment_id: <span class="function">str</span>):
    <span class="keyword">try</span>:
        <span class="variable">payment</span> <span class="operator">=</span> client.payments.<span class="function">retrieve</span>(payment_id)

        <span class="function">print</span>(<span class="string">f'Status: {payment.status}'</span>)
        <span class="function">print</span>(<span class="string">f'Amount: ₹{payment.amount / 100}'</span>)
        <span class="function">print</span>(<span class="string">f'Customer: {payment.customer.name}'</span>)

        <span class="keyword">return</span> payment

    <span class="keyword">except</span> davspay.DavspayError <span class="keyword">as</span> e:
        <span class="function">print</span>(<span class="string">f'Error: {e.message}'</span>)`}
              />
            </Section>

            <Section>
              <SectionTitle>Process Refunds</SectionTitle>
              <Description>Issue refunds with ease:</Description>
              <CodeBlockComponent
                language="python"
                code={`<span class="keyword">def</span> <span class="function">process_refund</span>(payment_id: <span class="function">str</span>, amount: <span class="function">int</span> <span class="operator">=</span> <span class="keyword">None</span>):
    <span class="keyword">try</span>:
        <span class="variable">refund</span> <span class="operator">=</span> client.refunds.<span class="function">create</span>(
            payment_id<span class="operator">=</span>payment_id,
            amount<span class="operator">=</span>amount,  <span class="comment"># Omit for full refund</span>
            reason<span class="operator">=</span><span class="string">'Customer requested refund'</span>,
            notes<span class="operator">=</span>{
                <span class="string">'refund_type'</span>: <span class="string">'partial'</span> <span class="keyword">if</span> amount <span class="keyword">else</span> <span class="string">'full'</span>
            }
        )

        <span class="function">print</span>(<span class="string">f'Refund ID: {refund.id}'</span>)
        <span class="function">print</span>(<span class="string">f'Refund Status: {refund.status}'</span>)

        <span class="keyword">return</span> refund

    <span class="keyword">except</span> davspay.DavspayError <span class="keyword">as</span> e:
        <span class="function">print</span>(<span class="string">f'Refund Error: {e.message}'</span>)`}
              />
            </Section>

            <Section>
              <SectionTitle>Webhook Verification (Flask)</SectionTitle>
              <Description>Securely handle webhook events in Flask:</Description>
              <CodeBlockComponent
                language="python"
                code={`<span class="keyword">from</span> flask <span class="keyword">import</span> Flask, request, jsonify
<span class="keyword">import</span> davspay

<span class="variable">app</span> <span class="operator">=</span> <span class="function">Flask</span>(__name__)

<span class="comment">@app.route('/webhooks/davspay', methods=['POST'])</span>
<span class="keyword">def</span> <span class="function">handle_webhook</span>():
    <span class="variable">signature</span> <span class="operator">=</span> request.headers.get(<span class="string">'X-Davspay-Signature'</span>)
    <span class="variable">payload</span> <span class="operator">=</span> request.get_json()

    <span class="comment"># Verify webhook signature</span>
    <span class="keyword">if</span> <span class="keyword">not</span> client.webhooks.<span class="function">verify</span>(payload, signature):
        <span class="keyword">return</span> <span class="function">jsonify</span>({<span class="string">'error'</span>: <span class="string">'Invalid signature'</span>}), <span class="number">400</span>

    <span class="comment"># Handle events</span>
    <span class="variable">event_type</span> <span class="operator">=</span> payload.get(<span class="string">'event'</span>)

    <span class="keyword">if</span> event_type <span class="operator">==</span> <span class="string">'payment.success'</span>:
        <span class="function">print</span>(<span class="string">f'Payment successful: {payload["data"]["id"]}'</span>)
        <span class="comment"># Update order, send confirmation, etc.</span>

    <span class="keyword">elif</span> event_type <span class="operator">==</span> <span class="string">'payment.failed'</span>:
        <span class="function">print</span>(<span class="string">f'Payment failed: {payload["data"]["id"]}'</span>)
        <span class="comment"># Notify customer</span>

    <span class="keyword">elif</span> event_type <span class="operator">==</span> <span class="string">'refund.processed'</span>:
        <span class="function">print</span>(<span class="string">f'Refund processed: {payload["data"]["id"]}'</span>)

    <span class="keyword">return</span> <span class="function">jsonify</span>({<span class="string">'received'</span>: <span class="keyword">True</span>}), <span class="number">200</span>

<span class="keyword">if</span> __name__ <span class="operator">==</span> <span class="string">'__main__'</span>:
    app.<span class="function">run</span>(port<span class="operator">=</span><span class="number">3000</span>)`}
              />
            </Section>
          </>
        );

      case 'php':
        return (
          <>
            <Section>
              <SectionTitle>Installation</SectionTitle>
              <Description>Install the Davspay PHP SDK using Composer:</Description>
              <CodeBlockComponent
                language="bash"
                code={`composer require davspay/sdk`}
              />
            </Section>

            <Section>
              <SectionTitle>Quick Start</SectionTitle>
              <Description>Set up the client and start processing payments:</Description>
              <CodeBlockComponent
                language="php"
                code={`<span class="keyword">&lt;?php</span>

<span class="keyword">require</span> <span class="string">'vendor/autoload.php'</span>;

<span class="keyword">use</span> Davspay\\Client;

<span class="comment">// Initialize the Davspay client</span>
<span class="keyword">$davspay</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="function">Client</span>([
    <span class="string">'api_key'</span> <span class="operator">=></span> <span class="string">'your_api_key_here'</span>,
    <span class="string">'environment'</span> <span class="operator">=></span> <span class="string">'production'</span> <span class="comment">// or 'sandbox' for testing</span>
]);`}
              />
            </Section>

            <Section>
              <SectionTitle>Create a Payment</SectionTitle>
              <Description>Generate a payment link for your customers:</Description>
              <CodeBlockComponent
                language="php"
                code={`<span class="keyword">try</span> {
    <span class="keyword">$payment</span> <span class="operator">=</span> <span class="keyword">$davspay</span><span class="operator">-></span>payments<span class="operator">-></span><span class="function">create</span>([
        <span class="string">'amount'</span> <span class="operator">=></span> <span class="number">100000</span>, <span class="comment">// Amount in paise (₹1000.00)</span>
        <span class="string">'currency'</span> <span class="operator">=></span> <span class="string">'INR'</span>,
        <span class="string">'customer'</span> <span class="operator">=></span> [
            <span class="string">'email'</span> <span class="operator">=></span> <span class="string">'customer@example.com'</span>,
            <span class="string">'phone'</span> <span class="operator">=></span> <span class="string">'+919876543210'</span>,
            <span class="string">'name'</span> <span class="operator">=></span> <span class="string">'John Doe'</span>
        ],
        <span class="string">'description'</span> <span class="operator">=></span> <span class="string">'Payment for Order #12345'</span>,
        <span class="string">'callback_url'</span> <span class="operator">=></span> <span class="string">'https://yoursite.com/payment/callback'</span>,
        <span class="string">'metadata'</span> <span class="operator">=></span> [
            <span class="string">'order_id'</span> <span class="operator">=></span> <span class="string">'12345'</span>,
            <span class="string">'source'</span> <span class="operator">=></span> <span class="string">'web'</span>
        ]
    ]);

    <span class="function">echo</span> <span class="string">"Payment ID: "</span> <span class="operator">.</span> <span class="keyword">$payment</span><span class="operator">-></span><span class="property">id</span> <span class="operator">.</span> <span class="string">"\\n"</span>;
    <span class="function">echo</span> <span class="string">"Payment URL: "</span> <span class="operator">.</span> <span class="keyword">$payment</span><span class="operator">-></span><span class="property">payment_url</span>;

} <span class="keyword">catch</span> (Davspay\\DavspayException <span class="keyword">$e</span>) {
    <span class="function">echo</span> <span class="string">"Error: "</span> <span class="operator">.</span> <span class="keyword">$e</span><span class="operator">-></span><span class="function">getMessage</span>();
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Retrieve Payment</SectionTitle>
              <Description>Fetch payment details by ID:</Description>
              <CodeBlockComponent
                language="php"
                code={`<span class="keyword">try</span> {
    <span class="keyword">$payment</span> <span class="operator">=</span> <span class="keyword">$davspay</span><span class="operator">-></span>payments<span class="operator">-></span><span class="function">retrieve</span>(<span class="string">'pay_123456789'</span>);

    <span class="function">echo</span> <span class="string">"Status: "</span> <span class="operator">.</span> <span class="keyword">$payment</span><span class="operator">-></span><span class="property">status</span> <span class="operator">.</span> <span class="string">"\\n"</span>;
    <span class="function">echo</span> <span class="string">"Amount: ₹"</span> <span class="operator">.</span> (<span class="keyword">$payment</span><span class="operator">-></span><span class="property">amount</span> <span class="operator">/</span> <span class="number">100</span>);

} <span class="keyword">catch</span> (Davspay\\DavspayException <span class="keyword">$e</span>) {
    <span class="function">echo</span> <span class="string">"Error: "</span> <span class="operator">.</span> <span class="keyword">$e</span><span class="operator">-></span><span class="function">getMessage</span>();
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Process Refunds</SectionTitle>
              <Description>Issue refunds to your customers:</Description>
              <CodeBlockComponent
                language="php"
                code={`<span class="keyword">try</span> {
    <span class="keyword">$refund</span> <span class="operator">=</span> <span class="keyword">$davspay</span><span class="operator">-></span>refunds<span class="operator">-></span><span class="function">create</span>([
        <span class="string">'payment_id'</span> <span class="operator">=></span> <span class="string">'pay_123456789'</span>,
        <span class="string">'amount'</span> <span class="operator">=></span> <span class="number">50000</span>, <span class="comment">// Partial refund (₹500)</span>
        <span class="string">'reason'</span> <span class="operator">=></span> <span class="string">'Customer requested refund'</span>,
        <span class="string">'notes'</span> <span class="operator">=></span> [
            <span class="string">'refund_type'</span> <span class="operator">=></span> <span class="string">'partial'</span>
        ]
    ]);

    <span class="function">echo</span> <span class="string">"Refund ID: "</span> <span class="operator">.</span> <span class="keyword">$refund</span><span class="operator">-></span><span class="property">id</span>;

} <span class="keyword">catch</span> (Davspay\\DavspayException <span class="keyword">$e</span>) {
    <span class="function">echo</span> <span class="string">"Error: "</span> <span class="operator">.</span> <span class="keyword">$e</span><span class="operator">-></span><span class="function">getMessage</span>();
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Webhook Verification</SectionTitle>
              <Description>Securely process webhook events:</Description>
              <CodeBlockComponent
                language="php"
                code={`<span class="keyword">&lt;?php</span>

<span class="keyword">require</span> <span class="string">'vendor/autoload.php'</span>;

<span class="keyword">use</span> Davspay\\Client;

<span class="keyword">$davspay</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="function">Client</span>([<span class="string">'api_key'</span> <span class="operator">=></span> <span class="string">'your_api_key_here'</span>]);

<span class="comment">// Get webhook data</span>
<span class="keyword">$payload</span> <span class="operator">=</span> <span class="function">file_get_contents</span>(<span class="string">'php://input'</span>);
<span class="keyword">$signature</span> <span class="operator">=</span> <span class="keyword">$_SERVER</span>[<span class="string">'HTTP_X_DAVSPAY_SIGNATURE'</span>];
<span class="keyword">$data</span> <span class="operator">=</span> <span class="function">json_decode</span>(<span class="keyword">$payload</span>, <span class="keyword">true</span>);

<span class="comment">// Verify signature</span>
<span class="keyword">if</span> (!<span class="keyword">$davspay</span><span class="operator">-></span>webhooks<span class="operator">-></span><span class="function">verify</span>(<span class="keyword">$payload</span>, <span class="keyword">$signature</span>)) {
    <span class="function">http_response_code</span>(<span class="number">400</span>);
    <span class="function">echo</span> <span class="function">json_encode</span>([<span class="string">'error'</span> <span class="operator">=></span> <span class="string">'Invalid signature'</span>]);
    <span class="keyword">exit</span>;
}

<span class="comment">// Handle events</span>
<span class="keyword">switch</span> (<span class="keyword">$data</span>[<span class="string">'event'</span>]) {
    <span class="keyword">case</span> <span class="string">'payment.success'</span>:
        <span class="function">error_log</span>(<span class="string">"Payment successful: "</span> <span class="operator">.</span> <span class="keyword">$data</span>[<span class="string">'data'</span>][<span class="string">'id'</span>]);
        <span class="comment">// Update order status</span>
        <span class="keyword">break</span>;

    <span class="keyword">case</span> <span class="string">'payment.failed'</span>:
        <span class="function">error_log</span>(<span class="string">"Payment failed: "</span> <span class="operator">.</span> <span class="keyword">$data</span>[<span class="string">'data'</span>][<span class="string">'id'</span>]);
        <span class="comment">// Notify customer</span>
        <span class="keyword">break</span>;

    <span class="keyword">case</span> <span class="string">'refund.processed'</span>:
        <span class="function">error_log</span>(<span class="string">"Refund processed: "</span> <span class="operator">.</span> <span class="keyword">$data</span>[<span class="string">'data'</span>][<span class="string">'id'</span>]);
        <span class="keyword">break</span>;
}

<span class="function">http_response_code</span>(<span class="number">200</span>);
<span class="function">echo</span> <span class="function">json_encode</span>([<span class="string">'received'</span> <span class="operator">=></span> <span class="keyword">true</span>]);`}
              />
            </Section>
          </>
        );

      case 'java':
        return (
          <>
            <Section>
              <SectionTitle>Installation (Maven)</SectionTitle>
              <Description>Add the Davspay dependency to your pom.xml:</Description>
              <CodeBlockComponent
                language="xml"
                code={`<span class="keyword">&lt;dependency&gt;</span>
    <span class="keyword">&lt;groupId&gt;</span>com.davspay<span class="keyword">&lt;/groupId&gt;</span>
    <span class="keyword">&lt;artifactId&gt;</span>sdk<span class="keyword">&lt;/artifactId&gt;</span>
    <span class="keyword">&lt;version&gt;</span>1.7.2<span class="keyword">&lt;/version&gt;</span>
<span class="keyword">&lt;/dependency&gt;</span>`}
              />
            </Section>

            <Section>
              <SectionTitle>Gradle</SectionTitle>
              <Description>Or add to your build.gradle:</Description>
              <CodeBlockComponent
                language="gradle"
                code={`implementation <span class="string">'com.davspay:sdk:1.7.2'</span>`}
              />
            </Section>

            <Section>
              <SectionTitle>Quick Start</SectionTitle>
              <Description>Initialize the client and start processing payments:</Description>
              <CodeBlockComponent
                language="java"
                code={`<span class="keyword">import</span> com.davspay.DavspayClient;
<span class="keyword">import</span> com.davspay.model.Payment;
<span class="keyword">import</span> com.davspay.exception.DavspayException;

<span class="keyword">public class</span> <span class="function">PaymentExample</span> {
    <span class="keyword">public static void</span> <span class="function">main</span>(String[] args) {
        <span class="comment">// Initialize the Davspay client</span>
        DavspayClient davspay <span class="operator">=</span> <span class="keyword">new</span> <span class="function">DavspayClient</span>(
            <span class="string">"your_api_key_here"</span>,
            <span class="string">"production"</span> <span class="comment">// or "sandbox" for testing</span>
        );
    }
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Create a Payment</SectionTitle>
              <Description>Generate payment links with builder pattern:</Description>
              <CodeBlockComponent
                language="java"
                code={`<span class="keyword">try</span> {
    Payment payment <span class="operator">=</span> davspay.payments()
        .<span class="function">create</span>()
        .<span class="function">amount</span>(<span class="number">100000</span>) <span class="comment">// Amount in paise (₹1000.00)</span>
        .<span class="function">currency</span>(<span class="string">"INR"</span>)
        .<span class="function">customerEmail</span>(<span class="string">"customer@example.com"</span>)
        .<span class="function">customerPhone</span>(<span class="string">"+919876543210"</span>)
        .<span class="function">customerName</span>(<span class="string">"John Doe"</span>)
        .<span class="function">description</span>(<span class="string">"Payment for Order #12345"</span>)
        .<span class="function">callbackUrl</span>(<span class="string">"https://yoursite.com/payment/callback"</span>)
        .<span class="function">metadata</span>(<span class="string">"order_id"</span>, <span class="string">"12345"</span>)
        .<span class="function">metadata</span>(<span class="string">"source"</span>, <span class="string">"web"</span>)
        .<span class="function">execute</span>();

    System.out.<span class="function">println</span>(<span class="string">"Payment ID: "</span> <span class="operator">+</span> payment.<span class="function">getId</span>());
    System.out.<span class="function">println</span>(<span class="string">"Payment URL: "</span> <span class="operator">+</span> payment.<span class="function">getPaymentUrl</span>());

} <span class="keyword">catch</span> (DavspayException e) {
    System.err.<span class="function">println</span>(<span class="string">"Error: "</span> <span class="operator">+</span> e.<span class="function">getMessage</span>());
    e.<span class="function">printStackTrace</span>();
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Retrieve Payment</SectionTitle>
              <Description>Fetch payment details and status:</Description>
              <CodeBlockComponent
                language="java"
                code={`<span class="keyword">try</span> {
    Payment payment <span class="operator">=</span> davspay.payments()
        .<span class="function">retrieve</span>(<span class="string">"pay_123456789"</span>);

    System.out.<span class="function">println</span>(<span class="string">"Status: "</span> <span class="operator">+</span> payment.<span class="function">getStatus</span>());
    System.out.<span class="function">println</span>(<span class="string">"Amount: ₹"</span> <span class="operator">+</span> payment.<span class="function">getAmount</span>() <span class="operator">/</span> <span class="number">100</span>);
    System.out.<span class="function">println</span>(<span class="string">"Customer: "</span> <span class="operator">+</span> payment.<span class="function">getCustomerName</span>());

} <span class="keyword">catch</span> (DavspayException e) {
    System.err.<span class="function">println</span>(<span class="string">"Error: "</span> <span class="operator">+</span> e.<span class="function">getMessage</span>());
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Process Refunds</SectionTitle>
              <Description>Issue refunds to customers:</Description>
              <CodeBlockComponent
                language="java"
                code={`<span class="keyword">try</span> {
    Refund refund <span class="operator">=</span> davspay.refunds()
        .<span class="function">create</span>()
        .<span class="function">paymentId</span>(<span class="string">"pay_123456789"</span>)
        .<span class="function">amount</span>(<span class="number">50000</span>) <span class="comment">// Partial refund (₹500)</span>
        .<span class="function">reason</span>(<span class="string">"Customer requested refund"</span>)
        .<span class="function">note</span>(<span class="string">"refund_type"</span>, <span class="string">"partial"</span>)
        .<span class="function">execute</span>();

    System.out.<span class="function">println</span>(<span class="string">"Refund ID: "</span> <span class="operator">+</span> refund.<span class="function">getId</span>());
    System.out.<span class="function">println</span>(<span class="string">"Refund Status: "</span> <span class="operator">+</span> refund.<span class="function">getStatus</span>());

} <span class="keyword">catch</span> (DavspayException e) {
    System.err.<span class="function">println</span>(<span class="string">"Error: "</span> <span class="operator">+</span> e.<span class="function">getMessage</span>());
}`}
              />
            </Section>

            <Section>
              <SectionTitle>Webhook Verification (Spring Boot)</SectionTitle>
              <Description>Handle webhook events in Spring Boot:</Description>
              <CodeBlockComponent
                language="java"
                code={`<span class="keyword">import</span> org.springframework.web.bind.annotation.*;
<span class="keyword">import</span> com.davspay.DavspayClient;

<span class="comment">@RestController</span>
<span class="comment">@RequestMapping("/webhooks")</span>
<span class="keyword">public class</span> <span class="function">WebhookController</span> {

    <span class="keyword">private final</span> DavspayClient davspay;

    <span class="keyword">public</span> <span class="function">WebhookController</span>() {
        <span class="keyword">this</span>.davspay <span class="operator">=</span> <span class="keyword">new</span> <span class="function">DavspayClient</span>(<span class="string">"your_api_key_here"</span>);
    }

    <span class="comment">@PostMapping("/davspay")</span>
    <span class="keyword">public</span> ResponseEntity&lt;Map&lt;String, Boolean&gt;&gt; <span class="function">handleWebhook</span>(
        <span class="comment">@RequestHeader("X-Davspay-Signature")</span> String signature,
        <span class="comment">@RequestBody</span> String payload
    ) {
        <span class="comment">// Verify webhook signature</span>
        <span class="keyword">if</span> (!davspay.webhooks().<span class="function">verify</span>(payload, signature)) {
            <span class="keyword">return</span> ResponseEntity
                .<span class="function">badRequest</span>()
                .<span class="function">body</span>(Map.<span class="function">of</span>(<span class="string">"error"</span>, <span class="string">"Invalid signature"</span>));
        }

        <span class="comment">// Parse and handle event</span>
        WebhookEvent event <span class="operator">=</span> davspay.webhooks().<span class="function">parse</span>(payload);

        <span class="keyword">switch</span> (event.<span class="function">getType</span>()) {
            <span class="keyword">case</span> <span class="string">"payment.success"</span>:
                System.out.<span class="function">println</span>(<span class="string">"Payment successful: "</span> <span class="operator">+</span> event.<span class="function">getData</span>().<span class="function">getId</span>());
                <span class="comment">// Update order status</span>
                <span class="keyword">break</span>;

            <span class="keyword">case</span> <span class="string">"payment.failed"</span>:
                System.out.<span class="function">println</span>(<span class="string">"Payment failed: "</span> <span class="operator">+</span> event.<span class="function">getData</span>().<span class="function">getId</span>());
                <span class="comment">// Notify customer</span>
                <span class="keyword">break</span>;

            <span class="keyword">case</span> <span class="string">"refund.processed"</span>:
                System.out.<span class="function">println</span>(<span class="string">"Refund processed: "</span> <span class="operator">+</span> event.<span class="function">getData</span>().<span class="function">getId</span>());
                <span class="keyword">break</span>;
        }

        <span class="keyword">return</span> ResponseEntity.<span class="function">ok</span>(Map.<span class="function">of</span>(<span class="string">"received"</span>, <span class="keyword">true</span>));
    }
}`}
              />
            </Section>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SDKPage>
      <Navbar />

      <HeroSection>
        <Container>
          <PageTitle>SDK & Libraries</PageTitle>
          <PageSubtitle>
            Official SDKs for popular programming languages
          </PageSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <LanguageGrid>
            {languages.map((lang, index) => (
              <LanguageCard key={index} hover variant="glass">
                <LanguageIcon>{lang.icon}</LanguageIcon>
                <LanguageName>{lang.name}</LanguageName>
                <LanguageVersion>{lang.version}</LanguageVersion>
                <Description style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <code>{lang.package}</code>
                </Description>
                <Button variant="outline" size="sm">
                  <FiGithub style={{ marginRight: '0.5rem' }} />
                  View on GitHub
                </Button>
              </LanguageCard>
            ))}
          </LanguageGrid>

          <TabContainer>
            <TabList>
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  $active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <TabContent>
              {getSDKContent()}
            </TabContent>
          </TabContainer>
        </Container>
      </ContentSection>

      <Footer />
    </SDKPage>
  );
}
