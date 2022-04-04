const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");
const doc = require("pdfkit");
const chalk = require("chalk");
const { data } = require("cheerio/lib/api/attributes");
function getTheIssues(url, repoNamePdf, pdfPath) {
  //    console.log(url);
  request(url, cb);
  // repoNamePdf-> iss nam ki pdf banani ha
  //  repoNamePdfPath-> es path ke andar repoNamePdf banani ha
  let pdfName = repoNamePdf + ".pdf";
  pdfPath += "/" + pdfName;
//   makePdf(pdfPath, []);
  // console.log(repoNamePdf);
  // console.log(repoNamePdfPath);
  function cb(err, res, html) {
    if (err) {
      console.log(err);
    } else if (res.statusCode === 404) {
      console.log("Page Not Found!!!!");
    } else {
      handleHtml(html);
    }
  }
  function handleHtml(codes) {
    // console.log(codes);
    let selector = cheerio.load(codes);
    let issuesArray = selector(
      ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
    );
    let finalData = [];
    console.log(issuesArray.length);
    for (let i = 0; i < issuesArray.length; i++) {
      let issueData = selector(issuesArray[i]).text();
      //   console.log(issueData);
      finalData.push(issueData);
    //   finalData.push("->");
      let issueLink =
        "https://github.com" + selector(issuesArray[i]).attr("href");
      // console.log(issueLink);
      finalData.push(issueLink);
    }
    let doc = new pdfkit
    doc.pipe(fs.createWriteStream(pdfPath));
    // let data = JSON.stringify(finalData);

    // console.log(finalData);
    // doc.fontSize(20).text(data, 100, 100);
    let count =1;
    doc.fontSize(50).text(repoNamePdf);
    for(let i = 0; i < finalData.length; i++)
    {
        // doc.text();
        let data = JSON.stringify(finalData[i].trim());
        if((i+1)%2!=0)
        {
            dataNotLink = count + ")- " + data;
            doc.fontSize(20).text(dataNotLink);
            count++;
        }
        else{
            // data = chalk.red(data);
            doc.fontSize(15).text(data);
        }
        // console.log(data);

    }
    doc.end();

  }
}

module.exports = {
  gti: getTheIssues,
};
// .v-align-middle.no-underline
