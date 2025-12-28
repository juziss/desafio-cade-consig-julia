// ============ ENUMS ============

export type TipoPlano = 'BASICO' | 'PRO' | 'ENTERPRISE';
export type StatusContrato = 'ATIVO' | 'INATIVO';

// Valores para exibição e filtros
export const TIPO_PLANO_OPTIONS = [
  { value: 'Basico', label: 'Básico' },
  { value: 'Pro', label: 'Pro' },
  { value: 'Enterprise', label: 'Enterprise' },
] as const;

export const STATUS_OPTIONS = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
] as const;

// ============ AUTH ============

export interface LoginRequest {
  usuario: string;
  senha: string;
}

export interface LoginResponse {
  access_token: string;
}

// ============ CONTRATOS ============

export interface Contrato {
  id_contrato: string;
  nome_cliente: string;
  email_cliente: string;
  tipo_plano: TipoPlano;
  valor_mensal: string;
  status: StatusContrato;
  data_inicio: string;
  created_at: string;
  updated_at: string;
}

export interface ContratosFilters {
  id_contrato?: string;
  nome_cliente?: string;
  email_cliente?: string;
  tipo_plano?: string;
  status?: string;
  valor_mensal?: string;
  data_inicio?: string;
  page?: number;
  limit?: number;
}

export interface ContratosResponse {
  items: Contrato[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UploadResponse {
  inserted: number;
}

// ============ API ERROR ============

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
}
