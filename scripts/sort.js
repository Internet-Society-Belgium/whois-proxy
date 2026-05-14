import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const fileName = process.argv[2];

if (!fileName) {
  console.error("Usage: node sort.js <filename>");
  process.exit(1);
}

try {
  const absolutePath = resolve(fileName);

  const rawData = await readFile(absolutePath, "utf-8");

  const data = JSON.parse(rawData);

  if (!Array.isArray(data)) {
    throw new Error("JSON content must be an array.");
  }

  data.forEach((item) => {
    if (Array.isArray(item.pattern)) {
      item.pattern.sort((a, b) => a.localeCompare(b));
    }
  });

  const sortedData = data.sort((a, b) => {
    const aProvider = a["provider"];
    const bProvider = b["provider"];

    // 1. Primary Sort: By Provider
    if (aProvider || bProvider) {
      if (!aProvider) return 1;
      if (!bProvider) return -1;
      return aProvider.localeCompare(bProvider);
    }

    // 2. Fallback Sort: By Pattern (when both providers are missing)
    // Accessing the first element of the pattern array
    const aPattern = a.pattern?.[0] || "";
    const bPattern = b.pattern?.[0] || "";

    if (!aPattern && bPattern) return 1;
    if (aPattern && !bPattern) return -1;

    return aPattern.localeCompare(bPattern);
  });

  await writeFile(absolutePath, JSON.stringify(sortedData, null, 2));

  console.log("Sort successful!");
} catch (error) {
  console.error("Error processing JSON:", error.message);
}
