import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {plantsActions} from "../../redux";
import { PlantUser } from "../plant/PlantUser";

import css from "./newItemComponent.module.css"
import ReactPaginate from "react-paginate";
import { PaginationCustom } from "../pagination/paginationComponent";

const NewItemComponent = () => {
    const dispatch = useDispatch()
    const {newItem} = useSelector(state => state.plant)
    const {totalPage, data} = newItem
    useEffect(()=>{
        dispatch(plantsActions.getNewItem("1"))
    },[dispatch])
  return(
      <div>

            <PaginationCustom dispatch={{dispatch: ({ selected: selectedPage }) =>{
                    dispatch(plantsActions.getNewItem(selectedPage+1))
                }, totalPage: totalPage}}/>
        
          {
              data && <div className={css.AllPlants}>
                  {data.map(value => <PlantUser key={value._id} p={value}/>)}
              </div>
          }
      </div>
  )
}

export {NewItemComponent}