import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import jwtDecode from "jwt-decode";

import {orderActions} from "../../../redux";
import { userActions } from "../../../redux/slices/userSlice";
import { useEffect, useState } from "react";

import css from "./userInfoComponent.module.css";

const UserInfoComponent = () => {
    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm()
    const [userShow, setUserShow] = useState(false)
    
    const {checkToken} = useSelector(state => state.user)
    const {userById} = useSelector(state => state.user)
    const onSubmit = (data) => {
        
        if(!userShow){
            if(data.lastName !== "" &&data.FirstName !== "" && data.PhoneNumber !== "" && data.email){
                dispatch(orderActions.error({message: ""}))
                dispatch(orderActions.personWhoOrder(data))
                dispatch(orderActions.chengeNumberOfBuyMenu(2))
            }
            if(data.lastName === "" || data.FirstName === "" || data.PhoneNumber === "" || data.email === ""){
                dispatch(orderActions.error({message: "заповніть будьласка всі поля"}))
            }
        }
        if(userShow){
            dispatch(orderActions.personWhoOrder(data))
            dispatch(orderActions.chengeNumberOfBuyMenu(2))
            
        }
    }
    
    useEffect(()=>{
        if(checkToken != null || undefined){
            if(checkToken.user === "vereficated"){
                const user = jwtDecode(localStorage.getItem("accessToken"))
                dispatch(userActions.getUserById(user._id))
                setUserShow(true)
            }     
        }  
    },[checkToken,dispatch, userShow])


    return(
        <div>
                <div>
                    {!userShow && <div className={css.formClient}>
                        <div className={css.Title}>Будь-ласка введіть контактні дані замовника:</div>
                     <form className={css.formClient} onSubmit={handleSubmit(onSubmit)}>

                        <div className={css.divFormClient}>
                            <input className={css.Input} placeholder="Прізвище" type="text" {...register("lastName")}/>
                        </div>
                        <div className={css.divFormClient}>
                            <input className={css.Input} placeholder="І'мя" type="text" {...register("FirstName")}/>
                        </div>
                        <div className={css.divFormClient}>
                            <input className={css.Input} placeholder="Телефн: +3 (---) --- -- --" type="text" {...register("PhoneNumber")}/>
                        </div>
                        <div className={css.divFormClient}>
                            <input className={css.Input} placeholder="Емейл" type="text" {...register("email")}/>
                        </div>

                        <div className={css.ButonDiv}>
                            <button className={css.Buton}>Далі</button>
                        </div>

                        
                    </form>
                    </div>}
                    {
                        userShow&& userById != null &&<div>
                         <form className={css.formClient} onSubmit={handleSubmit(onSubmit)}>

                            
                                <div className={css.divFormClientA}>
                                    <div className={css.h6FormClient}>Ім'я:</div>
                                    <div>{userById.name}</div>
                                </div>
                
                                <div className={css.divFormClientB}>
                                    <div className={css.h6FormClient}>Емейл:</div>
                                    <div>{userById.email}</div>
                                </div>

                                <div className={css.ButonDiv}>
                                    <button className={css.Buton}>Далі</button>
                                </div>
                            </form>
                        </div>
                    }
                   
                </div>
        </div>
    )
}
export {UserInfoComponent}