import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/slices/userSlice";
import css from "./auth.module.css"

const AuthComponent = ()=>{

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const {auth} = useSelector(state => state.user)
    const {message} = auth

    const onSubmit = async (data) =>{
        await dispatch(userActions.getToken(data))
        const t = await localStorage.getItem("accessToken")
        await dispatch(userActions.checkToken(t))
    }
    return(
        <div className={css.Authdiv}>
            <form onSubmit={handleSubmit(onSubmit)} className={css.Formdiv}>
               
               <div className={css.Idiv}><input placeholder="email" className={css.inputEmail} type={"text"} {...register("email")} /></div> 
               <div className={css.Idiv}><input placeholder="password" className={css.inputPassword} type={"text"} {...register("password")}/></div> 
               <div className={css.Idiv}><button className={css.Button} >вхід!</button></div> 
            </form>
            {message && <div className={css.Message}>{message}</div> }

        </div>
    )
}

export {AuthComponent}