import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";
import {
  formatAsPercent,
  getQuestCompletionRate,
  getQuestsForArea,
  questAreasWithIds,
} from "@/utils";
import Link from "next/link";
import classNames from "classnames";

export default function Home() {
  return (
    <main>
      <ul>
        {questAreasWithIds.map(({ id, name }) => {
          const quests = getQuestsForArea(name);
          const completionRate = getQuestCompletionRate(quests);
          const isCompleted = completionRate === 100;

          return (
            <li key={id} className={"relative"}>
              <Link
                href={`/areas/${id}`}
                className={
                  "flex justify-between hover:bg-white hover:bg-opacity-10"
                }
              >
                <div className={"flex items-center gap-1"}>
                  {isCompleted ? <CheckCircledIcon /> : <CircleIcon />}
                  <span
                    className={classNames({
                      "line-through": isCompleted,
                    })}
                  >
                    {name}
                  </span>
                </div>
                <span>{formatAsPercent(completionRate)}</span>
              </Link>
              <div
                className={
                  "bg-white bg-opacity-5 absolute inset-0.5 pointer-events-none"
                }
                style={{
                  width: `${completionRate}%`,
                }}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
