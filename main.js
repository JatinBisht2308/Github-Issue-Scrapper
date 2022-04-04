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
  } else {
    handleHtml(html);
  }
}
// handleHtml function

function handleHtml(code) {
  let selector = cheerio.load(code);
  let topicArray = selector(".no-underline.flex-grow-0");
    // console.log(topicArray.length);
  for (let i = 0; i < 3; i++) {
      let ithTopicLink = selector(topicArray[i]).attr("href");
    // repo.eR();
    // console.log(ithTopicLink);
    let fullTopicLink = "https://github.com" + ithTopicLink;
    // console.log(fullTopicLink);
    repo.eR(fullTopicLink);
  }
// console.log(topicArray);/
}
