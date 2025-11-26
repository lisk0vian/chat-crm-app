import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { importContacts } from '@/services/contact.service'
import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'

function useImportCsv() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => importContacts(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', 'table'] })
      toast.success(`Se importaron ${data.count} contactos`)
    },
    onError: () => {
      toast.error('Error al importar contactos')
    },
  })
}

export default function ImportButton() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { mutate, isPending } = useImportCsv()

  return (
    <div>
      <Input
        ref={fileInputRef}
        id='csv'
        type='file'
        accept='.csv'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) mutate(file)
        }}
      />
      <label htmlFor='csv'>
        <LoadingButton
          className='h-9 space-x-1'
          onClick={() => fileInputRef.current?.click()}
          loading={isPending}
        >
          <span>Import</span> <Download size={18} />
        </LoadingButton>
      </label>
    </div>
  )
}
