import React, { useEffect, useRef } from 'react';
import { Message, User } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { users } from '../../data/mockData';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-y-auto max-h-96">
      {messages.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          const isOwnMessage = message.senderId === currentUserId;
          const sender = getUserById(message.senderId);
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%]">
                {!isOwnMessage && (
                  <img
                    src={sender?.avatar || 'https://via.placeholder.com/40'}
                    alt={sender?.name || 'User'}
                    className="h-8 w-8 rounded-full mr-2 mt-1 object-cover"
                  />
                )}
                
                <div className="flex flex-col">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className={`text-xs mt-1 text-gray-500 ${isOwnMessage ? 'text-right' : ''}`}>
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;