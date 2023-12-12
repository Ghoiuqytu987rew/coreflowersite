import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";

import {userActions} from "../../redux/slices/userSlice";
import { UserCreated } from "../messages/userCreated/userCreatedComponent";

import css from "./sighUpComponent.module.css"

const SighUpComponent = () => {

    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const [err, setErr] = useState([])
    const [resp, setResp] = useState(null)
    useEffect(()=>{
        if(user.error){
            setErr(user.error)
            setResp(null)
        }
        if(user.respons){
            setResp(user.respons)
            setErr(null)
        }
         
    },[user.error, user.respons])

    const onClick = (user) => {
        dispatch(userActions.addNewUser(user))
    }
  return(

      <div className={css.Main}>
       {!resp&&<div className={css.Main}>
          <h1>Регістрація</h1>
          <form onSubmit={handleSubmit(onClick)}>
              <div className={css.DivInput}><h2>Імя:<input {...register("name")}/></h2></div>
              <div className={css.DivInput}><h2>Імя користувача :<input {...register("userName")}/></h2></div>
              <div className={css.DivInput}><h2>Емейл :<input {...register("email")}/></h2></div>
              <div className={css.DivInput}><h2>Повторити Емейл :<input {...register("replayEmail")}/></h2></div>
              <div className={css.DivInput}><h2>Пароль :<input {...register("password")}/></h2></div>
              <div className={css.DivInput}><h2>Повторити Пароль :<input {...register("replayPassword")}/></h2></div>
              {err&&<h4 className={css.Error}>{err}</h4>}
              <button><h1>Підтвердити</h1></button>
          </form>
          
        </div>}
        {resp&&<div>
            <UserCreated/>
            </div>}

      </div>
  )
}

export {SighUpComponent}