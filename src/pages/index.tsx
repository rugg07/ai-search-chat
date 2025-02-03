'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/Search/SearchBar';
import { SearchResults } from '@/components/Search/SearchResults';
import { ChatSidebar } from '@/components/Sidebar/ChatSidebar';
import { SearchResult, ChatMessage } from '@/types/search';
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { Menu, Moon, Sun, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { sampleSearchData, getAIResponse } from '@/lib/sample-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Chat {
  id: string;
  messages: ChatMessage[];
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchState, setSearchState] = useState({
    query: '',
    results: [] as SearchResult[],
    isLoading: false,
    error: null as string | null,
  });

  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      parsedChats.forEach((chat: Chat) => {
        chat.messages.forEach((msg) => {
          msg.timestamp = new Date(msg.timestamp);
        });
      });
      setChats(parsedChats);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const handleSearch = async (query: string) => {
    setShowSearch(true);
    setSearchState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const results = sampleSearchData.filter((item) => {
        const searchTerm = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
        );
      });

      setSearchState((prev) => ({ ...prev, results, isLoading: false }));

      const newChatId = uuidv4();
      const userMessage: ChatMessage = {
        id: uuidv4(),
        content: query,
        role: 'user',
        timestamp: new Date(),
      };

      const aiMessage: ChatMessage = {
        id: uuidv4(),
        content: getAIResponse(query),
        role: 'assistant',
        timestamp: new Date(),
      };

      setChats((prev) => [...prev, { id: newChatId, messages: [userMessage, aiMessage] }]);
      setSelectedChatId(newChatId);
    } catch (error) {
      setSearchState((prev) => ({
        ...prev,
        error: 'Failed to fetch results',
        isLoading: false,
      }));
      toast.error('Failed to fetch search results. Please try again.');
    }
  };

  const handleNewChat = () => {
    setSearchState({
      query: '',
      results: [],
      isLoading: false,
      error: null,
    });
    const newChatId = uuidv4();
    setChats((prev) => [...prev, { id: newChatId, messages: [] }]);
    setSelectedChatId(newChatId);
    setShowSearch(true);
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setShowSearch(false);
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <AnimatePresence mode="wait">
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-r"
          >
            <ChatSidebar
              chats={chats}
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
              selectedChatId={selectedChatId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              {isSidebarCollapsed ? (
                <PanelLeft className="h-6 w-6" />
              ) : (
                <PanelLeftClose className="h-6 w-6" />
              )}
            </Button>
            <h1 className="text-2xl font-bold">AI Search Chat</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <AnimatePresence mode="wait">
            {showSearch ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <SearchBar onSearch={handleSearch} isLoading={searchState.isLoading} />
                {searchState.error && (
                  <div className="text-red-500 text-center mt-4">
                    {searchState.error}
                  </div>
                )}
                <SearchResults
                  results={searchState.results}
                  isLoading={searchState.isLoading}
                />
              </motion.div>
            ) : selectedChat ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'p-4 rounded-lg',
                      message.role === 'user'
                        ? 'bg-primary/10 ml-auto max-w-[80%]'
                        : 'bg-muted mr-auto max-w-[80%]'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
