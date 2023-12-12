import { useState } from "react"


import css from "./menuForm.module.css"
import { NavLink } from "react-router-dom"

const MenuFormM = () => {

  const [userMenu, setUserMenu] = useState(false)

  const onClick = () => {
    setUserMenu(true)
  }


  const closeMenu = () => {
    setUserMenu(false)
  }


  return(
      <div >
        <button className={userMenu ? css.ButtonNon : css.Button } onClick={ () => onClick() }>Меню</button>
           {userMenu&&<div className={css.miniMenu}>
            <ul>
                <li><NavLink className={css.liClose}  to={"/new"} onClick={ () => closeMenu() }> Новинки </NavLink></li>
                <li><NavLink className={css.liClose}  to={"/allPlants"} onClick={ () => closeMenu() }> Всі товари </NavLink></li>
                <li><NavLink className={css.liClose}  to={"/forSell"} onClick={ () => closeMenu() }> Розпродаж </NavLink></li>
                <li><NavLink className={css.liClose}  to={"/contacts"} onClick={ () => closeMenu() }> Контакти </NavLink></li>
                <li><NavLink className={css.liClose}  onClick={ () => closeMenu() }> Закрити </NavLink></li>
            </ul>
            
          </div>
          }
      </div>
  )
}

export {MenuFormM}