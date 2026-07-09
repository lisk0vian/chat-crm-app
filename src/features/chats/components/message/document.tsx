import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { getFileExtension, getFileSize, humanFileSize } from '@/lib/metadata'
import {
  DownloadButton,
  type DownloadButtonState,
} from '@/components/download-button'
import { MessageTime } from './time'

const apiUrl = import.meta.env.VITE_API_URL

type MessageDocProps = {
  url: string
  caption?: string
  time: Date | string
}
export const MessageDocument = ({ url, caption, time }: MessageDocProps) => {
  const fileUrl = apiUrl + url
  const fileExt = getFileExtension(caption ?? '').toLocaleUpperCase()

  const [state, setState] = useState<DownloadButtonState>('idle')
  const [progress, setProgress] = useState(0)
  const [fileSize, setFileSize] = useState<string>('')

  useEffect(() => {
    getFileSize(fileUrl).then((size) => {
      if (size) setFileSize(humanFileSize(parseInt(size)))
    })
  }, [fileUrl])

  async function handleDownload() {
    setState('downloading')
    setProgress(0)

    try {
      const res = await fetch(fileUrl)
      if (!res.ok || !res.body)
        throw new Error('The file could not be downloaded')

      const total = Number(res.headers.get('content-length') ?? 0)
      const reader = res.body.getReader()
      const chunks: BlobPart[] = []
      let received = 0

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        received += value.length
        if (total) setProgress((received / total) * 100)
      }

      const blob = new Blob(chunks)
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = caption ?? 'file'
      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(blobUrl)

      setProgress(100)
      setState('complete')
    } catch (err) {
      console.error(err)
      setState('error')
    }
  }

  return (
    <div className='flex w-80 flex-row items-center'>
      <div className='bg-accent-foreground/10 dark:bg-accent/50 mb-5.5 flex w-full items-center justify-between rounded-xl p-3'>
        <FileText className='mr-2' size={35} />
        <div className='text-muted-foreground ml-2 flex w-full flex-col justify-center text-sm dark:text-neutral-50'>
          <p className='break-all'>
            {caption}
            {/* This span creates fixed blank spacing inside the chat bubble,
            so the timestamp aligns visually like in WhatsApp */}
            <span className='ml-1 inline-flex'>&nbsp;&nbsp;&nbsp;</span>
          </p>
          <p className='text-accent-foreground/50 pt-1 text-xs font-extralight'>{`${fileExt} • ${fileSize}`}</p>
        </div>
        <DownloadButton
          aria-label={`Descargar ${caption}`}
          state={state}
          progress={progress}
          onDownload={handleDownload}
          autoResetMs={2_000}
          size={'icon'}
        />
      </div>
      <MessageTime time={time} />
    </div>
  )
}
