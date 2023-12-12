import css from "./footerComponent.module.css"
import {NavLink} from "react-router-dom";

const FooterComponent = () => {

  return(
   <footer className={css.bodyS}>
      <ul className={css.menu} >
        <li className={css.item} ><NavLink className={css.link} to={"/new"}>Новинки</NavLink></li>
        <li className={css.item} ><NavLink className={css.link} to={"/allPlants"}>Всі товари</NavLink></li>
        <li className={css.item} ><NavLink className={css.link} to={"/forSell"}>Розпродаж</NavLink></li>
        <li className={css.item} ><NavLink className={css.link} to={"/contacts"}> Контакти</NavLink></li>
      </ul>
   </footer>
  )
}

export {FooterComponent}