import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import jwtDecode from "jwt-decode";

import {orderActions} from "../../redux";
import { OrderById } from "./orderById";

import css from "./ordersById.module.css"

const OrdersById = () => {
    const dispatch = useDispatch()
    const {ordersById} = useSelector(state => state.order)
    const user = jwtDecode(localStorage.getItem("accessToken"))

    useEffect(()=>{
        dispatch(orderActions.getOrdersByUserId(user._id))
      
    },[dispatch, user._id])
  return(
      <div>
          {
              ordersById.ordersByUser && <div className={css.Main}>
                  {ordersById.ordersByUser.map(value => <OrderById key={value._id} order={value}/>)}
               </div>

          } 
      </div>
  )
}

export {OrdersById}