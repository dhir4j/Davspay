'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to developers page
    router.push('/developers');
  }, [router]);

  return null;
}
