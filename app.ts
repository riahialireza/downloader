import GetLinks from "./getLinks";
import Download from "./download";

const getLinks: GetLinks = new GetLinks("./links.txt");
const download: Download = new Download(getLinks.links, "downloads");
download.download();
