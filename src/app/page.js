import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
       <p>Hello!</p>
       <button>Click me!</button>
    </div>
  );
}
