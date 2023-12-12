import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {orderActions} from "../../../redux";
import {useState} from "react";
import css from "./KindOfPay.module.css"


const KindOfPay = ()=>{
    const [newPost, setNewPost] = useState(true)
    const [delivery, setDelivery] = useState(true)

    const {handleSubmit, register} = useForm()
    const dispatch = useDispatch()
    const onChange = (T) => {
        if(T.newPost){
            dispatch(orderActions.payMethod({"method": "Наложний платіж"}))
            setDelivery(false)
            dispatch(orderActions.error({message: ""}))
        }
        if (T.delivery){
            dispatch(orderActions.payMethod({"method": "Домовитись про спосіб оплати"}))
            setNewPost(false)
            dispatch(orderActions.error({message: ""}))
        }
        if(T.newPost===false&&T.delivery===false){
            setNewPost(true)
            setDelivery(true)
            dispatch(orderActions.error({message: "будь-ласка виберіть спосіб оплати"}))
        }
    }
    return(
        <div>
            <form onInput={handleSubmit(onChange)}>
                {newPost&&
                    <div className={css.mainDiv}>
                        <input type="checkbox" {...register('newPost')}/> <h3 className={css.textInput}>Наложний платіж</h3>
                    </div>}
                {delivery&&<div className={css.mainDiv}>
                    <input type="checkbox" {...register('delivery')}/> <h3 className={css.textInput}>Домовитись про спосіб оплати</h3>
                </div>}
            </form>
        </div>
    )
}

export {KindOfPay}