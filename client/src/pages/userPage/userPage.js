
import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react"
import { useDispatch} from "react-redux"
import jwtDecode from "jwt-decode"

import { userActions } from "../../redux/slices/userSlice"

import css from "./userPage.module.css"

const UserPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myOrder = () =>{
    navigate("myOrders")
  }


const Contact = () =>{
    navigate("contact")
}
useEffect(()=>{
  const token = localStorage.getItem("accessToken")
        const userId = jwtDecode(token)
        dispatch(userActions.getUserById(userId._id))
},[dispatch])

  return(
      <div className={css.Main}>
          <div className={css.LeftDiv}>
              <ul>
                <li><button className={css.liClose} onClick={ () => myOrder() }>мої замовлення</button></li>
                <li ><button className={css.liClose} onClick={ () => Contact() }>зворотній звязок</button></li>
              </ul>
          </div>
          <div className={css.RightDiv}>
            <Outlet/>
          </div>
      </div>
  )
}

export {UserPage}