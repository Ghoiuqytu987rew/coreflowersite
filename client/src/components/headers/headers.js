import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {AuthComponent} from "../autorization/AuthComponent";
import {plantsActions} from "../../redux";
import { User } from "../user/user";
import { userActions } from "../../redux/slices/userSlice";
import { Admin } from "../admin/adminComponent/admin";

import css from "./headers.module.css"
import { MenuFormM } from "../menuforM/menuForm";

const Headers = ()=>{
    const {handleSubmit, register} = useForm()
    const {checkToken} = useSelector(state => state.user)
    const {logIn} = useSelector(state => state.user)
    const {userShow} = useSelector(state => state.user)
    const {admin} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {plants} = useSelector(state => state.plant)
    const [set, setSet] = useState(false)

    const OnClickLogin = async () =>{
        await dispatch(userActions.logIn(false))
        const t = await localStorage.getItem("accessToken")

        await dispatch(userActions.checkToken(t))
    }
    useEffect(()=>{

        const t = localStorage.getItem("accessToken")

        if (!set) {
            dispatch(userActions.checkToken(t))
            setSet(true)
        }

        dispatch(plantsActions.getAll("1"))

                if(checkToken != null || undefined){
                    if(checkToken.user != null || undefined){
                        if(checkToken.user === "vereficated"){
                            dispatch(userActions.logIn(true))
                            dispatch(userActions.userShow(true))
                        }  
                    }
                    if(checkToken.admin != null || undefined){
                        if(checkToken.admin === "vereficated"){
                            dispatch(userActions.logIn(true))
                            dispatch(userActions.userShow(false))
                            dispatch(userActions.adminShow(true))
                        }  
                    }
                } 
    },[checkToken,dispatch,logIn, set])

    const OnSubmitSearch = async (data) =>{
        navigate("/search")
        const search = await {name: data.search, params: "new"} 
        await dispatch(plantsActions.searchWithFilter(JSON.stringify(search)))
        await dispatch(plantsActions.searchName(data))
        
    }
    const OnClickSignUp = () =>{
        navigate("/signUp")
    }
    return(
        <div className={ css.Header }>
            <div className={ css.MenuM }>
                    <MenuFormM/>
            </div>
            <div className={ css.LeftBar }>
                
                <NavLink className={css.Links} to={"/new"}> Новинки </NavLink>
                <NavLink className={css.Links} to={"/allPlants"}> Всі товари </NavLink>
                <NavLink className={css.Links} to={"/forSell"}> Розпродаж </NavLink>
                <NavLink className={css.Links} to={"/contacts"}> Контакти </NavLink>
            </div>
            
            <div className={ css.RightBar }>
            
                <form onSubmit={handleSubmit(OnSubmitSearch)}>
                    <input className={css.Input} {...register('search')} list="plantsList" />

                    <datalist id="plantsList">
                        {
                            plants.data && <div>
                                {
                                    plants.data.map((value)=> <option key={value.ref} value={value.PlantName}/>)
                                }
                            </div>
                        }
                    </datalist>

                    <button className={css.Button}> Пошук </button>
                </form>
                
                  {logIn&&<>{!userShow && <div className={css.LogIn}>
                  
                        <button className={css.ButtonLogIn} onClick={() => OnClickLogin()}>LogIn</button>
                        <button className={css.ButtonSighIn} onClick={() => OnClickSignUp()}>SighUp</button>

                    </div>}</>}

                  
                    {/* {!logIn&&<div className={css.AuthdivMV}><AuthComponent/></div>} */}

                   {logIn&&<>{userShow&&<div className={css.User}>
                    <User/>
                    </div>}</>}
                    
                    {logIn&&<>{!userShow&& <div>
                        {admin&& <div className={css.User}>
                            <Admin/>         
                        </div>
                        }
                    </div>}</>}

            </div>
            
        </div>
    )
}

export {Headers}