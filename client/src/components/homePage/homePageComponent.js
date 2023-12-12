import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {plantsActions} from "../../redux";
import { PlantUser } from "../plant/PlantUser";

import css from "./homePageComponent.module.css"

const HomePageComponent = () => {
    const dispatch = useDispatch()
    const {homeI} = useSelector(state => state.plant)

    useEffect(()=>{
        const search = {name: "тороянда", params: "home"} 
        dispatch(plantsActions.home(search))
    },[])
  return(
      <div>
          {
              homeI && <div className={css.AllPlants}>
                  {homeI.map(value => <PlantUser key={value._id} p={value}/>)}
              </div>
          }
      </div>
  )
}

export {HomePageComponent}