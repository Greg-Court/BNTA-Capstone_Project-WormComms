import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: import.meta.env.VITE_GPT_API_KEY,
  })
);
console.log(import.meta.env.VITE_GPT_API_KEY);

export const generateAutoReplyResponse = async (currentChatMessages) => {
  const autoReplyResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: currentChatMessages,
  });
  return autoReplyResponse.data.choices[0].message.content;
};

export const generateAutoReplyArray = (messages, currentUser) => {
  const formattedMessages = [];
  formattedMessages.push({
    role: "system",
    content:
      "You are an auto-reply assistant, and your goal is to generate a response that matches the style of previous messages. Make sure to use slang, abbreviations, and mimic any punctuation or misspellings you see in the conversation. If previous messages are casual and informal, keep your response casual and informal. If previous messages are formal, generate a formal response.",
  });
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const role = message.senderId === currentUser.id ? "assistant" : "user";
    formattedMessages.push({
      role: role,
      content: message.content,
    });
  }
  return formattedMessages;
};
