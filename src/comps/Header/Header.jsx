import { useState, useEffect } from "react";
import { SignUp } from "./SignUp";
import styles from "./Header.module.css";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      }
    }
  }, [isModalOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

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
            
            <li className={`${styles.header__container__list__item} ${styles.desktop_nav}`}>
              <a className={styles.header__container__list__item__link} href=".">Who we are</a>
              <a className={styles.header__container__list__item__link} href=".">Contacts</a>
              <a className={styles.header__container__list__item__link} href=".">Menu</a>
            </li>
            
            <li className={`${styles.header__container__list__item} ${styles.desktop_actions}`}>
              {user ? (
                <button className={styles.header__container__list__item__sign_up}>{user}</button>
              ) : (
                <button onClick={() => setIsModalOpen(true)} className={styles.header__container__list__item__sign_up}>Sign Up</button>
              )}
              <button className={styles.header__container__list__item__user}></button>
            </li>

            <li className={styles.burger_menu_btn_item}>
              <button className={styles.burger_button} onClick={toggleMenu}>
                <span className={`${styles.burger_bar} ${isMenuOpen ? styles.open : ""}`}></span>
                <span className={`${styles.burger_bar} ${isMenuOpen ? styles.open : ""}`}></span>
                <span className={`${styles.burger_bar} ${isMenuOpen ? styles.open : ""}`}></span>
              </button>
            </li>
          </ul>
        </div>

        <div className={`${styles.mobile_menu} ${isMenuOpen ? styles.mobile_menu_open : ""}`}>
          <a onClick={() => setIsMenuOpen(false)} href=".">Who we are</a>
          <a onClick={() => setIsMenuOpen(false)} href=".">Contacts</a>
          <a onClick={() => setIsMenuOpen(false)} href=".">Menu</a>
          {user ? (
            <button className={styles.header__container__list__item__sign_up}>{user}</button>
          ) : (
            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className={styles.header__container__list__item__sign_up}>Sign Up</button>
          )}
        </div>
      </header>
    </>
  );
};