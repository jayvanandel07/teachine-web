import React from "react";
import styles from "./SlidesPanel.module.scss";
import Slide from "./Slide";

const SlidesPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={`${styles.panelNavigation}`}>
        <p className={`${styles.active}`}>slides</p>
        <p className={``}>assets</p>
      </div>
      <div className={`${styles.slidesContainer}`}>
        <Slide />
        <Slide></Slide>
        <Slide></Slide>
        <Slide></Slide>
      </div>
    </div>
  );
};

export default SlidesPanel;
