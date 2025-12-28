'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUploadContratos } from '@/hooks/use-contratos';
import { ApiError } from '@/types';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const upload = useUploadContratos();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  async function handleUpload() {
    if (!selectedFile) {
      toast.error('Selecione um arquivo CSV');
      return;
    }

    try {
      const result = await upload.mutateAsync(selectedFile);
      toast.success(`Upload realizado! ${result.inserted} contratos inseridos.`);
      setSelectedFile(null);
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.errors && apiError.errors.length > 0) {
        toast.error(
          <div>
            <p className="font-medium">{apiError.message}</p>
            <ul className="mt-2 text-sm list-disc list-inside">
              {apiError.errors.slice(0, 5).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
              {apiError.errors.length > 5 && (
                <li>... e mais {apiError.errors.length - 5} erros</li>
              )}
            </ul>
          </div>
        );
      } else {
        toast.error(apiError.message || 'Erro ao fazer upload');
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload de Contratos</CardTitle>
          <CardDescription>
            Envie um arquivo CSV com até 100 contratos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            {selectedFile ? (
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            ) : isDragActive ? (
              <p className="text-gray-600">Solte o arquivo aqui...</p>
            ) : (
              <div>
                <p className="text-gray-600">
                  Arraste um arquivo CSV ou clique para selecionar
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Apenas arquivos .csv com até 100 linhas
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || upload.isPending}
              className="flex-1"
            >
              {upload.isPending ? 'Enviando...' : 'Enviar'}
            </Button>
            {selectedFile && (
              <Button
                variant="outline"
                onClick={() => setSelectedFile(null)}
                disabled={upload.isPending}
              >
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
