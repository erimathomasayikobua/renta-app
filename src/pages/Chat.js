import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Chat.module.css';

const Chat = () => {
  const { user } = useAuth();
  const { messages, sendMessage, markAllAsRead } = useChat();
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    markAllAsRead();
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || sending) return;

    setSending(true);
    await sendMessage(messageText);
    setMessageText('');
    setSending(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-3">Customer Support</h1>
      </div>

      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <div className={styles.chatTitle}>Support Team</div>
          <div className={styles.onlineStatus}>
            <div className={styles.onlineDot} />
            <span>Online</span>
          </div>
        </div>

        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.message} ${message.sender === 'user' ? styles.user : ''}`}
                >
                  <div className={styles.messageAvatar}>
                    {message.sender === 'user' ? user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.messageBubble}>{message.text}</div>
                    <div className={styles.messageTime}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className={styles.inputContainer}>
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              disabled={sending}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={sending || !messageText.trim()}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;