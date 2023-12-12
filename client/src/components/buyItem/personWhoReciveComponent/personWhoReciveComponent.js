import css from "./personWhoReciveComponent.module.css";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {orderActions} from "../../../redux";

const PersonWhoReciveComponent= ()=>{
    const [state, setState] = useState(true)
    const {personWhoOrder} = useSelector(state => state.order)
    const {personWhoWillTAke} = useSelector(state => state.order)
    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm()
    const {userById} = useSelector(state => state.user)
    const {numberOfBuyMenu} = useSelector(state => state.order)
    
    const onSubmit = (data) => {
        
        try{
            if(userById === null){
                if(data.lastName !== "" &&data.FirstName !== "" && data.PhoneNumber !== "" && data.email){
                    dispatch(orderActions.error({message: ""}))
                    dispatch(orderActions.personWhoWillTAke(data))
                    dispatch(orderActions.chengeNumberOfBuyMenu(3))
                }
                if(data.lastName === "" || data.FirstName === "" || data.PhoneNumber === "" || data.email === ""){
                    dispatch(orderActions.error({message: "заповніть будьласка всі поля"}))
                }
               
            }
            
            if(userById !== null){
                if(data.lastName !== "" && data.PhoneNumber !== ""){
                    dispatch(orderActions.error({message: ""}))
                    const dataU = {
                        lastName: data.lastName,
                        FirstName: data.FirstName,
                        PhoneNumber: data.PhoneNumber,
                        email: data.email
                    }
                    dispatch(orderActions.personWhoWillTAke(dataU)) 
                    dispatch(orderActions.chengeNumberOfBuyMenu(3))

                }
                if(data.lastName === "" || data.PhoneNumber === "" ){
                    dispatch(orderActions.error({message: "заповніть будьласка всі поля"}))
                }            
            }
           
        }
        catch(e){
            console.log(e)
        }
        
    }
    const onInput = (data) => {
        if (data.whoIsRecive === true){
            if(localStorage.getItem("accessToken") === "0"){
                dispatch(orderActions.chengeNumberOfBuyMenu(3))
            }
            setState(false)
            dispatch(orderActions.personWhoWillTAke(personWhoOrder))
            
        }
        else if (data.whoIsRecive === false){
            setState(true)
        }
    }

    return(
    <div>
            
        <div className={css.Title}>Будь-ласка введіть контактні дані особи котра забирає товар:</div>
            <form className={css.formClient} onInput={handleSubmit(onInput)} >

                    <div className={css.divFormCheckSign}>
                        <input type="checkbox" {...register('whoIsRecive')}/>
                        <h3 className={css.h6FormCheck}>Забирає замовник!</h3>
                    </div>

                <div className={css.formClient}>
                {state&&<>  
                    <div className={css.divFormClient}>
                        <input className={css.Input} placeholder="Прізвище" type="text" {...register("lastName")}/>
                    </div>
                    <div className={css.divFormClient}>
                        <input className={css.Input} placeholder="І'мя" type="text" {...register("FirstName")}/>
                    </div>
                    <div className={css.divFormClient}>
                        <input className={css.Input} placeholder="Телефн:+3 (---) --- -- --" type="text" {...register("PhoneNumber")}/>
                    </div>
                    <div className={css.divFormClient}>
                        <input className={css.Input} placeholder="Емейл" type="text" {...register("email")}/>
                    </div>
                    </>}
                    {!state&&<div className={css.divUserTake}>  
                    <div className={css.divFormClient}>
                        <input className={css.Input} placeholder="Прізвище" type="text" {...register("lastName")}/>
                    </div>
                    <div className={css.divFormClient}>
                        <input className={css.Input} placeholder="Телефн:+3 (---) --- -- --" type="text" {...register("PhoneNumber")}/>
                    </div>
                    </div>}

                    <div className={css.ButonDiv}>
                        <button className={css.Buton} onClick={()=>{dispatch(orderActions.chengeNumberOfBuyMenu(numberOfBuyMenu - 1))}} >Назад</button>
                        <button className={css.Buton} onClick={handleSubmit(onSubmit)}>Далі</button>
                    </div>

                </div>    
            </form>
        </div>
    )
}

export {PersonWhoReciveComponent}