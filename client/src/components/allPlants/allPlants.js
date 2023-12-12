import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {plantsActions} from "../../redux";
import {Plant} from "../plant/Plant";

import css from "./allPlantUser.module.css"

const AllPlants = () => {
    const dispatch = useDispatch()
    const {plants} = useSelector(state => state.plant)
    const {data} = plants
    useEffect(()=>{
        dispatch(plantsActions.getAll("1"))
    },[dispatch])
  return(
      <div>
          {
              data && <div className={css.AllPlants}>
                  {data.map(value => <Plant key={value._id} p={value}/>)}
              </div>

          }
      </div>
  )
}

export {AllPlants}