import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user]);

  const loadMessages = () => {
    const allMessages = JSON.parse(localStorage.getItem('rentaAppMessages') || '[]');
    const userMessages = allMessages.filter(m => m.userId === user?.id);
    setMessages(userMessages);
    
    const unread = userMessages.filter(m => !m.read && m.sender === 'support').length;
    setUnreadCount(unread);
  };

  const sendMessage = async (text, attachments = []) => {
    const newMessage = {
      id: Date.now().toString(),
      userId: user.id,
      sender: 'user',
      text,
      attachments,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const allMessages = JSON.parse(localStorage.getItem('rentaAppMessages') || '[]');
    allMessages.push(newMessage);
    localStorage.setItem('rentaAppMessages', JSON.stringify(allMessages));
    
    setMessages([...messages, newMessage]);
    
    // Simulate auto-response after 2 seconds
    setTimeout(() => {
      const autoResponse = {
        id: (Date.now() + 1).toString(),
        userId: user.id,
        sender: 'support',
        text: 'Thank you for contacting us! A support agent will respond to you shortly.',
        attachments: [],
        timestamp: new Date().toISOString(),
        read: false
      };
      
      const updatedMessages = JSON.parse(localStorage.getItem('rentaAppMessages') || '[]');
      updatedMessages.push(autoResponse);
      localStorage.setItem('rentaAppMessages', JSON.stringify(updatedMessages));
      
      loadMessages();
    }, 2000);
    
    return { success: true };
  };

  const markAsRead = (messageId) => {
    const allMessages = JSON.parse(localStorage.getItem('rentaAppMessages') || '[]');
    const messageIndex = allMessages.findIndex(m => m.id === messageId);
    
    if (messageIndex !== -1) {
      allMessages[messageIndex].read = true;
      localStorage.setItem('rentaAppMessages', JSON.stringify(allMessages));
      loadMessages();
    }
  };

  const markAllAsRead = () => {
    const allMessages = JSON.parse(localStorage.getItem('rentaAppMessages') || '[]');
    allMessages.forEach(m => {
      if (m.userId === user.id && m.sender === 'support') {
        m.read = true;
      }
    });
    localStorage.setItem('rentaAppMessages', JSON.stringify(allMessages));
    loadMessages();
  };

  const value = {
    messages,
    unreadCount,
    sendMessage,
    markAsRead,
    markAllAsRead,
    refreshMessages: loadMessages
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};