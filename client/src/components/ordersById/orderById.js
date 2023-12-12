import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

import {plantsActions} from "../../redux";

import css from "../plant/plantUser.module.css"


const OrderById = ({order}) => {

    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const {PlantName, price, cropImage} = order.order

    const onClick = async (object) =>{
        navigate("/plantsCardPage")
        dispatch(plantsActions.objectCard(object))
    }
  return(
      <div>
         <div className={css.plantUser}>
                <div className={css.ImageDiv} >
                    <img alt="img" className={css.Image}src={cropImage}/>
                </div>
                    <div className={css.divph1}><h3 className={css.ph1}>{PlantName}</h3></div>
                    <div className={css.priceDiv}><h2>{price} грн</h2> </div>
            </div>
      </div>
  )
}

export {OrderById}