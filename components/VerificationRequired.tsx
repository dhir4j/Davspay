'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiClock } from 'react-icons/fi';

interface VerificationRequiredProps {
  children: React.ReactNode;
}

const VerificationRequired: React.FC<VerificationRequiredProps> = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setChecking(false);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading || checking) {
    return null;
  }

  // Show pending verification message - STAYS PENDING FOREVER
  if (user?.verification_status === 'pending') {
    return (
      <VerificationContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconWrapper $status="pending">
          <FiClock />
        </IconWrapper>
        <Title>Verification Pending</Title>
        <Message>
          Thank you for submitting your verification request. Your account is currently under review.
        </Message>
        <InfoBox>
          <InfoTitle>What's happening?</InfoTitle>
          <InfoList>
            <li>Your verification request has been received</li>
            <li>Our team is reviewing your account</li>
            <li>This feature will be available once your account is approved</li>
          </InfoList>
        </InfoBox>
        <ButtonGroup>
          <SecondaryButton onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </SecondaryButton>
        </ButtonGroup>
      </VerificationContainer>
    );
  }

  // Show verification required message (not_submitted)
  return (
    <VerificationContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconWrapper $status="warning">
        <FiAlertCircle />
      </IconWrapper>
      <Title>Verification Required</Title>
      <Message>
        To access this feature, you need to submit a verification request. This helps us ensure the security and compliance of our payment platform.
      </Message>
      <InfoBox>
        <InfoTitle>Next Steps:</InfoTitle>
        <InfoList>
          <li>Click the button below to submit your verification request</li>
          <li>Your account will be marked as pending verification</li>
          <li>Once verified, you'll have access to all dashboard features</li>
        </InfoList>
      </InfoBox>
      <ButtonGroup>
        <PrimaryButton onClick={() => router.push('/dashboard/verification')}>
          Submit Verification Request
        </PrimaryButton>
        <SecondaryButton onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </SecondaryButton>
      </ButtonGroup>
    </VerificationContainer>
  );
};

export default VerificationRequired;

// Styled Components
const VerificationContainer = styled(motion.div)`
  max-width: 600px;
  margin: 4rem auto;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const IconWrapper = styled.div<{ $status: string }>`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'pending':
        return theme.colors.warning + '15';
      case 'rejected':
        return theme.colors.error + '15';
      case 'verified':
        return theme.colors.success + '15';
      default:
        return theme.colors.primary + '15';
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'pending':
        return theme.colors.warning;
      case 'rejected':
        return theme.colors.error;
      case 'verified':
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  }};

  svg {
    width: 40px;
    height: 40px;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: '•';
      position: absolute;
      left: 0.5rem;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 0.875rem 2rem;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
`;

const SecondaryButton = styled.button`
  padding: 0.875rem 2rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
