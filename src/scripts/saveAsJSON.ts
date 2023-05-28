import fs from "fs";

export default async function saveAsJSON(objects: object[], filename: string) {
  const data = JSON.stringify(objects);
  fs.writeFile(`./src/${filename}.json`, data, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
      return;
    }
  });
}
