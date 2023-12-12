import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {orderActions} from "../../../redux";
import {useState} from "react";
import css from "./kindOfDelivery.module.css"


const KindOfDelivery = ()=>{
    const [newPost, setNewPost] = useState(true)
    const [delivery, setDelivery] = useState(true)

    const {handleSubmit, register} = useForm()
    const dispatch = useDispatch()
    const onChange = (T) => {
         if(T.newPost){
             dispatch(orderActions.deliveryMethod({"method": "нова пошта"}))
             setDelivery(false)
             dispatch(orderActions.newPostShow(1))
         }
         if (T.delivery){
             dispatch(orderActions.deliveryMethod({"method": "Вивіз по місту"}))
             setNewPost(false)
             dispatch(orderActions.newPostShow(2))
         }
        if(T.newPost===false&&T.delivery===false){
            setNewPost(true)
            setDelivery(true)
            dispatch(orderActions.newPostShow(0))
        }
    }
    return(
        <div>
            <div className={css.Title}>Будь-ласка заповніть форму доставки:</div>
            <form onInput={handleSubmit(onChange)}>
                {newPost&&
                    <div className={css.mainDiv}>
                    <input className={css.input} type="checkbox" {...register('newPost')}/> <h3>Нова пошта по Україні</h3>
                </div>}
                {delivery&&<div className={css.mainDiv}>
                    <input className={css.input} type="checkbox" {...register('delivery')}/> <h3>Вивіз по місту Полтава</h3>
                </div>}
            </form>
        </div>
    )
}

export {KindOfDelivery}