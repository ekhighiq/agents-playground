import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatMessageInput } from "@/components/chat/ChatMessageInput";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import { useEffect, useRef } from "react";

const inputHeight = 48;

export type ChatMessageType = {
  name: string;
  message: string;
  isSelf: boolean;
  timestamp: number;
};

type ChatTileProps = {
  messages: ChatMessageType[];
  onSend?: (message: string) => Promise<ComponentsChatMessage>;
};

export const ChatTile = ({ messages, onSend }: ChatTileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Always scroll to bottom when messages change
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div
        ref={containerRef}
        className="overflow-y-auto"
        style={{ height: `calc(100% - ${inputHeight}px)` }}
      >
        <div className="flex flex-col min-h-full justify-end">
          {messages.map((message, index, allMsg) => {
            // Hide name if previous message is from the same user
            const hideName =
              index > 0 && allMsg[index - 1].name === message.name;

            return (
              <ChatMessage
                key={`${message.name}-${message.timestamp}-${index}`}
                hideName={hideName}
                name={message.name}
                message={message.message}
                isSelf={message.isSelf}
              />
            );
          })}
        </div>
      </div>
      <ChatMessageInput
        height={inputHeight}
        placeholder="Type a message"
        onSend={onSend}
      />
    </div>
  );
};