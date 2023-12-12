import {useSelector} from "react-redux";
import css from "./orderComponent.module.css";

const OrderComponent = () => {
    // const {objectForCard} = useSelector(state => state.plant)

    const order = JSON.parse(localStorage.getItem("order"))
    

    const {PlantName, price, cropImage} = order

    return(
        <div>
           {order && <>
            <div className={css.fullImage}><img className={css.Image} src={cropImage}/></div>
            <div className={css.PlantName}>{PlantName}</div>
            </>}
        </div>
    )
}
export {OrderComponent}