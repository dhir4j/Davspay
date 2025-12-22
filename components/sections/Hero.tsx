'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import Button from '@/components/ui/Button';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  padding-top: calc(${({ theme }) => theme.spacing.xxl} + 70px);

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.sm};
    padding-top: calc(${({ theme }) => theme.spacing.xl} + 70px);
    min-height: auto;
  }
`;

const GlowOrb = styled(motion.div)<{ $top?: string; $left?: string; $color?: string }>`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${({ $color, theme }) => $color || theme.colors.primary};
  filter: blur(100px);
  opacity: 0.2;
  top: ${({ $top }) => $top || '50%'};
  left: ${({ $left }) => $left || '50%'};
  transform: translate(-50%, -50%);
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;

  svg {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.secondary};

  .gradient-text {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: glow 3s ease-in-out infinite;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
  line-height: 1.8;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 900px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface}80;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.neon};
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto ${({ theme }) => theme.spacing.sm} auto;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatValue = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeroBottomImage = styled(motion.div)`
  max-width: 900px;
  margin: ${({ theme }) => theme.spacing.xxl} auto 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <HeroSection>
      <GlowOrb
        $top="20%"
        $left="20%"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <GlowOrb
        $top="80%"
        $left="80%"
        $color="#60A5FA"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Badge
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <FiZap />
            Powered by UPI Technology
          </Badge>

          <Title variants={itemVariants}>
            Next-Gen Payment
            <br />
            Gateway for <span className="gradient-text">Modern India</span>
          </Title>

          <Subtitle variants={itemVariants}>
            Accept UPI payments instantly with Davspay Solution. Fast, secure,
            and built for businesses that move at the speed of innovation.
          </Subtitle>

          <CTAButtons variants={itemVariants}>
            <Link href="/pricing">
              <Button variant="primary" size="lg">
                Get Started Free
                <FiArrowRight style={{ marginLeft: '0.5rem' }} />
              </Button>
            </Link>
            <Link href="/developers">
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </Link>
          </CTAButtons>

          <StatsContainer variants={itemVariants}>
            <StatCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <StatIcon>
                <FiZap />
              </StatIcon>
              <StatValue>99.9%</StatValue>
              <StatLabel>Uptime Guaranteed</StatLabel>
            </StatCard>

            <StatCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <StatIcon>
                <FiShield />
              </StatIcon>
              <StatValue>100%</StatValue>
              <StatLabel>Secure Transactions</StatLabel>
            </StatCard>

            <StatCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <StatIcon>
                <FiTrendingUp />
              </StatIcon>
              <StatValue>&lt;2s</StatValue>
              <StatLabel>Average Response Time</StatLabel>
            </StatCard>
          </StatsContainer>

          <HeroBottomImage
            variants={itemVariants}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Image
              src="/images/bottom_of_hero.gif"
              alt="Payment Animation"
              width={900}
              height={400}
              style={{ width: '100%', height: 'auto' }}
              unoptimized
            />
          </HeroBottomImage>
        </motion.div>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
