'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiZap,
  FiShield,
  FiSmartphone,
  FiCreditCard,
  FiCode,
  FiBarChart,
  FiLock,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
} from 'react-icons/fi';
import Card from '@/components/ui/Card';

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionBadge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.secondary};

  .gradient-text {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`;

const WhyDavspaySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  margin: ${({ theme }) => theme.spacing.xxl} 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing.xl} 0;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const VideoColumn = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  video {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateX(5px);
  }
`;

const BenefitIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const BenefitContent = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const BenefitDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;

  svg {
    width: 28px;
    height: 28px;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    filter: blur(10px);
    opacity: 0;
    transition: opacity 0.3s;
  }

  ${FeatureCard}:hover &::before {
    opacity: 0.6;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  flex-grow: 1;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FeatureListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    flex-shrink: 0;
  }
`;

const Features = () => {
  const benefits = [
    {
      icon: <FiCheckCircle />,
      title: 'Instant Payment Collection',
      description: 'Collect payments instantly via UPI from all major apps with seamless integration.',
    },
    {
      icon: <FiShield />,
      title: 'Secure & Compliant',
      description: 'RBI-certified platform with bank-grade security and PCI DSS compliance.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Higher Success Rates',
      description: 'Achieve 98%+ transaction success rates with our optimized payment flows.',
    },
    {
      icon: <FiZap />,
      title: 'Real-time Settlements',
      description: 'Get funds settled instantly without waiting for T+2 days.',
    },
  ];

  const features = [
    {
      icon: <FiZap />,
      title: 'Instant Settlements',
      description: 'Get your money in real-time with our instant settlement feature. No more waiting days for your funds.',
      items: ['Real-time processing', 'T+0 settlements', 'Automated reconciliation'],
    },
    {
      icon: <FiShield />,
      title: 'Bank-Grade Security',
      description: 'Military-grade encryption and PCI DSS compliance ensure your transactions are always secure.',
      items: ['256-bit encryption', 'PCI DSS certified', 'Fraud detection'],
    },
    {
      icon: <FiSmartphone />,
      title: 'UPI Integration',
      description: 'Seamlessly accept payments through all major UPI apps including PhonePe, Google Pay, and Paytm.',
      items: ['All UPI apps supported', 'QR code generation', 'Intent-based flows'],
    },
    {
      icon: <FiCreditCard />,
      title: 'Multiple Payment Methods',
      description: 'Support for cards, net banking, wallets, and UPI - all through a single integration.',
      items: ['Cards & Net Banking', 'Digital wallets', 'EMI options'],
    },
    {
      icon: <FiCode />,
      title: 'Developer-Friendly APIs',
      description: 'Clean, well-documented REST APIs with SDKs for all popular programming languages.',
      items: ['RESTful APIs', 'Webhooks support', 'Comprehensive docs'],
    },
    {
      icon: <FiBarChart />,
      title: 'Advanced Analytics',
      description: 'Real-time dashboards with detailed insights into your payment metrics and customer behavior.',
      items: ['Real-time reports', 'Custom dashboards', 'Export capabilities'],
    },
    {
      icon: <FiLock />,
      title: 'Compliance Ready',
      description: 'Fully compliant with RBI guidelines and all Indian payment regulations.',
      items: ['RBI compliant', 'GST invoicing', 'Audit trails'],
    },
    {
      icon: <FiClock />,
      title: '24/7 Support',
      description: 'Round-the-clock technical support to help you with any integration or operational issues.',
      items: ['Live chat support', 'Email & phone', 'Dedicated account manager'],
    },
  ];

  return (
    <FeaturesSection id="features">
      <Container>
        <SectionHeader>
          <SectionBadge
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Features
          </SectionBadge>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything You Need for <span className="gradient-text">Payment Success</span>
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Powerful features designed to simplify payments and accelerate your business growth
          </SectionDescription>
        </SectionHeader>

        <WhyDavspaySection>
          <ContentColumn>
            <SectionTitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'left', marginBottom: 0 }}
            >
              Why Choose <span className="gradient-text">Davspay?</span>
            </SectionTitle>
            <SectionDescription
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ marginLeft: 0, maxWidth: '100%' }}
            >
              Accept UPI payments seamlessly and boost your platform with our powerful payment gateway solution.
            </SectionDescription>
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitContent>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitDescription>{benefit.description}</BenefitDescription>
                </BenefitContent>
              </BenefitItem>
            ))}
          </ContentColumn>

          <VideoColumn
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://decentro-website-v2-assets.s3.ap-south-1.amazonaws.com/UPI+Collections+Header+Animation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </VideoColumn>
        </WhyDavspaySection>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} hover variant="glass">
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <FeatureList>
                {feature.items.map((item, i) => (
                  <FeatureListItem key={i}>{item}</FeatureListItem>
                ))}
              </FeatureList>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features;
