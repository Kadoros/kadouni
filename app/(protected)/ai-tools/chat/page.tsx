// src/app/chat/page.tsx
"use client";

import React, { useState } from "react";
// import { AiGenerate } from "@/actions/gemini.action"; // Adjust the import path as needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Call AI function
    // const aiResponse = await AiGenerate(input);
    // const aiMessage = { role: "ai", content: aiResponse };

    // setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col size-full p-4">
      <ScrollArea className="border rounded-lg p-4 size-full overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex justify-center items-center">
        <div className="flex mt-4 w-full max-w-3xl">
          {" "}
          {/* Change max-w-3xl to desired size */}
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded-lg p-2 flex-grow mr-2" // Use flex-grow for the input to take available space
            placeholder="Type your message..."
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
