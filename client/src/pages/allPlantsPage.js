import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import css from "../components/headers/headers.module.css"
import { plantsActions } from "../redux";
import {AllPlants, Plant} from "../components";

const AllPlantsPage = ()=>{
    const {plants} = useSelector(state => state.plant)
    const {searchWithFilter} = useSelector(state => state.plant)
    const {handleSubmit, register} = useForm()
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const OnSubmitSearch = async (data) =>{
        const search = await {name: data.search, params: "new"} 
        await dispatch(plantsActions.searchWithFilter(JSON.stringify(search)))
        await dispatch(plantsActions.searchName(data))
        setState(true)
        
    }

    return(
        <div>
            <div>
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
            </div>
            <hr/>
                <div  >
                    {state &&<>
                    <h1>Результат пошкуку</h1>
                    <div className={css.AllPlants}>
                        {searchWithFilter.map(value => <Plant key={value._id} p={value}/>)}
                    </div></>}
                </div>
            <hr/>
           <AllPlants/>
        </div>
    )
}

export {AllPlantsPage}