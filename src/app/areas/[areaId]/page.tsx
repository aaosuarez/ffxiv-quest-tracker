import {
  completedQuestIds,
  formatAsPercent,
  getQuestCompletionRate,
  getQuestsForArea,
  getQuestUrl,
  questAreasWithIds,
} from "@/utils";
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

export default function AreaPage({ params }: { params: { areaId: string } }) {
  const area = questAreasWithIds.find(
    ({ id }) => id.toString() === params.areaId
  );
  if (area == null) return null;
  const quests = getQuestsForArea(area.name);
  const completionRate = getQuestCompletionRate(quests);

  return (
    <div>
      <div className={"flex justify-between"}>
        <h2>{area.name}</h2>
        <p>{formatAsPercent(completionRate)} Complete</p>
      </div>
      <ul className={"mb-4"}>
        {quests.map((quest) => {
          const isCompleted = completedQuestIds.has(quest.id);
          return (
            <li key={quest.id}>
              <a
                href={getQuestUrl(quest.id)}
                className={
                  "flex flex-row gap-2 items-center hover:bg-white hover:bg-opacity-10 cursor-pointer"
                }
              >
                <span>
                  {isCompleted ? <CheckCircledIcon /> : <CircleIcon />}
                </span>
                <span>L{quest.level}</span>
                <span
                  className={classNames({
                    "line-through": isCompleted,
                  })}
                >
                  {quest.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  return questAreasWithIds.map(({ id, name }) => ({
    areaId: id.toString(),
  }));
}
