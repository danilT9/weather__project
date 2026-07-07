import s from "./Footer.module.css";
import instagramIcon from "../../assets/icons/instagram.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import whatsupIcon from "../../assets/icons/whatsup.svg";


export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <ul className={s.footer__container__list}>
          <li className={s.footer__container__list__item}>
            <button className={s.footer__container__list__item__logo}></button>
          </li>
          <li className={s.footer__container__list__item}>
            <h3>Address</h3>
            <ul className={s.footer__container__list__item__list__address}>
              <li><p>Svobody str. 35</p></li>
              <li><p>Kyiv</p></li>
              <li><p>Ukraine</p></li>
            </ul>
          </li>
          <li className={s.footer__container__list__item}>
            <h3>Contact us</h3>
            <ul className={s.footer__container__list__item__list__contact}>
              <li><a href="https://instagram.com"><img src={instagramIcon} alt="instagram" /></a></li>
              <li><a href="https://facebook.com"><img src={facebookIcon} alt="facebook" /></a></li>
              <li><a href="https://whatsup.com"><img src={whatsupIcon} alt="whatsup" /></a></li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  )
}