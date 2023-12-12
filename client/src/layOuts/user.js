import { useSelector } from "react-redux";
import {Headers} from "../components";
import {Outlet} from "react-router";
import { AuthComponent } from "../components/autorization/AuthComponent";

const User = ()=>{
    const {logIn} = useSelector(state => state.user)
    return(
        <div>
            <Headers/>
            <hr/>
            {!logIn&&<AuthComponent/>}
            <Outlet/>
        </div>
    )
}

export {User}