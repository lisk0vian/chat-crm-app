// Restored hook (was deleted in 88eff9f while the view still imports it),
// adapted to the current service + schema. Keeps the same public API the
// view expects: { form, onSubmit, isSaving, isLoading }.
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  defaultValues,
  schema,
  type WhatsAppConfig,
} from '@/schemas/whatsapp-config.schema'
import { getConfig, saveConfig } from '@/services/whatsapp.service'

export const useWhatsAppConfig = (businessId?: string) => {
  const queryClient = useQueryClient()
  const form = useForm<WhatsAppConfig>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const query = useQuery({
    queryKey: ['whatsapp', businessId],
    queryFn: () => getConfig(businessId!),
    enabled: Boolean(businessId),
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Error al cargar la configuración')
    }
  }, [query.error])

  useEffect(() => {
    if (query.data) {
      form.reset(query.data as WhatsAppConfig)
    }
  }, [query.data, form])

  const mutation = useMutation({
    mutationFn: (vals: WhatsAppConfig) => saveConfig(businessId!, vals),
    onSuccess: () => {
      toast.success('Configuración guardada correctamente')
      queryClient.invalidateQueries({ queryKey: ['whatsapp', businessId] })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Error al guardar la configuración')
    },
  })

  const onSubmit = (vals: WhatsAppConfig) => {
    mutation.mutate(vals)
  }

  return {
    form,
    onSubmit,
    isLoading: query.isLoading,
    isSaving: mutation.isPending,
  }
}
