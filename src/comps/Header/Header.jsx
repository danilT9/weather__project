import { useState, useEffect } from "react";
import { SignUp } from "./SignUp";
import styles from "./Header.module.css";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [signData, setSignData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      const accountData = JSON.parse(account);
      if (accountData.username) {
        setUser(accountData.username);
      };
    };
  }, [isModalOpen]);
  
  return (
    <>
      {isModalOpen && <SignUp
        onClose={() => setIsModalOpen(false)}
        signData={signData}
        setSignData={setSignData}
      />}
      <header className={styles.header}>
        <div className={styles.header__container}>
          <ul className={styles.header__container__list}>
            <li className={styles.header__container__list__item}>
              <button className={styles.header__container__list__item__logo}></button>
            </li>
            <li className={styles.header__container__list__item}>
              <a className={styles.header__container__list__item__link} href=".">Who we are</a>
              <a className={styles.header__container__list__item__link} href=".">Contacts</a>
              <a className={styles.header__container__list__item__link} href=".">Menu</a>
            </li>
            <li className={styles.header__container__list__item}>
              {user ? (
                <button className={styles.header__container__list__item__sign_up}>{user}</button>
              ) : (
                <button onClick={() => setIsModalOpen(true)} className={styles.header__container__list__item__sign_up}>Sign Up</button>
              )}
              <button className={styles.header__container__list__item__user}></button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}