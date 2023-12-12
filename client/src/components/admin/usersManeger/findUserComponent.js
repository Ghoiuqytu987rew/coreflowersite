
import { useForm } from "react-hook-form"

import css from "./usersMComponent.module.css"
import { useDispatch } from "react-redux"
import { userActions } from "../../../redux/slices/userSlice"



const FindUserComponent = ()=>{

    const {handleSubmit, register} = useForm()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const item = await JSON.stringify(data)
        await dispatch(userActions.getUserById(item))
        await dispatch(userActions.UBIdShow("true"))
    }
    
    return(
        <div>
            <div className={css.FUD}>
                <form className={css.FUD} onSubmit={handleSubmit(onSubmit)}>
                   <div className={css.method}>метод пошуку <div className={css.mNeme}> імя <input type="checkbox" {...register("userName")}/></div>
                    <div> id <input type="checkbox" {...register("id")}/></div></div>
                    <input className={css.mInput} type="text" {...register("item")}/>
                    <button className={css.mButton}>знайти</button>
                </form>       
            </div>
        </div>
    )
}

export {FindUserComponent}