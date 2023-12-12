import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {messageActions} from "../redux";

const Ssl = () => {
    const {SSl} = useSelector(state => state.message)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(messageActions.getSSl())
    },[dispatch])
    return(
        <>
            {SSl}
        </>
    )

}

export {Ssl}