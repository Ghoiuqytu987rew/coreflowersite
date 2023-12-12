import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

import css from "./Plants.module.css"

const PlantsCard = ()=>{
    const navigate = useNavigate()

    const {objectForCard} = useSelector(state => state.plant)

    const {_id, PlantName, about, price, fullImage} = objectForCard.p

    const Ordered = () =>{
        localStorage.setItem("order", JSON.stringify(objectForCard.p))
        navigate("/buyItemPage")
    }

    return(
        <div className={css.Card}>
            <div className={css.PlantName}> <h1>{PlantName}</h1></div>
            <div className={css.fullImage}><img className={css.Image} src={fullImage}/></div>
            <div className={css.aboutPrice}>
                <div className={css.about}><h3>{about}</h3></div>
                <div className={css.price}><h1>{price} грн</h1></div>
                <div className={css.divButton}><button className={css.button} onClick={()=> Ordered() }>Замовити</button></div>
            </div>

        </div>
    )
}

export {PlantsCard}