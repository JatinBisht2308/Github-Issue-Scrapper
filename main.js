// Requiring all the mandatory modules
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const repo = require("./repo");
let url = "https://github.com/topics";

request(url, cb);

function cb(err, res, html) {
  if (err) {
    console.log(err);
  }
  else if(res.statusCode === 404) {
    console.log("Page Not Found!!!!");
  }else {
    handleHtml(html);
  }
}
// handleHtml function

function handleHtml(code) {
  let selector = cheerio.load(code);
  let topicArray = selector(".no-underline.flex-grow-0");
  let topicNameArray = selector(".f3.lh-condensed.mb-0.mt-1.Link--primary");
  // console.log(topicNameArray.length);
  // console.log(selector(topicNameArray[4]).text());
    // console.log(topicArray.length);
  for (let i = 0; i < 3; i++) {
      let ithTopicLink = selector(topicArray[i]).attr("href");
      let topicDirName  = selector(topicNameArray[i+3]).text();
      // console.log("Topic Name:->"+ topicDirName);
      let topicDirPath = path.join(__dirname + "/Results", topicDirName);
      console.log(topicDirPath);
     if(!fs.existsSync(topicDirPath))
     {
      fs.mkdirSync(topicDirPath);
     }
    // repo.eR();
    // console.log(ithTopicLink);
    let fullTopicLink = "https://github.com" + ithTopicLink;
    // console.log(fullTopicLink);
    repo.eR(fullTopicLink,topicDirPath);
  }
// console.log(topicArray);/
}
