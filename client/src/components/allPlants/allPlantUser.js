import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {plantsActions} from "../../redux";
import {PlantUser} from "../plant/PlantUser";

import css from "./allPlantUser.module.css"
import { PaginationCustom } from "../pagination/paginationComponent";

const AllPlantUser = () => {
    const dispatch = useDispatch()
    const {plants} = useSelector(state => state.plant)
    const {totalPage, data} = plants
    useEffect(()=>{
        dispatch(plantsActions.getAll("1"))
        
    },[dispatch])
    return(
        <div>
            <PaginationCustom dispatch={{dispatch: ({ selected: selectedPage }) =>{
                    dispatch(plantsActions.getAll(selectedPage+1))
                }, totalPage: totalPage}}/>

            {
                data && <div className={css.AllPlants} >
                    {data.map(value=><PlantUser key={value._id} p={value}/>)}
                </div>

            }

            <PaginationCustom dispatch={{dispatch: ({ selected: selectedPage }) =>{
                    dispatch(plantsActions.getAll(selectedPage+1))
                }, totalPage: totalPage}}/>
        </div>
    )
}

export {AllPlantUser}