import { createContext } from "react";

export const ChatContext = createContext({
    chatHistory: [],
    setChatHistory: () => {}
});