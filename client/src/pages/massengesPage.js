import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router";
import jwtDecode from "jwt-decode"
import { useState, useEffect } from "react"

import { Activation } from "../components"
import { userActions } from "../redux/slices/userSlice"

import css from "../components/messages/userCreated/userCreatedComponent.module.css"

const MassengesPage = ()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {logIn} = useSelector(state => state.user)
    const {userShow} = useSelector(state => state.user)
    const {userById} = useSelector(state => state.user)
    const {auth} = useSelector(state => state.user)
    const [activateF, setActivateF] = useState(true)

    useEffect(()=>{
        try {
        const queryParams = new URLSearchParams(window.location.search)
        const token = queryParams.get("token")
        const { _id } = jwtDecode(token || "")
        dispatch(userActions.getUserById(_id))
        if(logIn&&userShow){
            navigate("/userPage")
        }
        if(_id === undefined){
            setActivateF(false) 
        }
      
        if(userById !== null){
            const {activate} = userById
            if(activate === 0){
                dispatch(userActions.getToken({}))
                setActivateF(false) 
                console.log("hello")
            }
        }
    } catch (error) {
        console.log(error)
    }
    },[dispatch, activateF, auth])
//  logIn, userShow, navigate, userById, dis,activateF
    return(
        <div className={css.Main}>
            {!activateF&& <h1 className={css.TitleH}>користувч не був активований:( </h1>}
            {activateF && <Activation/>}
        </div>
    )
}

export {MassengesPage}