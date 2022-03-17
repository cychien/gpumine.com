const https = require("https");
const fs = require("fs");
const path = require("path");
const Fontmin = require("fontmin");

const CHINESE_FONTS_PATH = path.join(
  process.cwd(),
  "public",
  "locales",
  "zh-TW"
);

const dirList = fs.readdirSync(CHINESE_FONTS_PATH);

const allChineseFonts = dirList.map((filename) => {
  const filePath = path.join(CHINESE_FONTS_PATH, filename);
  const source = fs.readFileSync(filePath, "utf-8");

  return {
    [filename]: source,
  };
});

const file = fs.createWriteStream("./public/fonts/test.otf");

https.get(
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC-Bold.otf",
  function (response) {
    response.pipe(file);
  }
);

var fontmin = new Fontmin()
  .src("public/fonts/test.otf")
  .use(
    Fontmin.glyph({
      text: "嘿嘿",
    })
  )
  .use(Fontmin.otf2ttf())
  // .use(Fontmin.ttf2woff2())
  .dest("./public/aaa");

fontmin.run(function (err, files) {
  if (err) {
    throw err;
  }

  // fs.writeFile("./public/fonts/test.woff2", files[0], (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   //file written successfully
  // });

  // const file = fs.createWriteStream("");

  // console.log(files[0]);
  // => { contents: <Buffer 00 01 00 ...> }
});
