'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
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

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
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

const ForgotPassword = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupPrompt = styled.p`
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  }
`;

const OtpInfo = styled.div`
  padding: 0.875rem;
  background: ${({ theme }) => theme.colors.primary}10;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // If OTP step, verify OTP
      if (showOtpInput) {
        const otpResponse = await fetch('http://localhost:5000/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, otp })
        });

        const otpData = await otpResponse.json();

        if (otpData.success) {
          // OTP verified, now complete login
          const success = await login(email, password, rememberMe);
          if (success) {
            router.push('/dashboard');
          } else {
            setError('Login failed. Please try again.');
          }
        } else {
          setError(otpData.message || 'Invalid OTP');
        }
      } else {
        // First, verify credentials
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const loginData = await loginResponse.json();

        if (loginData.success && loginData.data?.user?.phone) {
          // User has phone number, send OTP
          const phone = loginData.data.user.phone;
          setUserPhone(phone);

          const otpResponse = await fetch('http://localhost:5000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
          });

          const otpData = await otpResponse.json();

          if (otpData.success) {
            setSessionId(otpData.session_id);
            setShowOtpInput(true);
            setError('');
          } else {
            setError(otpData.message || 'Failed to send OTP');
          }
        } else if (loginData.success) {
          // No phone number, login directly
          const success = await login(email, password, rememberMe);
          if (success) {
            router.push('/dashboard');
          }
        } else {
          setError(loginData.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <LogoText>Davspay</LogoText>
        </Logo>

        <Title>Welcome back</Title>
        <Subtitle>Sign in to your dashboard</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {showOtpInput && <OtpInfo>OTP sent to {userPhone}. Please enter the code below.</OtpInfo>}

        <Form onSubmit={handleSubmit}>
          {!showOtpInput ? (
            <>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <InputWrapper>
                  <FiMail />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputWrapper>
              </InputGroup>

              <CheckboxWrapper>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me for 30 days</label>
              </CheckboxWrapper>

              <ForgotPassword href="#">Forgot password?</ForgotPassword>
            </>
          ) : (
            <InputGroup>
              <Label htmlFor="otp">Enter OTP</Label>
              <InputWrapper>
                <FiLock />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </InputWrapper>
            </InputGroup>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? (showOtpInput ? 'Verifying OTP...' : 'Signing in...') : (showOtpInput ? 'Verify OTP' : 'Sign in')}
            {!loading && <FiArrowRight style={{ marginLeft: '0.5rem' }} />}
          </Button>
        </Form>

        <SignupPrompt>
          Don't have an account? <Link href="/register">Sign up</Link>
        </SignupPrompt>

        <BackHome href="/">← Back to home</BackHome>
      </LoginCard>
    </PageContainer>
  );
}
