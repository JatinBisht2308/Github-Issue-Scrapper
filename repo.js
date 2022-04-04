const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function cb(err,res,html)
{ 
    if(err)
    { 
        console.log(err);
    }
    else{
    handleHtml(html);
    }
//   let selector = cheerio.load(".text-bold.wb-break-word");
//   let aTag = 
}

function handleHtml(code)
{ 
    let selector = cheerio.load(code);
    let repoLinkArray = selector(".text-bold.wb-break-word");
    console.log(repoLinkArray.length);

}

function extractRepo(particularTopicLink)
{
//   console.log(particularTopicLink);
  request(particularTopicLink,cb);

}
module.exports = {
    eR:extractRepo
};