'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiShield } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const VerificationPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    tradeName: '',
    businessCategory: '',
    websiteUrl: '',
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
  });

  const businessTypes = [
    'Individual',
    'Proprietor',
    'Partnership',
    'Pvt Ltd',
    'LLP',
  ];

  const businessCategories = [
    'E-commerce',
    'SaaS',
    'Education',
    'Healthcare',
    'Financial Services',
    'Food & Beverage',
    'Retail',
    'Professional Services',
    'Non-profit',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(3);
    } else if (currentPage === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  const isPage2Valid = formData.businessType && formData.businessName && formData.tradeName && formData.businessCategory;
  const isPage3Valid = formData.accountHolderName && formData.bankName && formData.accountNumber && formData.confirmAccountNumber && formData.ifscCode && formData.accountNumber === formData.confirmAccountNumber;

  return (
    <Container>
      <ContentWrapper>
        {!isProcessing ? (
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Header>
              <LogoSection>
                <ShieldIcon>
                  <FiShield />
                </ShieldIcon>
                <HeaderContent>
                  <Title>Account Verification Required</Title>
                  <Subtitle>Complete your profile to access all features</Subtitle>
                </HeaderContent>
              </LogoSection>
              <ProgressBar>
                <ProgressStep $active={currentPage >= 1} $completed={currentPage > 1}>1</ProgressStep>
                <ProgressLine $active={currentPage > 1} />
                <ProgressStep $active={currentPage >= 2} $completed={currentPage > 2}>2</ProgressStep>
                <ProgressLine $active={currentPage > 2} />
                <ProgressStep $active={currentPage >= 3} $completed={currentPage > 3}>3</ProgressStep>
              </ProgressBar>
            </Header>

            <ContentSection>
              {currentPage === 1 && (
                <PageContent
                  key="page1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionTitle>Why Verification is Needed?</SectionTitle>
                  <InfoText>
                    To ensure the security of your account and comply with regulatory requirements,
                    we need to verify your business details and bank account information.
                  </InfoText>
                  <BenefitsList>
                    <BenefitItem>
                      <CheckIcon><FiCheck /></CheckIcon>
                      <BenefitText>Secure payment gateway access</BenefitText>
                    </BenefitItem>
                    <BenefitItem>
                      <CheckIcon><FiCheck /></CheckIcon>
                      <BenefitText>Compliance with financial regulations</BenefitText>
                    </BenefitItem>
                    <BenefitItem>
                      <CheckIcon><FiCheck /></CheckIcon>
                      <BenefitText>Protection against fraud</BenefitText>
                    </BenefitItem>
                    <BenefitItem>
                      <CheckIcon><FiCheck /></CheckIcon>
                      <BenefitText>Enable seamless transactions</BenefitText>
                    </BenefitItem>
                  </BenefitsList>
                  <InfoNote>
                    This is a one-time process and will only take a few minutes to complete.
                  </InfoNote>
                </PageContent>
              )}

              {currentPage === 2 && (
                <PageContent
                  key="page2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionTitle>Business Details</SectionTitle>

                  <FormGrid>
                    <FormField>
                      <Label>
                        Business Type <Required>*</Required>
                      </Label>
                      <Select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Business Type</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Select>
                    </FormField>

                    <FormField>
                      <Label>
                        Business Name <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Enter your business name"
                        required
                      />
                    </FormField>

                    <FormField>
                      <Label>
                        Trade/Brand Name <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="tradeName"
                        value={formData.tradeName}
                        onChange={handleInputChange}
                        placeholder="Enter your trade or brand name"
                        required
                      />
                    </FormField>

                    <FormField>
                      <Label>
                        Business Category <Required>*</Required>
                      </Label>
                      <Select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Business Category</option>
                        {businessCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Select>
                    </FormField>

                    <FormFieldFull>
                      <Label>Website / App URL (Optional)</Label>
                      <Input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                      />
                    </FormFieldFull>
                  </FormGrid>
                </PageContent>
              )}

              {currentPage === 3 && (
                <PageContent
                  key="page3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionTitle>Bank Verification</SectionTitle>

                  <FormGrid>
                    <FormFieldFull>
                      <Label>
                        Account Holder Name <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleInputChange}
                        placeholder="Enter account holder name"
                        required
                      />
                    </FormFieldFull>

                    <FormField>
                      <Label>
                        Bank Name <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder="Enter bank name"
                        required
                      />
                    </FormField>

                    <FormField>
                      <Label>
                        IFSC Code <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC code"
                        maxLength={11}
                        required
                      />
                    </FormField>

                    <FormField>
                      <Label>
                        Account Number <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                        required
                      />
                    </FormField>

                    <FormField>
                      <Label>
                        Re-enter Account Number <Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        name="confirmAccountNumber"
                        value={formData.confirmAccountNumber}
                        onChange={handleInputChange}
                        placeholder="Re-enter account number"
                        required
                      />
                      {formData.confirmAccountNumber && formData.accountNumber !== formData.confirmAccountNumber && (
                        <ErrorText>Account numbers do not match</ErrorText>
                      )}
                    </FormField>
                  </FormGrid>
                </PageContent>
              )}
            </ContentSection>

            <Footer>
              {currentPage > 1 && (
                <BackButton onClick={handleBack}>
                  <FiArrowLeft /> Back
                </BackButton>
              )}
              <ContinueButton
                onClick={handleContinue}
                disabled={
                  (currentPage === 2 && !isPage2Valid) ||
                  (currentPage === 3 && !isPage3Valid)
                }
                $fullWidth={currentPage === 1}
              >
                {currentPage === 3 ? 'Verify & Complete Registration' : 'Continue'}{' '}
                {currentPage !== 3 && <FiArrowRight />}
              </ContinueButton>
            </Footer>
          </Card>
        ) : (
          <SuccessCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SuccessIcon>
              <FiCheck />
            </SuccessIcon>
            <SuccessTitle>Verification in Progress</SuccessTitle>
            <SuccessText>
              Your verification request has been submitted successfully. We are processing your information
              and will notify you once the verification is complete.
            </SuccessText>
            <SuccessNote>
              This usually takes 1-2 business days. You can continue using the dashboard with limited access.
            </SuccessNote>
            <SuccessButton onClick={handleComplete}>
              Go to Dashboard
            </SuccessButton>
          </SuccessCard>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default VerificationPage;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}08 0%, ${({ theme }) => theme.colors.background} 100%);
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ShieldIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.secondary};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProgressStep = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  background: ${({ $active, $completed, theme }) =>
    $completed
      ? theme.colors.gradient
      : $active
      ? theme.colors.primary
      : theme.colors.background};
  color: ${({ $active, $completed, theme }) =>
    $active || $completed ? 'white' : theme.colors.textSecondary};
  border: 2px solid ${({ $active, $completed, theme }) =>
    $active || $completed ? 'transparent' : theme.colors.border};
`;

const ProgressLine = styled.div<{ $active: boolean }>`
  height: 2px;
  width: 80px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 40px;
  }
`;

const ContentSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  min-height: 400px;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const PageContent = styled(motion.div)`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const InfoText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BenefitsList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.success};
`;

const CheckIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.success}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.success};
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const BenefitText = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const InfoNote = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary}08;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FormFieldFull = styled(FormField)`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}15;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}15;
  }
`;

const ErrorText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.error};
  margin-top: -${({ theme }) => theme.spacing.xs};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
    flex-direction: column;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ContinueButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: ${({ $fullWidth }) => ($fullWidth ? '1' : 'initial')};

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SuccessCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: ${({ theme }) => theme.colors.success}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  svg {
    width: 60px;
    height: 60px;
  }
`;

const SuccessTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SuccessText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
`;

const SuccessNote = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
`;

const SuccessButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;
