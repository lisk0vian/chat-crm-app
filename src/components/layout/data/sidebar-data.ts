import {
  LayoutDashboard,
  ListTodo,
  HelpCircle,
  Settings,
  UserCog,
  Users,
  MessagesSquare,
  AudioWaveform,
  GalleryVerticalEnd,
  Plug,
  MessageSquare,
  NotebookTabs,
  House,
} from 'lucide-react'

import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'J&P Perifericos SAC',
      logo: House,
      plan: 'Chat CRM',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Contacts',
          url: '/contacts',
          icon: NotebookTabs,
        },
        {
          title: 'Chats',
          url: '/chats',
          // badge: '3', // TODO: This is for chat notifications
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Integrations',
              icon: Plug,
              items: [
                {
                  title: 'WhatsApp',
                  url: '/settings/integrations/whatsapp',
                  icon: MessageSquare,
                },
              ],
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
