export type QuestId = string;

export type Quest = {
  id: QuestId;
  name: string;
  area: string;
  level: string;
};

export type CompletedQuest = {
  id: QuestId;
};
