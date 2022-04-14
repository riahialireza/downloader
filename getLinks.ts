import * as fs from "fs";

export default class GetLinks {
  private _links: string[] = [];

  constructor(private readonly file: string) {
    if (!fs.existsSync(file)) {
      throw new Error(`File ${file} does not exist`);
    } else if (!fs.statSync(file).isFile()) {
      throw new Error(`${file} is not a file`);
    } else {
      this._links = fs.readFileSync(file, "utf8").split("\n");
    }
  }

  public get links(): string[] {
    return this._links;
  }
}
