'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, uploadFile } from '@/lib/api';
import { ContratosFilters, ContratosResponse, UploadResponse } from '@/types';

export function useContratos(filters: ContratosFilters) {
  return useQuery({
    queryKey: ['contratos', filters],
    queryFn: async () => {
      const response = await api<ContratosResponse>('/contratos', {
        params: filters as Record<string, string | number | undefined>,
      });
      return response;
    },
  });
}

export function useUploadContratos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await uploadFile<UploadResponse>(
        '/contratos/upload',
        file
      );
      return response;
    },
    onSuccess: () => {
      // Invalida o cache para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ['contratos'] });
    },
  });
}
