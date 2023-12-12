import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {novaPoshtaActions, orderActions} from "../../../redux";
import css from "./GetDepartmentComponent.module.css"

const GetDepartmentComponent = ()=>{
    const {numberOfBuyMenu} = useSelector(state => state.order)
    const {register, handleSubmit}  = useForm()
    const dispatch = useDispatch()
    const {departmenString} = useSelector(state => state.novaPoshta)
    const {department} = useSelector(state => state.novaPoshta)
    console.log(numberOfBuyMenu)

    useEffect(()=>{
        
        dispatch(novaPoshtaActions.getDepartment(departmenString))

    }, [departmenString, dispatch, numberOfBuyMenu])
    const onSubmit = (data) =>{
        if(data.department !== ""){
            dispatch(orderActions.error({message: ""}))
            dispatch(orderActions.departmentOfCity(data))
            dispatch(orderActions.chengeNumberOfBuyMenu(4))
        }
        if(data.department === ""){
            
            dispatch(orderActions.error({message: "виберіть назву міста з списку міст"}))
        }
    }

    return(  <div className={css.Department}>
        <h2 className={css.h2Title}>введіть будь-ласка адресу відділення</h2>
        <form>
            <div className={css.inputDeliver}>
                <input placeholder="Адреса відділення" className={css.inputI} type="text" {...register("department")} list="departmentList"/>
                <datalist id="departmentList">
                    {
                        department && <div>
                            {
                                department.map((value)=> <option key={value.ref} value={value.description}/>)
                            }
                        </div>
                    }
                </datalist>
            </div>
                <div className={css.ButonDiv}>
                    <button className={css.Buton} onClick={()=>{dispatch(orderActions.chengeNumberOfBuyMenu(numberOfBuyMenu - 1))}} >Назад</button>
                    <button className={css.Buton} onClick={handleSubmit(onSubmit)}>Далі</button>
                </div> 
            {/* <button>Застосувати</button> */}
        </form>

    </div>)
}

export {GetDepartmentComponent}


