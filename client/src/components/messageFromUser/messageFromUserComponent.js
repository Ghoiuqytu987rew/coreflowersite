import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { messageActions } from "../../redux";
import { Replay } from "../replay/replayComponent";
import css from "./message.module.css"

const MessageFromUser = ({msg})=>{
    const {setReplay} = useSelector(state => state.message)
    const dispatch = useDispatch()
    const {createdAt,messageU,email, userName, _id} = msg
    const [state, setState] = useState(false)
    const navigate = useNavigate()

    const onClick = async () => {
        await dispatch(messageActions.becomeToRed(_id))
        setState(true)
    }

    const onDelete = async () => {
        await setState(false)
        await navigate("/admin")
        await dispatch(messageActions.delate(email))   
    }

    const onReplay = async () => {
        await dispatch(messageActions.setReplay(true))
    }
    
    return(
        <div >
            <button className={css.button} onClick={()=>onClick()} >
                <h2> : <i>{messageU.slice(0, 8)}</i> </h2>
            </button>
           {state&& <div >

                <h5 className={css.h}>дата: {createdAt}</h5>
                <h3 className={css.h}>імя користувача: {userName}</h3>
                <h3 className={css.h}>емейл: {email}</h3> 
                <hr/>
                <h1>{messageU}</h1>
                <button onClick={()=>onDelete()}>Видалити</button>
                <button onClick={()=>onReplay()}>Відповісти</button>
                {setReplay&&<Replay msg={msg}/>}
            </div>}
            

        </div>
    )
}

export {MessageFromUser}