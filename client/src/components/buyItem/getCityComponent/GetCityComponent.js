import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {novaPoshtaActions, orderActions} from "../../../redux";
import css from "../getDepartmentComponent/GetDepartmentComponent.module.css"

const GetCityComponent = ()=>{
    const {register, handleSubmit}  = useForm()
    const dispatch = useDispatch()
    const {cityString} = useSelector(state => state.novaPoshta)
    const {city} = useSelector(state => state.novaPoshta)
    console.log(cityString)

    const onChange = async (city) => {
        await dispatch(novaPoshtaActions.cityString(city.city))
    }
    useEffect(()=>{
        dispatch(novaPoshtaActions.getCity(`${cityString}`))
    }, [cityString])

    const onSubmit = (data) =>{
        if(data.city !== ""){
            dispatch(orderActions.error({message: ""}))
            dispatch(novaPoshtaActions.cityString(data.city))
            dispatch(novaPoshtaActions.departmentString(city[0].ref))
        }
        if(data.city === ""){
            
            dispatch(orderActions.error({message: "виберіть назву міста та адресу відділення з списків"}))
        }
    }

    return(  <div className={css.CityForm}>
        <h2 className={css.h2Title}>Введіть будь-ласка місто для доставки:</h2>
        <form onChange={handleSubmit(onChange)} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputDeliver}>
            <input placeholder="Місто" className={css.inputI} type="text" {...register("city")} list="cityList"/>
            <datalist id="cityList">
                {
                    city && <div>
                        {
                            city.map((value)=> <option key={value.ref} value={value.description}/>)
                        }
                    </div>
                }
            </datalist> 
        </div>
            {/* <button>Застосувати</button> */}
        </form>

    </div>)
}

export {GetCityComponent}
