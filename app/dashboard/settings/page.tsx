'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiInfo, FiSave } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SettingsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    // Profile
    fullName: '',
    email: '',
    phone: '',

    // Notifications
    webhookUrl: '',
    smsNumber: '',
    emailNotification: '',

    // API Keys (read-only display)
    publicKey: 'pk_live_xxxxxxxxxxxxxx',
    secretKey: 'sk_live_xxxxxxxxxxxxxx',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
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
            Manage your account settings, notification preferences, and API credentials from this page.
          </BannerText>
        </InfoBanner>

        <TabBar>
          <Tab $active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
            Profile
          </Tab>
          <Tab $active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')}>
            Notifications
          </Tab>
          <Tab $active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
            Security
          </Tab>
        </TabBar>

        {activeTab === 'profile' && (
          <ContentCard>
            <FormSection>
              <SectionHeader>
                <SectionTitle>Profile Information</SectionTitle>
                <SectionDescription>Update your personal information</SectionDescription>
              </SectionHeader>
              <FormGrid>
                <FormField>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </FormField>

                <FormField>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </FormField>

                <FormField>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </FormField>
              </FormGrid>
            </FormSection>

            <ActionSection>
              <SaveButton onClick={handleSave} disabled={isSaving}>
                <FiSave />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </SaveButton>
            </ActionSection>
          </ContentCard>
        )}

        {activeTab === 'notifications' && (
          <ContentCard>
            <FormSection>
              <SectionHeader>
                <SectionTitle>Webhook Notification</SectionTitle>
                <SectionDescription>Configure webhook URL for transaction callbacks</SectionDescription>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Webhook URL</Label>
                  <Input
                    type="url"
                    name="webhookUrl"
                    value={formData.webhookUrl}
                    onChange={handleInputChange}
                    placeholder="https://your-domain.com/webhook"
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeader>
                <SectionTitle>SMS Notification</SectionTitle>
                <SectionDescription>Receive SMS alerts for critical events</SectionDescription>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Mobile Number</Label>
                  <Input
                    type="tel"
                    name="smsNumber"
                    value={formData.smsNumber}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeader>
                <SectionTitle>Email Notification</SectionTitle>
                <SectionDescription>Get email updates about your transactions</SectionDescription>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="emailNotification"
                    value={formData.emailNotification}
                    onChange={handleInputChange}
                    placeholder="notifications@example.com"
                  />
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <ActionSection>
              <SaveButton onClick={handleSave} disabled={isSaving}>
                <FiSave />
                {isSaving ? 'Saving...' : 'Save Notification Settings'}
              </SaveButton>
            </ActionSection>
          </ContentCard>
        )}

        {activeTab === 'security' && (
          <ContentCard>
            <FormSection>
              <SectionHeader>
                <SectionTitle>API Credentials</SectionTitle>
                <SectionDescription>Your API keys for integrating DavsPay into your application</SectionDescription>
              </SectionHeader>
              <FormGrid>
                <FormFieldFull>
                  <Label>Public Key</Label>
                  <Input
                    type="text"
                    value={formData.publicKey}
                    readOnly
                  />
                  <HelpText>Use this key in your frontend application</HelpText>
                </FormFieldFull>
                <FormFieldFull>
                  <Label>Secret Key</Label>
                  <Input
                    type="password"
                    value={formData.secretKey}
                    readOnly
                  />
                  <HelpText>Keep this key secure and never expose it in client-side code</HelpText>
                </FormFieldFull>
              </FormGrid>
            </FormSection>

            <ActionSection>
              <RegenerateButton onClick={() => alert('Contact support to regenerate API keys')}>
                Regenerate API Keys
              </RegenerateButton>
            </ActionSection>
          </ContentCard>
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default SettingsPage;

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
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary}15;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
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
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
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

  &:read-only {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    cursor: not-allowed;
  }
`;

const HelpText = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: -${({ theme }) => theme.spacing.xs};
`;

const ActionSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const RegenerateButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.875rem 2rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error}10;
  }
`;
