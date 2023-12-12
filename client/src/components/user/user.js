import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import jwtDecode from "jwt-decode"

import { userActions } from "../../redux/slices/userSlice"

import css from "./user.module.css"

const User = () => {

  const [userMenu, setUserMenu] = useState(false)
  const token = localStorage.getItem("accessToken")

  const navigate = useNavigate()
  const dispatch = useDispatch ()
  const [user, setUser] = useState(jwtDecode(token))

  useEffect(()=>{
  },[userMenu])

  const onClick = () => {
    setUserMenu(true)
  }


  const closeMenu = () => {
    setUserMenu(false)
  }

  const openUserMenu = () => {
    navigate("/userPage")
    setUserMenu(false)
  }

  const exitUser = async () => {
    
    await navigate("/new")
    await dispatch(userActions.logIn(true))
    await dispatch(userActions.userShow(false))
    await dispatch(userActions.adminShow(false))
    
    await setUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVlYjQxNWEyMTU0Mzc1Mzc4NjM2NGIiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2OTM1NDM3NDEsImV4cCI6MTY5MzYzMDE0MX0.PkOb0wjxsHvzEu_xwjdeT9nzzMcQuMYAS8EWTBlv8Eo")
    
    localStorage.setItem("accessToken", "0")
    localStorage.removeItem("order")
    localStorage.removeItem("email")

    setUserMenu(false)
    window.location.reload(false)
  }

  return(
      <div >
        <button className={css.Button} onClick={ () => onClick() }>
        
        {!userMenu&&<>{user !== undefined &&<div>
          {user.name[0].toUpperCase()}
        </div>
        }
        </>}

         
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
  )
}

export {User}