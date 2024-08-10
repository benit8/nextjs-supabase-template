'use client';

import { useQuery } from '@tanstack/react-query';
import { Eye, InboxIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function NotificationMenu() {
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);

  const { data: unreadCount } = useQuery({
    queryKey: ['notifications', 'count'],
    queryFn: async () => {
      const supabase = createClient();
      const { error, count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);
      if (error) throw error;
      return count;
    },
    enabled: open,
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <InboxIcon size={20} />
          <span className="sr-only">Toggle notifications menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-96 px-0">
        <div className="gap-y-2">
          {/* Header & tabs */}
          <div className="py-2 px-4">{t('Notifications')}</div>

          <Tabs defaultValue="unread">
            <TabsList className="px-4">
              <TabsTrigger value="unread" className="gap-x-2">
                Inbox
                <Badge variant="outline" className="px-1.5 py-[0.125rem]">
                  {unreadCount ?? 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="read">Archived</TabsTrigger>
            </TabsList>

            {/* Contents */}
            <TabsContent value="unread">
              <Inbox />
            </TabsContent>
            <TabsContent value="read">
              <Archive />
            </TabsContent>
          </Tabs>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Inbox() {
  const { data } = useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: async () => {
      const supabase = createClient();
      const { error, data } = await supabase.from('notifications').select('*').eq('read', false);
      if (error) throw error;
      return data;
    },
  });

  if (data?.length === 0) {
    return (
      <div className="h-72 flex flex-col gap-y-4 items-center justify-center text-muted-foreground">
        <InboxIcon size={32} />
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-center">All caught up</span>
          <span className="w-60 mx-auto text-xs text-center">
            You will be notified here for any notices on your accounts
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-72 flex flex-col">
      {data?.map((notification) => (
        <div key={notification.id} className="flex py-2.5 px-3 border-b hover:bg-muted">
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="text-sm">{notification.title}</h3>
            <div className="w-[325px] text-xs text-ellipsis overflow-hidden whitespace-nowrap">
              {notification.message}
            </div>
            <div className="text-xs text-muted-foreground">{new Date(notification.created_at).toLocaleString()}</div>
          </div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Eye size={20} />
          </Button>
        </div>
      ))}
    </div>
  );
}

function Archive() {
  return (
    <div className="h-72 flex flex-col gap-y-4 items-center justify-center text-muted-foreground">
      <InboxIcon size={32} />
      <div className="flex flex-col gap-y-1">
        <span className="text-sm text-center">No archived notifications</span>
        <span className="w-60 mx-auto text-xs text-center">
          Notifications that you have previously archived will be shown here
        </span>
      </div>
    </div>
  );
}
