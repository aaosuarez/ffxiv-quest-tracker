import * as cheerio from "cheerio";
import { CompletedQuest, QuestId } from "@/types";
import * as dotenv from "dotenv";
import saveAsJSON from "@/scripts/saveAsJSON";

function extractCharacterQuest(
  element: cheerio.Cheerio
): { id: QuestId; name: string } | null {
  const name = element
    .find(".entry__quest__name")
    .text()
    .replace(/[\t\n]/g, "");
  const href = element.find(".entry__activity__txt").attr("href") ?? "";
  const id =
    href
      .split("/")
      .filter((x: string) => x !== "")
      .pop() ?? "";

  if (name === "" || id === "") {
    return null;
  }

  return {
    id,
    name,
  };
}

export const getCompletedQuestUrl = (genreId: number, areaId: number) =>
  `https://na.finalfantasyxiv.com/lodestone/character/29926359/quest/genre/${genreId}/${areaId}?order=3#anchor_quest`;

async function getCharacterQuest(genreId: number, areaId: number) {
  const url = getCompletedQuestUrl(genreId, areaId);
  const response = await fetch(url, {
    headers: { Cookie: process.env.LODESTONE_COOKIE ?? "" },
  });
  const text = await response.text();
  const $ = await cheerio.load(text);
  const $completedQuestsList = $(".entry__quest");
  const quests: CompletedQuest[] = [];

  $completedQuestsList.each((index, element) => {
    const $element = $(element);
    const quest = extractCharacterQuest($element);
    if (quest != null) {
      quests.push({ id: quest.id });
    }
  });

  return quests;
}

export const SIDE_QUESTS_URL_STRUCTURE = [
  {
    id: 66,
    name: "Chronicles of Light",
    areas: [{ id: 66, name: "Tales from the Shadows" }],
  },
  {
    id: 68,
    name: "Hildibrand Sidequests",
    areas: [{ id: 68, name: "Hildibrand Adventures" }],
  },
  {
    id: 74,
    name: "Weapon Enhancement Sidequests",
    areas: [
      { id: 74, name: "Anima Weapons" },
      { id: 75, name: "The Forbidden Land, Eureka" },
      { id: 76, name: "Resistance Weapons" },
    ],
  },
  {
    id: 81,
    name: "Records of Unusual Endeavors",
    areas: [
      { id: 81, name: "Doman Adventurers' Guild Quests" },
      { id: 83, name: "Ishgardian Restoration Main Quests" },
    ],
  },
  {
    id: 80,
    name: "Side Story Quests",
    areas: [{ id: 80, name: "Tataru's Grand Endeavor" }],
  },
  {
    id: 50,
    name: "Lominsan Sidequests",
    areas: [
      { id: 32, name: "Eastern La Noscea" },
      { id: 27, name: "Limsa Lominsa" },
      { id: 31, name: "Lower La Noscea" },
      { id: 30, name: "Middle La Noscea" },
      { id: 350, name: "Outer La Noscea" },
      { id: 33, name: "Western La Noscea" },
      { id: 358, name: "Wolves' Den Pier" },
    ],
  },
  {
    id: 51,
    name: "Gridanian Sidequests",
    areas: [
      { id: 54, name: "Central Shroud" },
      { id: 55, name: "East Shroud" },
      { id: 39, name: "Gridania" },
      { id: 57, name: "North Shroud" },
      { id: 56, name: "South Shroud" },
    ],
  },
  {
    id: 52,
    name: "Ul'dahn Sidequests",
    areas: [
      { id: 43, name: "Central Thanalan" },
      { id: 44, name: "Eastern Thanalan" },
      { id: 45, name: "Southern Thanalan" },
      { id: 1484, name: "The Gold Saucer" },
      { id: 356, name: "The Waking Sands" },
      { id: 51, name: "Ul'dah" },
      { id: 42, name: "Western Thanalan" },
    ],
  },
  {
    id: 53,
    name: "Coerthan Sidequests",
    areas: [
      { id: 63, name: "Coerthas Central Highlands" },
      { id: 2200, name: "Coerthas Western Highlands" },
    ],
  },
  {
    id: 54,
    name: "Mor Dhonan Sidequests",
    areas: [{ id: 67, name: "Mor Dhona" }],
  },
  {
    id: 55,
    name: "Ishgardian Sidequests",
    areas: [{ id: 62, name: "Ishgard" }],
  },
  {
    id: 56,
    name: "Abalathian Sidequests",
    areas: [{ id: 2100, name: "The Sea of Clouds" }],
  },
  {
    id: 57,
    name: "Dravanian Sidequests",
    areas: [
      { id: 2082, name: "Idyllshire" },
      { id: 2036, name: "Matoya's Cave" },
      { id: 2000, name: "The Dravanian Forelands" },
      { id: 2001, name: "The Dravanian Hinterlands" },
    ],
  },
  {
    id: 59,
    name: "Gyr Abanian Sidequests",
    areas: [
      { id: 2403, name: "Rhalgr's Reach" },
      { id: 2406, name: "The Fringes" },
      { id: 2408, name: "The Lochs" },
      { id: 2407, name: "The Peaks" },
    ],
  },
  {
    id: 60,
    name: "Othardian Sidequests",
    areas: [
      { id: 2411, name: "The Azim Steppe" },
      { id: 2409, name: "The Ruby Sea" },
      { id: 2410, name: "Yanxia" },
    ],
  },
  {
    id: 61,
    name: "Hingan Sidequests",
    areas: [{ id: 2404, name: "Kugane" }],
  },
  {
    id: 62,
    name: "Lakeland Sidequests",
    areas: [
      { id: 2953, name: "Lakeland" },
      { id: 2951, name: "The Crystarium" },
      { id: 2952, name: "Eulmore" },
    ],
  },
  {
    id: 63,
    name: "Kholusian Sidequests",
    areas: [{ id: 2954, name: "Kholusia" }],
  },
  {
    id: 64,
    name: "Amh Araeng Sidequests",
    areas: [{ id: 2955, name: "Amh Araeng" }],
  },
  {
    id: 65,
    name: "Il Mheg Sidequests",
    areas: [{ id: 2956, name: "Il Mheg" }],
  },
  {
    id: 66,
    name: "Rak'tika Sidequests",
    areas: [{ id: 2957, name: "The Rak'tika Greatwood" }],
  },
  {
    id: 67,
    name: "Tempest Sidequests",
    areas: [{ id: 2958, name: "The Tempest" }],
  },
  {
    id: 68,
    name: "Sharlayan Sidequests",
    areas: [
      { id: 3708, name: "Labyrinthos" },
      { id: 3706, name: "Old Sharlayan" },
    ],
  },
  {
    id: 69,
    name: "Thavnairian Sidequests",
    areas: [
      { id: 3709, name: "Thavnair" },
      { id: 3707, name: "Radz-at-Han" },
    ],
  },
  {
    id: 70,
    name: "Garlean Sidequests",
    areas: [{ id: 3710, name: "Garlemald" }],
  },
  {
    id: 71,
    name: "Mare Lamentorum Sidequests",
    areas: [{ id: 3711, name: "Mare Lamentorum" }],
  },
  { id: 72, name: "Elpis Sidequests", areas: [{ id: 3713, name: "Elpis" }] },
  {
    id: 73,
    name: "Ultima Thule Sidequests",
    areas: [{ id: 3712, name: "Ultima Thule" }],
  },
];

async function getAllCharacterQuests() {
  const allQuests: CompletedQuest[] = [];

  for (const genre of SIDE_QUESTS_URL_STRUCTURE) {
    for (const area of genre.areas) {
      console.log(`Getting completed quests for ${area.name}...`);
      try {
        const quests = await getCharacterQuest(genre.id, area.id);
        allQuests.push(...quests);
      } catch (e) {
        console.error(`Error getting quests for ${area.name}: ${e}`);
      }
    }
  }
  console.log(`${allQuests.length} quests completed. Saving...`);
  await saveAsJSON(allQuests, "quests-completed");
}

(async () => {
  dotenv.config();
  await getAllCharacterQuests();
})();
