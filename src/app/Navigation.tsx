import { allQuestIds, completedQuestIds, formatAsPercent } from "@/utils";
import Link from "next/link";

export default function Navigation() {
  const percentQuestsCompleted = formatAsPercent(
    (completedQuestIds.size / allQuestIds.size) * 100
  );
  return (
    <>
      <nav className={"flex justify-between"}>
        <h1>
          <Link href={"/"}>FFXIV Side Quest Tracker</Link>
        </h1>
        <span>{percentQuestsCompleted} Complete</span>
      </nav>
      <hr className={"my-2"} />
    </>
  );
}
