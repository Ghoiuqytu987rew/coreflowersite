import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {plantsActions} from "../../../redux";
import {CropImPlant} from "../crop/cropImagePlant";

import css from "./style.module.css"



const AddNewPlants = ()=>{
   const {handleSubmit, register} = useForm()
    const dispatch = useDispatch()
    const onSubmit = async (data) =>{
       const {PlantName, about, price } = data

       const plantsInfo = {PlantName: PlantName.toLowerCase(), about: about, price: price}

       dispatch(plantsActions.moveCropedFile(plantsInfo))
    }
    return(
        <div className={css.main}>
           <form onChange={handleSubmit(onSubmit)} >
               <h1>Назва: <input type={"text"} {...register("PlantName")}/></h1>
               <h1>Підкатегорія: <input type={"text"} {...register("PlantSub")}/></h1>
               <h1>Опис: <textarea {...register("about")}/></h1>
               <h1>Ціна: <input type={"number"} {...register("price")}/></h1>
            </form>

                <hr/>
                <h2 className={css.uploadTitle}>
                    Завантаж зображення:
                </h2>
                    <CropImPlant/>
        </div>
    )
}

export {AddNewPlants}