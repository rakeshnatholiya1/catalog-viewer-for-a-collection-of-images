import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import {
  PlayArrow,
  Pause,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import "./catalogViewer.css";

const images = [
  {
    id: 1,
    src: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
    details:
      "details With nearly 50 years global experience mobilizing international coalitions for the protection of wilderness, working in over 40 countries, WILD has substantial reach. Each year we draw on this reach to expand and strengthen to protect and defend our wild Earth",
  },
  {
    id: 2,
    src: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
    details:
      "Nature provides us with water to drink, air to breathe, food to eat, clothes to wear, and a shelter to live in. Imbalance in nature can be life-threatening to all. Many factors are disturbing the balance of nature, like industrialisation, technology, etc. Nature conservation is an important factor in saving nature.",
  },
  {
    id: 3,
    src: "https://img.freepik.com/premium-photo/mountains-during-flowers-blossom-sunrise-flowers-mountain-hills-beautiful-natural-landscape-summer-time-mountainimage_647656-1502.jpg?w=2000",
    details:
      "Nature is the ultimate source of our living. Both living and non-living things include nature, and everyone is interdependent, which helps maintain the ecosystem. Plants, animals, and humans all depend on nature for their survival. It supplies oxygen, sunlight, soil, water, and other necessary components.",
  },
];

const CatalogViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="container">
      <div className="catalog-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className="image-container">
              <img
                src={images[currentIndex].src}
                alt={`Image ${currentIndex + 1}`}
              />

              <Typography variant="body1" className="details">
                <h1>Nature Image</h1>
                {images[currentIndex].details}
              </Typography>
            </div>

            <div className="thumbnail-container">
              <IconButton onClick={handlePrevious}>
                <NavigateBefore />
              </IconButton>
              {images.map((image, index) => (
                <img
                  key={image.id}
                  className={`thumbnail ${
                    index === currentIndex ? "active" : ""
                  }`}
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
              <IconButton onClick={handleNext}>
                <NavigateNext />
              </IconButton>
              <div className="playbtn">
                <IconButton onClick={handlePlayPause}>
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="controls controlsBottom">
            <IconButton onClick={handlePrevious}>
              <NavigateBefore />
            </IconButton>

            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleNext}>
              <NavigateNext />
            </IconButton>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default CatalogViewer;
