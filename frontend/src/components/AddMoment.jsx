import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
export const AddMoment = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  const [loadImages, setLoadImages] = useState([""]);
  //   const reader = useRef();
  const imageHandler = async (e) => {
    console.log(e);
    const imageList = e.target.files;
    const loadingImages = [];

    for (let i = 0; i < imageList.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        loadingImages.push(reader.result);
        setLoadImages(loadingImages);
      };
      reader.readAsDataURL(imageList[i]);
      console.log("i", imageList[i], i, loadingImages);
    }
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setLoadImages(reader.result);
    // };
    // reader.readAsDataURL(imageList[0]);

    // setLoadImages(loadingImages);
    // console.log("load images", loadImages);
  };
  //   function srcset(image, size, rows = 1, cols = 1) {
  //     return {
  //       src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
  //       srcSet: `${image}?w=${size * cols}&h=${
  //         size * rows
  //       }&fit=crop&auto=format&dpr=2 2x`,
  //     };
  //   }
  return (
    <div>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => imageHandler(e)}
        />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" multiple />
        <PhotoCamera />
      </IconButton>

      <input type="text" onChange={(e) => setContent(e.target.value)} />
      <button>publish</button>
      {loadImages && loadImages.length > 0 && (
        <ImageList
          sx={{ width: 500, height: 450 }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {loadImages.map((image) => (
            <img src={image} width={"100px"} />
          ))}
        </ImageList>
      )}
    </div>
  );
};
