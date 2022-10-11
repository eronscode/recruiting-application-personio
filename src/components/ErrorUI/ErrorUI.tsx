import styles from "./ErrorUI.module.css";

type Props = {
  message: string;
  reset?: () => void;
};

function ErrorUI({ message, reset }: Props) {
  return (
    <div className={styles.wrapper}>
      <h1>{message}</h1>
      {typeof reset === "function" && <button onClick={reset}>Retry</button>}
    </div>
  );
}

export default ErrorUI;
