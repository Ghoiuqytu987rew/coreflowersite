import jwtDecode from "jwt-decode"
import { useState, useEffect } from "react"
import css from "./admin.module.css"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { userActions } from "../../../redux/slices/userSlice"
import {messageActions} from "../../../redux";

const Admin = () => {
  const [userMenu, setUserMenu] = useState(false)
  const token = localStorage.getItem("accessToken")
  const [user, setUser] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch ()
  useEffect(()=>{
    if (token !== "0") {
      setUser(jwtDecode(token))
    }
    dispatch(userActions.checkTokenA(token))
  },[userMenu, setUserMenu])
  const onClick = () => {
    setUserMenu(true)
  }
  const closeMenu = () => {
    setUserMenu(false)
  }
  const openUserMenu = async () => {
    navigate("/admin")
    setUserMenu(false)
    await dispatch(messageActions.getByFilter(0))
  }
  const exitUser = async () => {
    await navigate("/new")
    dispatch(userActions.logIn(true))
    dispatch(userActions.userShow(false))
    dispatch(userActions.adminShow(false))
  
    setUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVlYjQxNWEyMTU0Mzc1Mzc4NjM2NGIiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2OTM1NDM3NDEsImV4cCI6MTY5MzYzMDE0MX0.PkOb0wjxsHvzEu_xwjdeT9nzzMcQuMYAS8EWTBlv8Eo")
    setUserMenu(false)
    localStorage.setItem("accessToken", "0")
    localStorage.removeItem("email")

    window.location.reload(false)
  }

  return(
    <div>
      <div >
        <button className={css.Button} onClick={ () => onClick() }>
        
        {!userMenu&&<>{user &&<div>
          {user.name[0].toUpperCase()}
        </div>
        }</>}
          </button>
           {userMenu&&<div className={css.miniMenu}>
            <ul>
              <li><button className={css.liClose} onClick={ () => openUserMenu() }>меню</button></li>
              <li ><button className={css.liClose} onClick={ () => closeMenu() }>закрити</button></li>
              <li ><button className={css.liClose} onClick={ () => exitUser() }>вийти</button></li>
            </ul>
          </div>
          }
      </div>
      </div>
  )
}
export {Admin}