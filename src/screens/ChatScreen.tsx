import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useBartr } from '../context/BartrContext';

export const ChatScreen: React.FC = () => {
  const { activeRequest, chatMessages, goBack, sendChatMessage } = useBartr();
  const [text, setText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const customerName = activeRequest?.customer || 'Customer';
  const custInitial = activeRequest?.custInitial || 'C';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendChatMessage(text.trim());
      setText('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Topbar */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100 bg-white z-10">
        <button
          onClick={goBack}
          data-testid="chat_back_button"
          className="w-9 h-9 rounded-full bg-[#F5F6FA] flex items-center justify-center text-[#0A2E65] hover:bg-slate-200 active:scale-95 transition"
          title="Back"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-[#0A2E65]" />
        </button>

        <div className="w-9 h-9 rounded-xl bg-[#E1F6FF] flex items-center justify-center font-bold text-sm text-[#0067F5]">
          {custInitial}
        </div>

        <h3 className="text-base font-bold text-[#0A2E65] truncate flex-1">
          {customerName}
        </h3>
      </div>

      {/* Message body */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.isMe
                  ? 'bg-[#0067F5] text-white rounded-br-xs shadow-xs'
                  : 'bg-[#F5F6FA] text-[#0A2E65] rounded-bl-xs border border-slate-100 shadow-xs'
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`block text-[10px] mt-1 text-right ${
                  msg.isMe ? 'text-blue-100' : 'text-[#5B6472]'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-slate-100 bg-white flex items-center gap-2.5"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          data-testid="chat_input"
          className="flex-1 h-11 px-4 rounded-full bg-[#F5F6FA] border border-slate-200 focus:outline-none focus:border-[#0067F5] text-sm text-[#0A2E65] placeholder:text-[#5B6472]"
        />

        <button
          type="submit"
          data-testid="chat_send_button"
          className="w-11 h-11 rounded-full bg-[#0067F5] hover:bg-blue-600 active:scale-95 text-white flex items-center justify-center shrink-0 transition shadow-xs cursor-pointer"
          title="Send"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
};
