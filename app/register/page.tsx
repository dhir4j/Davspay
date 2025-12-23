'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiPhone, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const RegisterCard = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  padding-left: 3rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ErrorMessage = styled.div`
  padding: 0.875rem;
  background: ${({ theme }) => theme.colors.error}10;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SuccessMessage = styled.div`
  padding: 0.875rem;
  background: ${({ theme }) => theme.colors.success}10;
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PasswordHint = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: -0.25rem;
`;

const LoginPrompt = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackHome = styled(Link)`
  display: inline-block;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const success = await register({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        company_name: formData.companyName,
        phone: formData.phone,
      });

      if (success) {
        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError('Registration failed. Please check your details and try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <LogoText>Davspay</LogoText>
        </Logo>

        <Title>Create your account</Title>
        <Subtitle>Start accepting payments today</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <InputWrapper>
              <FiUser />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <FiMail />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="companyName">Company Name</Label>
            <InputWrapper>
              <FiBriefcase />
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Your Company Ltd."
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <InputWrapper>
              <FiPhone />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <FiLock />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </InputWrapper>
            <PasswordHint>Must be at least 8 characters long</PasswordHint>
          </InputGroup>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
            {!loading && <FiArrowRight style={{ marginLeft: '0.5rem' }} />}
          </Button>
        </Form>

        <LoginPrompt>
          Already have an account? <Link href="/login">Sign in</Link>
        </LoginPrompt>

        <BackHome href="/">← Back to home</BackHome>
      </RegisterCard>
    </PageContainer>
  );
}
