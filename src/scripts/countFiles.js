import fs from "fs";
import path from "path";

export async function countFilesInFolder() {
  const folderPath = path.resolve("./src/content"); // Path to the folder

  try {
    // Read the directory contents
    const files = fs.readdirSync(folderPath);

    // Filter out directories and count only files
    const fileCount = files.filter((file) =>
      fs.statSync(path.join(folderPath, file)).isFile()
    ).length;

    return { totalFiles: fileCount, files };
  } catch (err) {
    console.error("Error reading the folder:", err);
    return { totalFiles: 0, files: [] };
  }
}
