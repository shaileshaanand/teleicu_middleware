var http = require("http");
const dotenv = require("dotenv");

Cam = require("onvif").Cam;

dotenv.config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const port = 8090;

const app = express();

app.use(cors());

let cameraInstances = [];

const camParams = {
  useSecure: true,
  hostname: "dev_camera.coronasafe.live",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: 443,
};

app.get("/", (req, res) => {
  console.log("Camera Params", camParams);
  new Cam(camParams, function (arg) {
    cameraInstances = [
      ...cameraInstances,
      {
        hostname: "testcamera0001.in.ngrok.io",
        cameraInstance: this,
        error: arg,
      },
    ];
    this.gotoPreset(
      {
        preset: 2,
      },
      () => {
        console.log("Callback");
      }
    );
  });
  res.send("Hello World!");
});

app.get("/move", (req, res) => {
  const camParams = {
    hostname: "192.168.1.64",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: 80,
  };
  console.log("Camera Params", camParams);
  new Cam(camParams, function (err) {
    this.gotoPreset(
      {
        preset: 1,
      },
      () => {
        console.log("Callback");
      }
    );
  });
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
