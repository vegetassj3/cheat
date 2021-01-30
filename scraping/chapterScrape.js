const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios").default;

function getChapterData(url) {
  return new Promise((res, rej) => {
    let result = "";
    axios.get(url).then(function (response) {
      const dom = new JSDOM(response.data);
      let document = dom.window.document;
      let chapterPara = document
        .getElementsByClassName("par fontsize-16")[0]
        .querySelectorAll("p");
      for (let chapterPart of chapterPara) {
        //console.log(chapterPart.outerHTML);
        result = result + chapterPart.outerHTML;
      }

      res(result);
    });
  });
}

module.exports = getChapterData;
