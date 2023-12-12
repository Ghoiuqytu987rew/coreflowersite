import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {plantsActions} from "../../redux";
import { PlantUser } from "../plant/PlantUser";

import css from "./forSellComponent.module.css"
import { PaginationCustom } from "../pagination/paginationComponent";

const ForSellComponent = () => {
    const dispatch = useDispatch()
    const {forSell} = useSelector(state => state.plant)
    const {totalPage, data} = forSell
    useEffect(()=>{
        dispatch(plantsActions.getForSell("1"))
    },[])
  return(
      <div>

        <PaginationCustom dispatch={{dispatch: ({ selected: selectedPage }) =>{
                    dispatch(plantsActions.getForSell(selectedPage+1))
                }, totalPage: totalPage}}/>

          {
              data && <div className={css.AllPlants}>
                  {data.map(value => <PlantUser key={value._id} p={value}/>)}
              </div>
          }
      </div>
  )
}

export {ForSellComponent}