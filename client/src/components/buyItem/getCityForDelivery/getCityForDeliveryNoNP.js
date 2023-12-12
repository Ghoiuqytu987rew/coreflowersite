import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {orderActions} from "../../../redux";
import css from "../getDepartmentComponent/GetDepartmentComponent.module.css"

const GetCityForDeliveryNoNP = ()=>{
    const {numberOfBuyMenu} = useSelector(state => state.order)
    const {register, handleSubmit}  = useForm()
    const dispatch = useDispatch()

   
   

    const onSubmit = (data) =>{
        if(data.department !== "" && data.city !== ""){
            dispatch(orderActions.error({message: ""}))
            dispatch(orderActions.adressNoNP(data))
            dispatch(orderActions.chengeNumberOfBuyMenu(4))
        }
        if(data.department === "" || data.city === ""){
            
            dispatch(orderActions.error({message: "введіть будь-ласка назву району та вулиці для доставки"}))
        }
    }

    return(  <div className={css.CityForm}>

        <h2 className={css.h2Title}>Введіть будь-ласка район та адресу для доставки:</h2>

        <form>

        <div className={css.inputDeliver}>
            <input placeholder="Район" className={css.inputI} type="text" {...register("city")}/>
          
        </div>
            <h2 className={css.h2Title}>введіть назву вулиці:</h2>
            <div className={css.inputDeliver}>
                <input placeholder="Вулиця та номер будинку" className={css.inputI} type="text" {...register("department")} />
            </div>
                <div className={css.ButonDiv}>
                    <button className={css.Buton} onClick={()=>{dispatch(orderActions.chengeNumberOfBuyMenu(numberOfBuyMenu - 1))}} >Назад</button>
                    <button className={css.Buton} onClick={handleSubmit(onSubmit)}>Далі</button>
                </div> 
        </form>

    </div>)
}

export {GetCityForDeliveryNoNP}
