'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiKey, FiEye, FiEyeOff, FiCopy, FiCheckCircle, FiPlus, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import VerificationRequired from '@/components/VerificationRequired';
import { useState } from 'react';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderContent = styled.div``;

const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AlertBox = styled.div`
  background: ${({ theme }) => theme.colors.primary}10;
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const AlertContent = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const KeysGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const KeyCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const KeyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const KeyInfo = styled.div`
  flex: 1;
`;

const KeyLabel = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const KeyDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const KeyActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IconButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
    background: ${({ theme }) => theme.colors.error}10;
  }
`;

const KeyValueBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
`;

const KeyValue = styled.div<{ $hidden: boolean }>`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-all;
  filter: ${({ $hidden }) => ($hidden ? 'blur(6px)' : 'none')};
  user-select: ${({ $hidden }) => ($hidden ? 'none' : 'text')};
`;

const KeyMetadata = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const MetadataItem = styled.div``;

const MetadataLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const MetadataValue = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export default function APIKeysPage() {
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const apiKeys = [
    {
      id: 'test_key',
      label: 'Test API Key',
      description: 'Use this key for testing in development environment',
      value: 'test_' + 'sk_' + Math.random().toString(36).substr(2, 32),
      secret: 'test_' + 'secret_' + Math.random().toString(36).substr(2, 48),
      created: new Date().toLocaleDateString(),
      lastUsed: 'Never',
      environment: 'Test',
    },
    {
      id: 'live_key',
      label: 'Live API Key',
      description: 'Use this key for production transactions',
      value: 'live_' + 'pk_' + Math.random().toString(36).substr(2, 32),
      secret: 'live_' + 'secret_' + Math.random().toString(36).substr(2, 48),
      created: new Date().toLocaleDateString(),
      lastUsed: 'Never',
      environment: 'Production',
    },
  ];

  return (
    <VerificationRequired>
      <DashboardLayout>
        <PageHeader>
          <HeaderContent>
            <PageTitle>API Keys</PageTitle>
            <PageSubtitle>Manage your API keys for authenticating requests</PageSubtitle>
          </HeaderContent>
          <Button variant="primary" size="md">
            <FiPlus style={{ marginRight: '0.5rem' }} />
            Generate New Key
          </Button>
        </PageHeader>

        <AlertBox>
          <FiAlertCircle />
          <AlertContent>
            <strong>Keep your API keys secure!</strong>
            <br />
            Never share your secret keys publicly or commit them to version control. If you believe a key has been
            compromised, delete it immediately and generate a new one.
          </AlertContent>
        </AlertBox>

        <KeysGrid>
          {apiKeys.map((key, index) => (
            <KeyCard
              key={key.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <KeyHeader>
                <KeyInfo>
                  <KeyLabel>
                    <FiKey style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    {key.label}
                  </KeyLabel>
                  <KeyDescription>{key.description}</KeyDescription>
                </KeyInfo>
                <KeyActions>
                  <DeleteButton>
                    <FiTrash2 />
                  </DeleteButton>
                </KeyActions>
              </KeyHeader>

              <div style={{ marginBottom: '1rem' }}>
                <MetadataLabel style={{ marginBottom: '0.5rem' }}>API Key</MetadataLabel>
                <KeyValueBox>
                  <KeyValue $hidden={!visibleKeys[key.id + '_key']}>{key.value}</KeyValue>
                  <IconButton onClick={() => toggleKeyVisibility(key.id + '_key')}>
                    {visibleKeys[key.id + '_key'] ? <FiEyeOff /> : <FiEye />}
                  </IconButton>
                  <IconButton onClick={() => copyToClipboard(key.value, key.id + '_key')}>
                    {copiedKey === key.id + '_key' ? <FiCheckCircle /> : <FiCopy />}
                  </IconButton>
                </KeyValueBox>
              </div>

              <div>
                <MetadataLabel style={{ marginBottom: '0.5rem' }}>API Secret</MetadataLabel>
                <KeyValueBox>
                  <KeyValue $hidden={!visibleKeys[key.id + '_secret']}>{key.secret}</KeyValue>
                  <IconButton onClick={() => toggleKeyVisibility(key.id + '_secret')}>
                    {visibleKeys[key.id + '_secret'] ? <FiEyeOff /> : <FiEye />}
                  </IconButton>
                  <IconButton onClick={() => copyToClipboard(key.secret, key.id + '_secret')}>
                    {copiedKey === key.id + '_secret' ? <FiCheckCircle /> : <FiCopy />}
                  </IconButton>
                </KeyValueBox>
              </div>

              <KeyMetadata>
                <MetadataItem>
                  <MetadataLabel>Environment</MetadataLabel>
                  <MetadataValue>{key.environment}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Created</MetadataLabel>
                  <MetadataValue>{key.created}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Last Used</MetadataLabel>
                  <MetadataValue>{key.lastUsed}</MetadataValue>
                </MetadataItem>
              </KeyMetadata>
            </KeyCard>
          ))}
        </KeysGrid>
      </DashboardLayout>
    </VerificationRequired>
  );
}
