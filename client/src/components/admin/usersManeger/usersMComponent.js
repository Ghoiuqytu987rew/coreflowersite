
import { useDispatch, useSelector } from "react-redux"
import css from "./usersMComponent.module.css"
import { useEffect } from "react"

import { userActions } from "../../../redux/slices/userSlice"
import { UserMComponent } from "./userMComponent"



const UsersMComponent = ()=>{

    const {allUsers} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userActions.getAllUsers())
    }, [dispatch])
    
    return(
        <div className={css.main}>
            {allUsers && <div className={css.Orders}>
                {allUsers.map(value => <UserMComponent key={value._id} users={value}/>) }
            </div>
                }
        </div>
    )
}

export {UsersMComponent}