const vision = require("@google-cloud/vision");
const fs = require("fs");
const uuid = require("uuid-v4");
const { createCanvas, loadImage } = require("canvas");
const express = require("express");
const { request } = require("http");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

const admin = require("firebase-admin");
const serviceAccount = require("./APIkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "yazlab22.appspot.com",
});

async function basla(input, res) {
  var bucket = admin.storage().bucket();
  var filename = input;

  async function DosyaYukle() {
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: "image/jpg",
      cacheControl: "public, max-age=31536000",
    };
    await bucket.upload(filename, {
      gzip: true,
      metadata: metadata,
    });

  }

  DosyaYukle().catch(console.error);

  await res.json("Nesne Tespit Edildi");
}

async function tensorflow(input, isim, gonderilenUri, res) {
  let variable = `gs://yazlab22.appspot.com/images-${isim}/${input}`;
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "APIkey.json",
  });

  const [result] = await client.objectLocalization(variable);
  const objects = result.localizedObjectAnnotations;

  await loadImage(gonderilenUri).then((image) => {
    const boya = createCanvas(image.width, image.height);
    const ctx = boya.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    objects.forEach((object) => {

      const vertices = object.boundingPoly.normalizedVertices;
      var x1 = vertices[0].x;
      var y1 = vertices[0].y;
      var uzunluk = vertices[1].x - vertices[0].x;
      var genislik = vertices[2].y - vertices[1].y;

      ctx.lineWidth = 12;
      ctx.fillStyle = "#cc003d";
      ctx.font = "125px Impact";
      ctx.fillText(object.name, x1 * image.width, y1 * image.height - 5);
      ctx.strokeStyle = "#00ff00";
      ctx.strokeRect(
        x1 * image.width,
        y1 * image.height,
        uzunluk * image.width,
        genislik * image.height
      );
    });
    ctx.fillStyle = "#fad346";
    ctx.font = "125px Impact";
    ctx.fillText("Obje sayısı:  " + objects.length, 20, image.height - 60);
    const temp = boya.toBuffer("image/jpeg");
    fs.writeFileSync(`./${input}`, temp);
  });
  await basla(input, res);
}
var input;
app.post("/send-data", async function (req, res) {
  const { answer, option, gonderilenUri } = req.body;

  await tensorflow(answer, option, gonderilenUri, res);
});

app.get("/", function (req, res) {
  res.send("welcome");
});

app.listen(PORT, function () {
  console.log("ready");
});
