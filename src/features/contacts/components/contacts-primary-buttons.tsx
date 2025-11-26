import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImportButton from '@/features/contacts/components/import-button'
import { useContacts } from './contacts-provider'

export function ContactsPrimaryButtons() {
  const { setOpen } = useContacts()

  return (
    <div className='flex gap-2'>
      <ImportButton />
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Contact</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
