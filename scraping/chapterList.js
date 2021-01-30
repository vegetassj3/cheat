const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios").default;

function getChapterList(url) {
  return new Promise((res, rej) => {
    url = url + "chapter-list/";
    let result = {};
    axios.get(url).then(function (response) {
      const dom = new JSDOM(response.data);
      let document = dom.window.document;
      let chapterList = document.querySelectorAll(".ch-link");
      let i = chapterList.length;
      for (let count = 0; count < chapterList.length; count++) {
        let text = chapterList[count].innerHTML;
        let index = text.indexOf("</strong>");
        text = text.slice(index + 10, text.length);
        result[i] = {
          link: chapterList[count].getAttribute("href"),
          text: text,
        };

        i--;
      }

      res(result);
    });
  });
}

module.exports = getChapterList;
