import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { messageActions } from "../../redux"

import { MesegeChatComponent } from "../contact/mesegeChatComponent"
import { useEffect } from "react"

import css from "./replayComponent.module.css"

const Replay = ({msg})=>{
    const {byEmail} = useSelector(state => state.message)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(messageActions.getMessageByEmail(msg.email))
    }, [dispatch])

    // const {createdAt, email, isUser, messageA,
    //     messageU, red, updatedAt, _id,} = byEmail
    const {handleSubmit, register} = useForm()

    const onSubmit = async (data) =>{
        await dispatch(messageActions.setReplay(false))
        const replay = await {id: msg._id, message: data.replay}
        await dispatch(messageActions.replay(replay))
        // console.log(msg)
       
    }

 return(<div >


     <div className={css.ReplayForm}>
        {
            byEmail.map(value=> <MesegeChatComponent key={value._id} chat={value}/>)
        }
     </div>
      <form className={css.Main} onSubmit={handleSubmit(onSubmit)}>
            <input className={css.Textarea} {...register("replay")}/>
            <button className={css.Button}>відповісти</button>
        </form>
     </div>
 )
}

export {Replay}



    
