import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { messageActions, } from "../../redux"
import { MessageFromUser } from "./messageFromUserComponent"

const MessagesFromUser = ()=>{
    const {message} = useSelector(state => state.message)
    const {filter} = useSelector(state => state.message)
    const [state, setState] = useState(false)
    const [statef, setStatef] = useState(true)
    const dispatch = useDispatch()

    const showAllMessage = () =>{
        setState(true)
        setStatef(false)
    }

    const showUnReadMessage = async () =>{
        await dispatch(messageActions.getByFilter(0))
        await setState(false)
        await setStatef(true)
    }

    useEffect(()=>{
        dispatch(messageActions.get())
    },[dispatch])
    
    return(
        <div >
            <button onClick={()=>showAllMessage()}>всі повідомлення</button>
            <button onClick={()=>showUnReadMessage()}>непрочитані</button>
           {state && <div>
                {
                message.map(value => <MessageFromUser key={message._id} msg={value}/>)
                }
            </div>}

            {statef && <div>
                {
                filter.map(value => <MessageFromUser key={filter._id} msg={value}/>)
                }
            </div>}
            

        </div>
    )
}

export {MessagesFromUser}