'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const TestimonialsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`;

const Container = styled.div`
  max-width: 1200px;
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

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const CarouselWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: ${({ theme }) => theme.spacing.md} 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 769px) {
    overflow-x: hidden;
  }
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  width: fit-content;
`;

const TestimonialCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 450px;
  max-width: 450px;
  flex-shrink: 0;
  height: 280px;

  @media (max-width: 1024px) {
    min-width: 400px;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    min-width: 320px;
    max-width: 320px;
    height: auto;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.neon};
    transform: translateY(-5px);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 769px) {
    display: none;
  }
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.2);
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.warning};
`;

const TestimonialText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  font-size: 0.95rem;
  flex-grow: 1;
  font-style: italic;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    -webkit-line-clamp: unset;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const AuthorName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const AuthorRole = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO, ShopKart India',
      rating: 5,
      text: 'Davspay has transformed our payment experience. The integration was seamless, and our payment success rate improved from 85% to 98%. The instant settlements have significantly improved our cash flow.',
    },
    {
      name: 'Priya Sharma',
      role: 'CTO, EduTech Solutions',
      rating: 5,
      text: 'The API documentation is excellent and the developer support team is incredibly responsive. We integrated Davspay in just 2 days and have been processing thousands of transactions smoothly ever since.',
    },
    {
      name: 'Amit Patel',
      role: 'Director, FreshMart Online',
      rating: 5,
      text: "We've been using Davspay for our grocery delivery platform for 6 months now. The UPI integration is flawless, and customers love the quick checkout process. Highly recommended!",
    },
    {
      name: 'Sneha Reddy',
      role: 'Product Manager, FinServe',
      rating: 5,
      text: 'The dashboard analytics are comprehensive and help us make data-driven decisions. The fraud detection system has saved us from multiple suspicious transactions. Excellent service!',
    },
    {
      name: 'Vikram Singh',
      role: 'Co-founder, TravelBuddy',
      rating: 5,
      text: 'Switching to Davspay was the best decision for our travel booking platform. The transaction fees are competitive, and the 24/7 support team is always there when we need them.',
    },
    {
      name: 'Ananya Iyer',
      role: 'Operations Head, MedCare Plus',
      rating: 5,
      text: 'As a healthcare platform, security is our top priority. Davspay\'s PCI DSS compliance and bank-grade encryption give us and our patients complete peace of mind.',
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isDragging && window.innerWidth >= 769) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isDragging, testimonials.length]);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <TestimonialsSection>
      <Container>
        <SectionHeader>
          <SectionBadge
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Testimonials
          </SectionBadge>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Trusted by <span className="gradient-text">1600+ Businesses</span>
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            See what our customers have to say about their experience with Davspay
          </SectionDescription>
        </SectionHeader>

        <CarouselContainer>
          <CarouselWrapper>
            <CarouselTrack
              animate={{
                x: typeof window !== 'undefined' && window.innerWidth >= 769
                  ? `-${currentIndex * (450 + 32)}px`
                  : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              drag={typeof window !== 'undefined' && window.innerWidth < 769 ? "x" : false}
              dragConstraints={{
                left: typeof window !== 'undefined' && window.innerWidth < 769
                  ? -((testimonials.length - 1) * (320 + 32))
                  : 0,
                right: 0
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <StarRating>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" />
                    ))}
                  </StarRating>
                  <TestimonialText>"{testimonial.text}"</TestimonialText>
                  <TestimonialAuthor>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                  </TestimonialAuthor>
                </TestimonialCard>
              ))}
            </CarouselTrack>
          </CarouselWrapper>

          <DotsContainer>
            {testimonials.map((_, index) => (
              <Dot
                key={index}
                $active={index === currentIndex}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </DotsContainer>
        </CarouselContainer>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;
