import React, { FC } from "react";
import styles from "./Slides.module.scss";

const Slide: FC = () => {
  return (
    <div className={`${styles.slides} ${styles.box}`}>
      <div />
    </div>
  );
};

export default Slide;
