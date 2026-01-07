'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiInfo } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

const VerificationPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Details
    businessType: '',
    businessName: '',
    tradeName: '',
    businessCategory: '',
    websiteUrl: '',

    // Bank Details
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',

    // Business Details
    gstin: '',
    pan: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
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

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <AccentLine />
          <PageTitle>Settings</PageTitle>
        </PageHeader>

        <InfoBanner>
          <BannerIcon>
            <FiInfo />
          </BannerIcon>
          <BannerText>
            Complete your KYC verification to access all features and start accepting payments.
            This is a one-time process and typically takes 1-2 business days to complete.
          </BannerText>
        </InfoBanner>

        <TabBar>
          <Tab $active={activeTab === 'account'} onClick={() => setActiveTab('account')}>
            Account Details
          </Tab>
          <Tab $active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')}>
            Notifications
          </Tab>
          <Tab $active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
            Security
          </Tab>
        </TabBar>

        {activeTab === 'account' && (
          <ContentCard>
            {/* Basic Details Section */}
            <FormSection>
              <SectionHeader>
                <SectionTitle>Basic Details</SectionTitle>
              </SectionHeader>
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
            </FormSection>

            {/* Bank Details Section */}
            <FormSection>
              <SectionHeader>
                <SectionTitle>Bank Details</SectionTitle>
              </SectionHeader>
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
            </FormSection>

            {/* Business Documentation Section */}
            <FormSection>
              <SectionHeader>
                <SectionTitle>Business Documentation</SectionTitle>
              </SectionHeader>
              <FormGrid>
                <FormField>
                  <Label>GSTIN</Label>
                  <Input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    placeholder="Enter GSTIN"
                  />
                </FormField>

                <FormField>
                  <Label>
                    PAN <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    placeholder="Enter PAN"
                    required
                  />
                </FormField>

                <FormFieldFull>
                  <Label>
                    Business Address <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete business address"
                    required
                  />
                </FormFieldFull>

                <FormField>
                  <Label>
                    City <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                  />
                </FormField>

                <FormField>
                  <Label>
                    State <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    required
                  />
                </FormField>

                <FormField>
                  <Label>
                    Pincode <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter pincode"
                    maxLength={6}
                    required
                  />
                </FormField>
              </FormGrid>
            </FormSection>

            {/* Action Button */}
            <ActionSection>
              <SaveButton onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? 'Submitting...' : 'Save & Submit for Verification'}
              </SaveButton>
            </ActionSection>
          </ContentCard>
        )}

        {activeTab === 'notifications' && (
          <ContentCard>
            <FormSection>
              <SectionHeader>
                <SectionTitle>Webhook Notification</SectionTitle>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Webhook URL</Label>
                  <Input
                    type="url"
                    placeholder="https://your-domain.com/webhook"
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeader>
                <SectionTitle>SMS Notification</SectionTitle>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Mobile Number</Label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeader>
                <SectionTitle>Email Notification</SectionTitle>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="notifications@example.com"
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <ActionSection>
              <SaveButton>Save Notification Settings</SaveButton>
            </ActionSection>
          </ContentCard>
        )}

        {activeTab === 'security' && (
          <ContentCard>
            <FormSection>
              <SectionHeader>
                <SectionTitle>API Keys</SectionTitle>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Public Key</Label>
                  <Input
                    type="text"
                    placeholder="pk_live_..."
                    readOnly
                  />
                </FormFieldFull>
                <FormFieldFull>
                  <Label>Secret Key</Label>
                  <Input
                    type="password"
                    placeholder="sk_live_..."
                    readOnly
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <ActionSection>
              <SaveButton>Regenerate API Keys</SaveButton>
            </ActionSection>
          </ContentCard>
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default VerificationPage;

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AccentLine = styled.div`
  width: 4px;
  height: 32px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 2px;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary}10;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BannerIcon = styled.div`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const BannerText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const TabBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: none;
  border: none;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContentCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const FormSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

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
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9375rem;
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
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9375rem;
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
  margin-top: -${({ theme }) => theme.spacing.xs};
`;

const ActionSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 0.875rem 2rem;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
