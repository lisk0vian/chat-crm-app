import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImportButton from '@/features/users/components/import-button'
import { useUsers } from './users-provider'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      <ImportButton />
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
