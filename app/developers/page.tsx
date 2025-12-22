'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiBook, FiCode, FiFileText, FiZap, FiShield, FiClock } from 'react-icons/fi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const DevelopersPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  padding-top: calc(${({ theme }) => theme.spacing.xxl} + 70px);
  background: ${({ theme }) => theme.colors.background};
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.sm};
    padding-top: calc(${({ theme }) => theme.spacing.xl} + 70px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(${({ theme }) => theme.colors.primary}10 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.primary}10 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.secondary};

  .gradient-text {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const PageSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
  line-height: 1.8;
`;

const QuickStartSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.sm};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ResourceCard = styled(Card)`
  cursor: pointer;
  text-decoration: none;
  display: block;
`;

const ResourceIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  svg {
    width: 28px;
    height: 28px;
  }
`;

const ResourceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const ResourceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CodeSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CodeLanguage = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const Code = styled.pre`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  overflow-x: auto;

  .keyword { color: #C792EA; }
  .string { color: #C3E88D; }
  .comment { color: #546E7A; font-style: italic; }
  .function { color: #82AAFF; }
  .number { color: #F78C6C; }
`;

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
`;

export default function Developers() {
  const resources = [
    {
      icon: <FiBook />,
      title: 'API Reference',
      description: 'Complete API documentation with all endpoints, parameters, and response formats',
      link: '/developers/api-reference',
    },
    {
      icon: <FiCode />,
      title: 'SDK & Libraries',
      description: 'Official SDKs for Node.js, Python, PHP, Java, and more programming languages',
      link: '/developers/sdk',
    },
    {
      icon: <FiFileText />,
      title: 'Integration Guides',
      description: 'Step-by-step guides to integrate Davspay into your application',
      link: '/developers/guides',
    },
  ];

  const features = [
    {
      icon: <FiZap />,
      title: 'Fast Integration',
      description: 'Get started in minutes with our simple REST API',
    },
    {
      icon: <FiShield />,
      title: 'Secure by Default',
      description: 'Industry-standard encryption and security practices',
    },
    {
      icon: <FiClock />,
      title: 'Real-time Webhooks',
      description: 'Instant notifications for all payment events',
    },
  ];

  return (
    <DevelopersPage>
      <Navbar />

      <HeroSection>
        <Container>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Build with <span className="gradient-text">Davspay</span>
          </PageTitle>
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to integrate payments into your application.
            Powerful APIs, comprehensive documentation, and world-class support.
          </PageSubtitle>
          <Button variant="primary" size="lg">
            Get API Keys
          </Button>
        </Container>
      </HeroSection>

      <QuickStartSection>
        <Container>
          <SectionTitle>Quick Start Resources</SectionTitle>
          <ResourceGrid>
            {resources.map((resource, index) => (
              <Link key={index} href={resource.link} style={{ textDecoration: 'none' }}>
                <ResourceCard hover variant="glass">
                  <ResourceIcon>{resource.icon}</ResourceIcon>
                  <ResourceTitle>{resource.title}</ResourceTitle>
                  <ResourceDescription>{resource.description}</ResourceDescription>
                  <Button variant="outline" size="sm">
                    Learn More →
                  </Button>
                </ResourceCard>
              </Link>
            ))}
          </ResourceGrid>
        </Container>
      </QuickStartSection>

      <CodeSection>
        <Container>
          <SectionTitle>Start Accepting Payments in Minutes</SectionTitle>
          <CodeBlock>
            <CodeHeader>
              <CodeLanguage>Node.js</CodeLanguage>
            </CodeHeader>
            <Code>{`<span class="comment">// Install the Davspay SDK</span>
<span class="comment">// npm install @davspay/node-sdk</span>

<span class="keyword">const</span> <span class="function">Davspay</span> = <span class="function">require</span>(<span class="string">'@davspay/node-sdk'</span>);

<span class="comment">// Initialize with your API key</span>
<span class="keyword">const</span> davspay = <span class="keyword">new</span> <span class="function">Davspay</span>({
  apiKey: <span class="string">'your_api_key_here'</span>,
  environment: <span class="string">'production'</span>
});

<span class="comment">// Create a payment</span>
<span class="keyword">const</span> payment = <span class="keyword">await</span> davspay.payments.<span class="function">create</span>({
  amount: <span class="number">1000</span>, <span class="comment">// Amount in paise (₹10.00)</span>
  currency: <span class="string">'INR'</span>,
  customer: {
    email: <span class="string">'customer@example.com'</span>,
    phone: <span class="string">'+919876543210'</span>
  },
  description: <span class="string">'Payment for Order #12345'</span>,
  callback_url: <span class="string">'https://yoursite.com/payment/callback'</span>
});

console.<span class="function">log</span>(<span class="string">'Payment URL:'</span>, payment.payment_url);`}</Code>
          </CodeBlock>
        </Container>
      </CodeSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Developers Love Davspay</SectionTitle>
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeatureGrid>
        </Container>
      </FeaturesSection>

      <Footer />
    </DevelopersPage>
  );
}
