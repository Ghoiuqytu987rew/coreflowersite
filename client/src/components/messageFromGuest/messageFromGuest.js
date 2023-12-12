import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { userActions } from "../../redux/slices/userSlice";
import { messageActions } from "../../redux";

import css from "./message.module.css"

const MessageFromGuest = ({msg})=>{
    const {userById} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {createdAt,message,_id,_user_id} = msg
    const [state, setState] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        
        dispatch(userActions.getUserById(_user_id))

    },[dispatch])

    const onClick = async () => {
        await dispatch(messageActions.becomeToRed(_id))
        setState(true)
    }

    const onDelete = async () => {
        await setState(false)
        await navigate("/admin")
        await dispatch(messageActions.delate(_id))
        
    }
    
    return(
        <div >
            <button className={css.button} onClick={()=>onClick()} >
                <h2> : <i>{message.slice(0, 8)}</i> </h2>
            </button>
           {state&& <div >

                <h5 className={css.h}>дата: {createdAt}</h5>
                <h6 className={css.h}>повідомлення від Гостя</h6>
                <h3 className={css.h}>емейл: {userById.email}</h3> 
                <hr/>
                <h1>{message}</h1>
                <button onClick={()=>onDelete()}>Видалити</button>
            </div>}
            

        </div>
    )
}

export {MessageFromGuest}