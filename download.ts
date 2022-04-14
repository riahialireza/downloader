import * as fs from "fs";
import axios from "axios";

export default class Download {
  constructor(
    private readonly links: string[],
    private readonly destination: string
  ) {
    if (!links || links.length === 0) {
      throw new Error("No links provided");
    }
    if (!destination) {
      throw new Error("No destination provided");
    }
    fs.mkdirSync(this.destination, { recursive: true });
  }

  public async download(): Promise<void> {
    for (const link of this.links) {
      const fileName = link.split("/").pop();
      const filePath = `./${this.destination}/${fileName}`;
      const file = fs.createWriteStream(filePath);
      console.log(`Downloading ${fileName}`);
      const response = await axios.get(link, { responseType: "stream" });
      response.data.pipe(file);
      await new Promise((resolve, reject) => {
        file.on("finish", resolve);
        file.on("error", reject);
      });
    }
  }
}
