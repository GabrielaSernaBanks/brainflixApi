const { Console } = require('console');
const express = require('express');
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

function readVideosFile() {
  const videosData = fs.readFileSync("./data/videos.json");
  const parsedVideoData = JSON.parse(videosData);
  return parsedVideoData;
}

router.get("/", (req, res) => {
  const videos = readVideosFile();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videos = readVideosFile();
  const filteredVideo = videos.filter((video) => {
    return video.id === req.params.id
  });
  if (filteredVideo.length == 0) {
    res.status(404).send("ID not found")
  } else {
    res.status(202).json(filteredVideo);
  }
});

router.post("/", (req,res) => {
  console.log(req.body);
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: req.body.channel,
    image: "./public/images/Upload-video-preview.jpg",
    description: req.body.description,
    views: 0,
    likes: 0,
    duration: "0:00",
    video: req.body.video,
    timestamp: new Date().toISOString(),
    comments: []
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  res.status(201).json({newVideo});

})

module.exports = router;
