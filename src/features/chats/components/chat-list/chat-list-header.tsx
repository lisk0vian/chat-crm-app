import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useChats } from '../../contexts/chats.provider'
import { Edit, MessagesSquare, SearchIcon } from '../icons'

export const ChatListHeader = ({
  searchState,
}: {
  searchState: {
    setSearch: (s: string) => void
    search: string
  }
}) => {
  const { setSearchClientDialog } = useChats()

  return (
    <div
      className={cn(
        'bg-background sticky top-0 z-10 -mx-4 px-4 pb-3',
        'shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'
      )}
    >
      <div className='flex items-center justify-between py-2'>
        <div className='flex gap-2'>
          <h1 className='text-2xl font-bold'>Inbox</h1>
          <MessagesSquare size={20} />
        </div>

        <Button
          size='icon'
          variant='ghost'
          onClick={() => {
            setSearchClientDialog(true)
            console.log('despues del click')
          }}
          className='rounded-lg'
        >
          <Edit size={24} className='stroke-muted-foreground' />
        </Button>
      </div>

      <label
        className={cn(
          'focus-within:ring-ring focus-within:ring-1 focus-within:outline-hidden',
          'border-border flex h-10 w-full items-center space-x-0 rounded-md border ps-2'
        )}
      >
        <SearchIcon size={15} className='me-2 stroke-slate-500' />
        <span className='sr-only'>Search</span>
        <input
          type='text'
          className='w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden'
          placeholder='Search chat...'
          value={searchState.search}
          onChange={(e) => searchState.setSearch(e.target.value)}
        />
      </label>
    </div>
  )
}
