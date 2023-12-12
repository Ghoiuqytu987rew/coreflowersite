import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {plantsActions} from "../../../redux";

import css from "./style.module.css"



const EditPlant = ({id})=>{
   const {handleSubmit, register} = useForm()
    const dispatch = useDispatch()
    const onSubmit = async (data) =>{
       const {PlantName, PlantSub, about } = data

       const plantsInfo = await {id: id,PlantName: PlantName.toLowerCase(), PlantSub: PlantSub, about: about}
       await dispatch(plantsActions.editInfo(plantsInfo))
       await  dispatch(plantsActions.buttonFormChange(false))
    }
    return(
        <div className={css.main}>
           <form onSubmit={handleSubmit(onSubmit)} >
               <h1>Назва: <input type={"text"} {...register("PlantName")}/></h1>
               <h1>Підкатегорія: <input type={"text"} {...register("PlantSub")}/></h1>
               <h1>Опис: <textarea {...register("about")}/></h1>
               <button>змінити</button>
            </form>
        </div>
    )
}

export {EditPlant}