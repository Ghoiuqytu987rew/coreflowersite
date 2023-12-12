import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useState } from "react"

import { messageActions } from "../../redux"

import css from "./contactComponent.module.css"

const ContactComponentGuest = ()=>{
    const [state, setState] = useState(true)
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const onSubmit = async (data) =>{

        if(data.email !== "" && data.text !== ""){
            const message = await {
            email: data.email, 
            messageU: data.text,
            messageA: "непрочитане",
            red: 0, 
            isUser: 0,
            userName: "Гість"
         }
        await dispatch(messageActions.sendMessageUG(message))
        setState(false)
        }

        
    }
    
 return(
     <div className={css.Main}>
        {state&&
        <form onSubmit={handleSubmit(onSubmit)}> 
            
                <div className={css.InputEmailDiv}>
                    <input placeholder="email" className={css.InputEmail} {...register("email")}/>
                </div>

              
              <div className={css.TextareaDiv} >  
                <textarea className={css.TextareaGuest} {...register("text")}/>
            </div>
            <div className={css.ButtonDiv}>
                <button className={css.ButtonGuest}>відправити</button>
            </div>
        </form>}
        {
            !state&&<div className={css.TextareaDiv}>
                <h1 className={css.h}>
                    Повідомлення надіслане
                </h1>
            </div>
        }
       
     </div>
 )
}

export {ContactComponentGuest}