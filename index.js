const prisma = require("./libs/prisma");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.get("/api/v1/test", (req, res) => {
  res.send("Hello World");
});

app.get("/api/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

app.get("/api/pariwisata", (req, res) => {
  res.json("INI PARIWISATA LOH!");
});

app.get("/", (req, res) => {
  res.json("HAYO MAU NGAPAIN BANG? IZIN DULU GIH KALAU MAU MASUK KE SINI!");
});

app.get("/api/v1/listActivity", async (req, res) => {
  const listActivity = await prisma.listActivity.findMany();

  if (!listActivity) {
    res.json({
      error: true,
      message: "Unsuccessful get data list activity",
    });
  }

  res.json({
    error: false,
    message: "Successful get data list activity",
    data: listActivity,
  });
});

app.get("/api/v1/activity", async (req, res) => {
  const listImage = await prisma.storageImage.findMany({
    select: {
      id: true,
      id_listActivity: true,
      url: true,
    },
  });

  if (!listImage) {
    res.json({
      error: true,
      message: "Unsuccessful get data image",
    });
  }

  res.json({
    error: false,
    message: "Successful get data image",
    data: listImage,
  })

  //   const data = listImage.map((item) => {
  //     return {
  //       id: item.id,
  //       id_listActivity: item.id_listActivity,
  //       url: item.url,
  //       name: item.listActivity.name,
  //       description: item.listActivity.description,
  //       activity: item.listActivity.activity.name,
  //     };
  //   });

  //   const getUnique = data.filter(
  //     (v, i, a) =>
  //       a.findIndex((t) => t.id_listActivity === v.id_listActivity) === i
  //   );

  //   if (getUnique.length === 0) {
  //     res.send({
  //       error: true,
  //       message: "Unsuccessful get data image",
  //     });
  //   }

  //   res.send({
  //     error: false,
  //     message: "Successful get data image",
  //     data: getUnique,
  //   });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
