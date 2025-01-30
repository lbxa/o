import styles from "./Blur.module.css";

export const Blur = () => {
  return (
    <>
      <div class={styles.gradient}>
        <div class={styles.blurCircle}></div>
        <div class={styles.blurCircle}></div>
        <div class={styles.blurCircle}></div>
        <div class={styles.blurCircle}></div>
      </div>
      <div class={styles.blurOverlay}></div>
    </>
  );
};
