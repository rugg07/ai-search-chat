'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare } from "lucide-react";
import { ChatMessage } from "@/types/search";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatSidebarProps {
  chats: { id: string; messages: ChatMessage[] }[];
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  selectedChatId?: string;
}

export function ChatSidebar({ chats, onSelectChat, onNewChat, selectedChatId }: ChatSidebarProps) {
  return (
    <div className="w-80 border-r h-screen bg-background/95 flex flex-col">
      <div className="p-4 border-b">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={onNewChat}
        >
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chats.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            const preview = lastMessage ? lastMessage.content.slice(0, 50) + "..." : "New Chat";
            
            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 h-auto py-3",
                    selectedChatId === chat.id && "bg-accent"
                  )}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <div className="flex flex-col items-start gap-1 overflow-hidden">
                    <p className="text-sm font-medium line-clamp-1">
                      {preview}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lastMessage?.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
} 