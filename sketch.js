let poem =
  "Two roads diverged in a yellow wood And sorry I could not travel both And be one traveler long I stood And looked down one as far as I could To where it bent in the undergrowth";

let api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let promiseArray = [];
let split = poem.split(" ");

function setup() {
  createCanvas(400, 400);
  background(250, 250, 240);
  textSize(18);
  textWrap(WORD);
  textAlign(CENTER);
  noLoop();
}

function preload() {
  for (const word of split) {
    getData(word);
  }
}

function getData(word) {
  promiseArray.push(
    fetch(api + word)
      .then((r) => r.json())
      .then((data) => data[0].meanings[0].definitions[0].synonyms[0])
      .then((res) => {
        if (res) {
          return res;   // synonym is found
        } else {
          return word;  // synonym is not found
        }
      })
  );
}

function draw() {
  Promise.all(promiseArray)
    .then((values) => text(format(values), height / 2 - 100, width / 2 - 150, 200, 400))
    .catch((err) => console.log(err));
}

function format(values) {
  return values.join(" ")
               .toLowerCase()                           // lowercase all
               .replace(/^\w/, (c) => c.toUpperCase())  // capitalize first word
               .replace(/\bi\b/g, "I")                  // find lowercase i's and cap
               + ".";                                   // add full stop
}
