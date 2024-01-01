import React, { FC } from "react";
import styles from "./Slides.module.scss";

const Slide: FC = () => {
  return (
    <div className={`${styles.slides} ${styles.box}`}>
      <img
        src="https://source.unsplash.com/random/300×300"
        alt="sample images"
        width="400"
        height="300"
      />
    </div>
  );
};

export default Slide;
