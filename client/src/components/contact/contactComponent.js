import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { messageActions } from "../../redux"
import { MesegeChatComponent } from "./mesegeChatComponent"

import css from "./contactComponent.module.css"
import jwtDecode from "jwt-decode"

const ContactComponent = ()=>{
    const {register, handleSubmit} = useForm()

    const dispatch = useDispatch()
    const {byEmail} = useSelector(state => state.message)
    const {replay} = useSelector(state => state.message)
    const email = localStorage.getItem("email")

    const onSubmit = async (data) =>{
        const message = await {
            email: localStorage.getItem("email"),
            messageU: data.text,
            messageA: "непрочитане",
            red: 0, 
            isUser: 1,
            userName: jwtDecode(localStorage.getItem("accessToken")).name}
        await dispatch(messageActions.sendMessageUG(message))

        await window.location.reload(false)
    }

    useEffect(()=>{
        dispatch(messageActions.getMessageByEmail(email))
    },[dispatch, email, replay])
    
 return(
     <div>
        <div className={css.ChatBoard}>
            {
                byEmail.map(value=> <MesegeChatComponent key={value._id} chat={value}/>)
            }
        </div>
        <form onSubmit={handleSubmit(onSubmit)}> 
            <div className={css.TextareaDivUser}>
                <input className={css.Textarea} {...register("text")}/>
                <button className={css.Button}>відправити</button>
            </div>
        </form>
       
     </div>
 )
}

export {ContactComponent}