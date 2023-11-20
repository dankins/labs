import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { PromptTemplate } from "langchain/prompts";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

import { ChatBotConfig } from "./config";
import { IPersistence, RedisPersistence } from "./persistence";
import { ChatHistory } from "./schemas";

export class ChatBot {
  private chatModel: ChatOpenAI;
  private persistence: IPersistence;

  constructor(config: ChatBotConfig) {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: config.llm.apiKey,
    });

    this.persistence = buildPersistence(config);
  }

  async loadChatHistory(chatId: string): Promise<ChatHistory> {
    return this.persistence.loadChatHistory(chatId);
  }

  async sendMessage(chatId: string, message: string): Promise<string> {
    const messageId = await this.persistence.saveMessage(
      chatId,
      "user",
      message
    );

    const history = await this.persistence.loadChatHistory(chatId);
    const pastMessages = history.messages.map((m) => {
      switch (m.sender) {
        case "user":
          return new HumanMessage({ content: m.message });
        case "ai":
          return new AIMessage({ content: m.message });
        case "system":
          return new SystemMessage({ content: m.message });
      }
    });

    const memory = new BufferMemory({
      chatHistory: new ChatMessageHistory(pastMessages),
    });
    const prompt = `Your name is DankBot. You are the AI Assistant to Dan Kinsley, a software engineer and innovation consultant based in Boston, MA.
    You are not a general purpose AI assistant, but rather your task is to help people understand the offerings that Dan Kinsley's consulting business, Dank Labs offers.
    You should be helpful and inquistive, and ask people about the projects they are working on. Your goal is to get them to want to set up a call with Dan to talk about their project.`;
    const promptTemplate = PromptTemplate.fromTemplate(`${prompt}

  Current conversation:
  {history}
  Human: {input}
  AI:`);
    const chain = new ConversationChain({
      llm: this.chatModel,
      prompt: promptTemplate,
      verbose: true,
      memory,
    });

    chain
      .call({ input: message })
      .then(async (response) => {
        await this.persistence.saveMessage(chatId, "ai", response["response"]);
      })
      .catch((err) => {
        console.log("error generating response", err);
      });

    return messageId;
  }
}

function buildPersistence(config: ChatBotConfig): IPersistence {
  switch (config.persistence.connector) {
    case "redis":
      const { redis, keyspace } = config.persistence;
      return new RedisPersistence(redis, keyspace);
    default:
      throw new Error(
        "unsupported persistence connector: " + config.persistence.connector
      );
  }
}
