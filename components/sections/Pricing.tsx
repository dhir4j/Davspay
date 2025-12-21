'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import Card from '@/components/ui/Card';

const PricingSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
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

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const ContactCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}15;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.3s ease;
  }

  ${ContactCard}:hover &::before {
    opacity: 0.3;
  }

  svg {
    width: 36px;
    height: 36px;
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    z-index: 1;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const ContactInfo = styled.a`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40;
  }
`;

const ContactDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <PricingSection id="pricing">
      <Container>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Custom <span className="gradient-text">Pricing Plans</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in touch with our sales team for a custom pricing plan tailored to your business needs
          </Subtitle>
        </SectionHeader>

        <ContactGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactCard variants={itemVariants} variant="glass">
            <IconWrapper>
              <FiMail />
            </IconWrapper>
            <ContactTitle>Email Us</ContactTitle>
            <ContactInfo href="mailto:contact@davspay.com">
              contact@davspay.com
            </ContactInfo>
            <ContactDescription>
              Send us an email and we'll get back to you within 24 hours
            </ContactDescription>
          </ContactCard>

          <ContactCard variants={itemVariants} variant="glass">
            <IconWrapper>
              <FiPhone />
            </IconWrapper>
            <ContactTitle>Call Us</ContactTitle>
            <ContactInfo href="tel:+91XXXXXXXXXX">
              +91 XXXX-XXXX-XX
            </ContactInfo>
            <ContactDescription>
              Speak directly with our sales team Monday-Friday, 9AM-6PM IST
            </ContactDescription>
          </ContactCard>

          <ContactCard variants={itemVariants} variant="glass">
            <IconWrapper>
              <FiMessageSquare />
            </IconWrapper>
            <ContactTitle>Live Chat</ContactTitle>
            <ContactInfo as="button" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              Start Chat
            </ContactInfo>
            <ContactDescription>
              Chat with our team for instant support and custom quote
            </ContactDescription>
          </ContactCard>
        </ContactGrid>
      </Container>
    </PricingSection>
  );
};

export default Pricing;
