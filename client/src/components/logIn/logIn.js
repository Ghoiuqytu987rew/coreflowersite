import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {userActions} from "../../redux/slices/userSlice";

const LogIn = ()=>{
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const onSubmit = async (data) =>{
        await dispatch(userActions.getToken(data))
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={"text"} {...register("email")} />
                <input type={"text"} {...register("password")}/>
                <button>submit!!</button>
            </form>

        </div>
    )
}

export {LogIn}