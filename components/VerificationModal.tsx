'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
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

  const handleModalClose = () => {
    setCurrentPage(1);
    setIsProcessing(false);
    setFormData({
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
    onClose();
  };

  const isPage2Valid = formData.businessType && formData.businessName && formData.tradeName && formData.businessCategory;
  const isPage3Valid = formData.accountHolderName && formData.bankName && formData.accountNumber && formData.confirmAccountNumber && formData.ifscCode && formData.accountNumber === formData.confirmAccountNumber;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
          />
          <Modal
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {!isProcessing ? (
              <>
                <ModalHeader>
                  <ModalTitle>Verification Required</ModalTitle>
                  <CloseButton onClick={handleModalClose}>
                    <FiX />
                  </CloseButton>
                </ModalHeader>

                <ModalContent>
                  <AnimatePresence mode="wait">
                    {currentPage === 1 && (
                      <PageContainer
                        key="page1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <InfoSection>
                          <InfoTitle>Why Verification is Needed?</InfoTitle>
                          <InfoText>
                            To ensure the security of your account and comply with regulatory requirements,
                            we need to verify your business details and bank account information.
                          </InfoText>
                          <InfoList>
                            <InfoItem>
                              <FiCheck /> Secure payment gateway access
                            </InfoItem>
                            <InfoItem>
                              <FiCheck /> Compliance with financial regulations
                            </InfoItem>
                            <InfoItem>
                              <FiCheck /> Protection against fraud
                            </InfoItem>
                            <InfoItem>
                              <FiCheck /> Enable seamless transactions
                            </InfoItem>
                          </InfoList>
                          <InfoNote>
                            This is a one-time process and will only take a few minutes to complete.
                          </InfoNote>
                        </InfoSection>
                      </PageContainer>
                    )}

                    {currentPage === 2 && (
                      <PageContainer
                        key="page2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormSection>
                          <FormTitle>Business Details</FormTitle>

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

                          <FormField>
                            <Label>Website / App URL (Optional)</Label>
                            <Input
                              type="url"
                              name="websiteUrl"
                              value={formData.websiteUrl}
                              onChange={handleInputChange}
                              placeholder="https://example.com"
                            />
                          </FormField>
                        </FormSection>
                      </PageContainer>
                    )}

                    {currentPage === 3 && (
                      <PageContainer
                        key="page3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormSection>
                          <FormTitle>Bank Verification</FormTitle>

                          <FormField>
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
                          </FormField>

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
                        </FormSection>
                      </PageContainer>
                    )}
                  </AnimatePresence>
                </ModalContent>

                <ModalFooter>
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
                  >
                    {currentPage === 3 ? 'Verify & Complete Registration' : 'Continue'}{' '}
                    {currentPage !== 3 && <FiArrowRight />}
                  </ContinueButton>
                </ModalFooter>
              </>
            ) : (
              <ProcessingContainer>
                <ProcessingIcon>
                  <FiCheck />
                </ProcessingIcon>
                <ProcessingTitle>Verification in Progress</ProcessingTitle>
                <ProcessingText>
                  Your verification request has been submitted successfully. We are processing your information
                  and will notify you once the verification is complete.
                </ProcessingText>
                <ProcessingNote>
                  This usually takes 1-2 business days. You can continue using the dashboard with limited access.
                </ProcessingNote>
                <CloseProcessingButton onClick={handleModalClose}>
                  Got it
                </CloseProcessingButton>
              </ProcessingContainer>
            )}
          </Modal>
        </>
      )}
    </AnimatePresence>
  );
};

export default VerificationModal;

// Styled Components
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  backdrop-filter: blur(2px);
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 92%;
  max-width: 680px;
  max-height: 90vh;
  z-index: 100000;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const PageContainer = styled(motion.div)`
  width: 100%;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoTitle = styled.h4`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const InfoText = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.success};
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
`;

const InfoNote = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormTitle = styled.h4`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15;
  }
`;

const ErrorText = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.error};
  margin-top: -0.25rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ContinueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ProcessingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  min-height: 400px;
`;

const ProcessingIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success}15;
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  svg {
    width: 50px;
    height: 50px;
  }
`;

const ProcessingTitle = styled.h4`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProcessingText = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
`;

const ProcessingNote = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

const CloseProcessingButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
