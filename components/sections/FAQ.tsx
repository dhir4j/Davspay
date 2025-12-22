'use client';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FAQSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`;

const Container = styled.div`
  max-width: 900px;
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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FAQItem = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const FAQQuestion = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme, $isOpen }) => $isOpen ? theme.colors.primary : theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  transition: color 0.3s ease;

  svg {
    flex-shrink: 0;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does it take to activate my account on Davspay?',
      answer: 'Davspay account gets activated within 24 hours after registering and submitting the required documents. All you need to do is sign up, verify your account, submit documents, and wait for your KYC approval.',
    },
    {
      question: 'Does the payment gateway support multiple payment modes?',
      answer: "Yes, Davspay's payment gateway supports 100+ payment modes. This includes Net banking via 50+ banks, UPI, Credit & Debit Cards, Mobile Wallets, and Pay Later options.",
    },
    {
      question: 'How do I get the API keys?',
      answer: "Upon successful onboarding, Davspay's integration team will share the API key to initiate testing. You can also manage and regenerate keys from your dashboard under the 'Manage Keys' section.",
    },
    {
      question: 'How secure is Davspay payment gateway?',
      answer: 'Davspay mandatorily complies with PCI DSS and SSL standards to maintain optimum security. Measures like tokenization ensure that the payment details of the user are stored in an encrypted manner to combat any hacking attempts. We use bank-grade 256-bit encryption for all transactions.',
    },
    {
      question: 'How are refunds handled?',
      answer: "Refunds are issued for successfully captured payments when a merchant requests money back to the customer's original payment method. Refunds can be full or partial, and are processed via the payment gateway's Dashboard or Refund APIs. Processing typically takes 5-7 business days.",
    },
    {
      question: 'Do you have 24/7 customer support?',
      answer: 'Yes, merchants can contact Davspay team 24/7 for assistance. Email, chat, and phone support is also offered to the customers who make payments using the payment gateway.',
    },
    {
      question: 'How much time does it take to start accepting payment from customers?',
      answer: 'Merchants can start accepting payments once they have been successfully onboarded on Davspay. They can start receiving online payments in less than 24 hours after getting a KYC approval.',
    },
    {
      question: 'Do I need a website or mobile app to accept payments online?',
      answer: "Not necessarily. Davspay's Payment Gateway and Payment Links ensure that businesses without an app or a website can accept online payment without any hassle. You can share payment links via WhatsApp, SMS, or email.",
    },
    {
      question: 'What are the transaction fees?',
      answer: 'Our pricing is transparent and competitive. Transaction fees vary based on payment method and your business volume. Contact our sales team for a customized pricing plan that fits your needs.',
    },
    {
      question: 'How do I identify fraud transactions?',
      answer: 'At Davspay, all transactions go through close scrutiny to identify fraudulent or risky activities, if any. Our advanced AI-powered fraud detection system analyzes transaction patterns in real-time and flags suspicious activities automatically.',
    },
  ];

  return (
    <FAQSection>
      <Container>
        <SectionHeader>
          <SectionBadge
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            FAQ
          </SectionBadge>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Find answers to common questions about Davspay payment gateway
          </SectionDescription>
        </SectionHeader>

        <FAQList>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <FAQQuestion
                $isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <FiChevronDown size={24} />
              </FAQQuestion>
              <AnimatePresence>
                {openIndex === index && (
                  <FAQAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </FAQSection>
  );
};

export default FAQ;
