import classNames from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "components/SvgIcons";
import styles from "./Pagination.module.css";

type Props = {
  length: number | null;
  prev: number | null;
  next: number | null;
  currentPage: number | null;
  click: (value: number) => void;
};

function Pagination(props: Props) {
  const { length, prev, next, currentPage, click } = props;
  const pad = [...Array(length)].map((e, i) => (
    <button
      key={i}
      className={classNames({
        [styles.active]: currentPage === i + 1,
      })}
      onClick={() => click(i + 1)}
    >
      {i + 1}
    </button>
  ));

  return (
    <div className={styles.pagination}>
      <button
        disabled={prev === null ? true : false}
        onClick={() => click(prev || 1)}
      >
        <ArrowLeftIcon />
      </button>
      {pad}

      <button
        disabled={next === null ? true : false}
        onClick={() => click(next || 1)}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}

export default Pagination;
