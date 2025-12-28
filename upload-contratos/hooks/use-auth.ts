'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { setToken, removeToken } from '@/lib/auth';
import { LoginRequest, LoginResponse } from '@/types';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api<LoginResponse>('/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
      router.push('/contratos');
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return () => {
    removeToken();
    router.push('/login');
  };
}
