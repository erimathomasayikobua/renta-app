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
    if (messages.length > 0) markAllAsRead();
    scrollToBottom();
    // eslint-disable-next-line
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
      <header className={styles.header}>
        <h1 className="heading-3">Customer Support</h1>
        <div className={styles.onlineStatus}>
          <span className={styles.onlineDot} aria-label="Online" />
          <span>Online</span>
        </div>
      </header>

      <main className={styles.chatBox} aria-label="Chat conversation">
        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} aria-hidden="true">💬</div>
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.supportMessage}`}
                  aria-label={message.sender === 'user' ? 'Your message' : 'Support message'}
                >
                  <div className={styles.messageAvatar}>
                    {message.sender === 'user'
                      ? user.name?.charAt(0).toUpperCase()
                      : 'S'}
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.messageBubble}>{message.text}</div>
                    <div className={styles.messageTime}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form className={styles.inputForm} onSubmit={handleSubmit} aria-label="Send message">
          <input
            type="text"
            className={styles.input}
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={sending}
            aria-label="Message input"
            autoComplete="off"
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={sending || !messageText.trim()}
            aria-label="Send"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;