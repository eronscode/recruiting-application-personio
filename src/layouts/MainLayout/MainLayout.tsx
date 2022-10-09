import * as React from "react";
import classnames from "classnames";
import Content from "../Content";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./mainLayout.module.css";

type Props = {
  children: React.ReactNode;
  loggedIn?: boolean;
  className?: string;
};

const MainLayout = ({ children, className }: Props) => {
  return (
    <div className={classnames(styles.mainLayout, className)}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default MainLayout;
