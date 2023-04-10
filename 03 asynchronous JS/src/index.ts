import * as fs from "fs";
import * as superagent from "superagent";

const readFilePro = (file: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
};

const writeFilePro = (file: string, data: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("writed successfully 😎");
    });
  });
};

// using callbacks
/*
fs.readFile(`${__dirname}/../dog.txt`, "utf8", (err, data) => {
  console.log(`Breeds: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Random dog image saved to file!");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/

// using promises
/*
readFilePro(`${__dirname}/../dog.txt`)
  .then((data) => {
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
      .then((res) => {
        writeFilePro(`dog-img.txt`, res.body.message as string)
          .then((message) => {
            console.log(message);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  })
  .catch((err) => {
    console.log(err);
  });
*/

// using async await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/../dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    await writeFilePro(`dog-img.txt`, imgs.join("\n"));

    // const res = await superagent
    //   .get(`https://dog.ceo/api/breed/${data}/images/random`)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(res.body.message);
    // await writeFilePro(`dog-img.txt`, res.body.message as string);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "2: Ready 🐶";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const message = await getDogPic();
    console.log(message);
    console.log("3: Done getting dog pics!");
  } catch (error) {
    console.log(error);
  }
})();

/*
console.log("1: Will get dog pics!");
getDogPic()
  .then((message) => {
    console.log(message);
    console.log("3: Done getting dog pics!");
  })
  .catch((err) => {
    console.log(err);
  });
*/
