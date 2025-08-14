'use client';

import { useRouter } from 'next/navigation';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-bee-200 flex items-center justify-center p-4">
      <SignupForm onSuccess={handleSuccess} />
    </div>
  );
} 