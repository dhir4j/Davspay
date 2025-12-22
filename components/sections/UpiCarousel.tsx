'use client';

import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const CarouselSection = styled.section`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 3rem;
  animation: ${scroll} 20s linear infinite;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  gap: 3rem;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const UpiCarousel = () => {
  const upiLogos = [
    { name: 'AIPL', src: '/images/upi/aipl.png' },
    { name: 'DMRC', src: '/images/upi/dmrc.png' },
    { name: 'Hudle', src: '/images/upi/hudle.png' },
    { name: 'IndiaMART', src: '/images/upi/indiamart.png' },
    { name: 'IRCTC', src: '/images/upi/irctc.png' },
    { name: 'Muffine Pay', src: '/images/upi/muffine-pay.png' },
    { name: 'Pelocal', src: '/images/upi/pelocal.png' },
    { name: 'Pice', src: '/images/upi/pice.png' },
    { name: 'Radius', src: '/images/upi/radius.png' },
    { name: 'Uber', src: '/images/upi/uber.png' },
  ];

  return (
    <CarouselSection>
      <CarouselTrack>
        <CarouselWrapper>
          {upiLogos.map((logo, index) => (
            <LogoContainer key={`first-${index}`}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={80}
                height={40}
                style={{ objectFit: 'contain' }}
              />
            </LogoContainer>
          ))}
        </CarouselWrapper>
        {/* Duplicate for seamless loop */}
        <CarouselWrapper>
          {upiLogos.map((logo, index) => (
            <LogoContainer key={`second-${index}`}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={80}
                height={40}
                style={{ objectFit: 'contain' }}
              />
            </LogoContainer>
          ))}
        </CarouselWrapper>
      </CarouselTrack>
    </CarouselSection>
  );
};

export default UpiCarousel;
