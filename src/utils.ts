import _quests from "@/quests.json";
import _completedQuests from "@/quests-completed.json";
import { Quest } from "@/types";

export const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
export const getSideQuestUrl = (page: number) =>
  `https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=3&page=${page}&order=4`;

export const questAreas = [
  "Limsa Lominsa",
  "Middle La Noscea",
  "Lower La Noscea",
  "Eastern La Noscea",
  "Western La Noscea",
  "Upper La Noscea",
  "Outer La Noscea",
  "Wolves' Den Pier",
  "Gridania",
  "Central Shroud",
  "East Shroud",
  "South Shroud",
  "North Shroud",
  "Ul'dah",
  "Western Thanalan",
  "Central Thanalan",
  "Eastern Thanalan",
  "Southern Thanalan",
  "Northern Thanalan",
  "The Gold Saucer",
  "Chocobo Square",
  "The Waking Sands",
  "Mor Dhona",
  "Revenant's Toll",
  "Ishgard",
  "Fortemps Manor",
  "The Firmament",
  "Saint Endalim's Scholasticate",
  "Coerthas Central Highlands",
  "Coerthas Western Highlands",
  "The Sea of Clouds",
  "Azys Lla",
  "Idyllshire",
  "Matoya's Cave",
  "The Dravanian Forelands",
  "The Dravanian Hinterlands",
  "The Churning Mists",
  "Rhalgr's Reach",
  "The Fringes",
  "The Peaks",
  "The Lochs",
  "Kugane",
  "The Ruby Sea",
  "Yanxia",
  "The Azim Steppe",
  "The Doman Enclave",
  "Radz-at-Han",
  "Thavnair",
  "Garlemald",
  "The Crystarium",
  "Eulmore",
  "Lakeland",
  "Kholusia",
  "Amh Araeng",
  "Il Mheg",
  "The Rak'tika Greatwood",
  "The Tempest",
  "Old Sharlayan",
  "Labyrinthos",
  "Mare Lamentorum",
  "Ultima Thule",
  "Elpis",
  "Bozjan Southern Front",
  "Gangos",
  "Zadnor",
  "Unnamed Island",
];

const limsaStartingQuests = [
  "149e9b93ac6",
  "da9c74c03ee",
  "e90686d86f2",
  "149909ec33f",
  "ece3c51117f",
  "3b19b24585a",
];
const uldahStartingQuests = ["0cf6365e0a9"];
const ignoredQuestIds = new Set([
  ...limsaStartingQuests,
  ...uldahStartingQuests,
]);
const quests = _quests.filter((quest) => !ignoredQuestIds.has(quest.id));
const completedQuests = _completedQuests.filter(
  (quest) => !ignoredQuestIds.has(quest.id)
);

export const questAreasWithIds = questAreas.map((area, index) => {
  return { id: index + 1, name: area };
});

export function formatAsPercent(num: number) {
  return num.toFixed(2) + "%";
}

export const getQuestUrl = (questId: string) =>
  `https://na.finalfantasyxiv.com/lodestone/playguide/db/quest/${questId}/`;

export function getQuestsForArea(area: string) {
  return quests.filter((quest) => quest.area === area);
}

export const allQuestIds = new Set(quests.map((quest) => quest.id));
export const completedQuestIds = new Set(
  completedQuests.map((quest) => quest.id)
);

export function getQuestCompletionRate(quests: Quest[]) {
  const allQuestIds = quests.map((quest) => quest.id);
  const completedQuests = allQuestIds.filter((questId) =>
    completedQuestIds.has(questId)
  );
  return (completedQuests.length / allQuestIds.length) * 100;
}
