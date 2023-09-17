import * as cheerio from "cheerio";
import { Quest } from "@/types";
import { getSideQuestUrl, range } from "@/utils";
import saveAsJSON from "@/scripts/saveAsJSON";

function extractQuest(element: cheerio.Cheerio): Quest | null {
  const name = element.find(".db-table__txt--detail_link").text();
  const href = element.find(".db-table__txt--detail_link").attr("href") ?? "";
  const id =
    href
      .split("/")
      .filter((x) => x !== "")
      .pop() ?? "";
  const area = element.find(".db-table__quest__area").text();
  const level = element.find(".db-table__body--center").text();

  if (name === "" || area === "" || level === "" || id === "") {
    return null;
  }

  return {
    id,
    name,
    area,
    level,
  };
}

async function parseQuestPage(url: string) {
  const response = await fetch(url);
  const text = await response.text();
  const $ = await cheerio.load(text);
  const $tableRows = $("tr");
  const quests: Quest[] = [];

  $tableRows.each((index, element) => {
    const $element = $(element);
    const quest = extractQuest($element);
    if (quest != null) {
      quests.push(quest);
    }
  });

  return quests;
}

const NUM_PAGES = 35;
async function parseAllQuests(numPagesToParse = NUM_PAGES) {
  const allQuests: Quest[] = [];

  for (const page of range(numPagesToParse)) {
    const url = getSideQuestUrl(page + 1);
    console.log(
      `Extract Page ${page + 1} out of ${numPagesToParse} from ${url}`
    );
    try {
      const quests = await parseQuestPage(url);
      allQuests.push(...quests);
    } catch (e) {
      console.error(`Error parsing page ${page + 1}: ${e}`);
    }
  }

  console.log(`Extracted ${allQuests.length} quests. Saving to CSV...`);
  await saveAsJSON(allQuests, "quests");
}

(async () => {
  await parseAllQuests();
})();
