export enum SenderStatus {
    CHATBOT,
    USER,
    VIP,
    MODERATOR,
  }
  
export type EmojiTypes = { emojiType: "unicode" | string; count: number }[];

export type Message = {
  clientId: string;
  connectionId: string;
  connectKey?: string;
  name: string;
  data: {
    messageText: string;
    username: string;
    chatColor: string;
    address: string;
    isFC: boolean;
    isLens: boolean;
    lensHandle?: string;
    powerUserLvl: number | null;
    videoSavantLvl: number | null;
    nfcRank: number | null;
    reactions: EmojiTypes;
    channelUserRank?: number;
    isGif: boolean;
    body?: string;
    senderStatus: SenderStatus;
  };
  id: string;
  timestamp: number;
  extras: {
    timeserial: string;
  };
};