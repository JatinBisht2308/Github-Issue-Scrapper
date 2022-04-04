const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const issues = require("./issues");


function extractRepo(particularTopicLink, topicDirPath) {
  //   console.log(particularTopicLink);
  request(particularTopicLink, cb);
  function cb(err, res, html) {
    if (err) {
      console.log(err);
    } else if (res.statusCode === 404) {
      console.log("Page Not Found!!!!");
    } else {
      handleHtml(html);
    }
    //   let selector = cheerio.load(".text-bold.wb-break-word");
    //   let aTag =
  }
  
  function handleHtml(code) {
    let selector = cheerio.load(code);
    let repoLinkArray = selector(".text-bold.wb-break-word");
    // console.log(repoLinkArray.length);
  
    // console.log(repoLinkUrl);
    for (let i = 0; i < 8; i++) {
      let repoLinkUrl = selector(repoLinkArray[i]).attr("href");
      // console.log(repoLinkUrl);
      let fullUrl = "https://github.com" + repoLinkUrl + "/issues";
      let repoNameArray = repoLinkUrl.split("/");
      let repoName = repoNameArray[2];
      // console.log(repoName);
      issues.gti(fullUrl,repoName,topicDirPath);
    }
  }
}


module.exports = {
  eR: extractRepo,
};
