'use client';

import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { useContratos } from '@/hooks/use-contratos';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TIPO_PLANO_OPTIONS, STATUS_OPTIONS } from '@/types';

export default function ContratosPage() {
  // Estado dos filtros na URL usando nuqs
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit] = useQueryState('limit', parseAsInteger.withDefault(20));
  const [nomeCliente, setNomeCliente] = useQueryState('nome_cliente', parseAsString.withDefault(''));
  const [emailCliente, setEmailCliente] = useQueryState('email_cliente', parseAsString.withDefault(''));
  const [tipoPlano, setTipoPlano] = useQueryState('tipo_plano', parseAsString.withDefault(''));
  const [status, setStatus] = useQueryState('status', parseAsString.withDefault(''));

  const { data, isLoading, isError, error } = useContratos({
    page,
    limit,
    nome_cliente: nomeCliente || undefined,
    email_cliente: emailCliente || undefined,
    tipo_plano: tipoPlano || undefined,
    status: status || undefined,
  });

  function handleClearFilters() {
    setNomeCliente('');
    setEmailCliente('');
    setTipoPlano('');
    setStatus('');
    setPage(1);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  function formatCurrency(value: string) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os contratos por diferentes critérios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Nome do cliente"
              value={nomeCliente}
              onChange={(e) => {
                setNomeCliente(e.target.value);
                setPage(1);
              }}
            />
            <Input
              placeholder="Email do cliente"
              value={emailCliente}
              onChange={(e) => {
                setEmailCliente(e.target.value);
                setPage(1);
              }}
            />
            <Select
              value={tipoPlano}
              onValueChange={(value) => {
                setTipoPlano(value);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de plano" />
              </SelectTrigger>
              <SelectContent>
                {TIPO_PLANO_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contratos</CardTitle>
          <CardDescription>
            {data ? `${data.total} contratos encontrados` : 'Carregando...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Carregando contratos...
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              Erro ao carregar contratos: {(error as Error).message}
            </div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum contrato encontrado
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Início</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.items.map((contrato) => (
                      <TableRow key={contrato.id_contrato}>
                        <TableCell className="font-medium">
                          {contrato.nome_cliente}
                        </TableCell>
                        <TableCell>{contrato.email_cliente}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{contrato.tipo_plano}</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(contrato.valor_mensal)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={contrato.status === 'ATIVO' ? 'default' : 'secondary'}
                          >
                            {contrato.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(contrato.data_inicio)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginação */}
              {data && data.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    Página {data.page} de {data.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= data.totalPages}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
