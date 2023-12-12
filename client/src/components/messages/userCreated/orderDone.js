import {useNavigate} from "react-router";

import css from "./userCreatedComponent.module.css"

const OrderDone = ()=>{
    const navigate = useNavigate()
    
    return(
        <div className={css.Main}>
            <div className={css.Main}>
                <h1 className={css.Title}>Замовлення в обробці!</h1>
                <h2>наший адміністратор звяжиться з вами за наданими вами контактами дякуємо за те що замовляєте у нас</h2>
                <button onClick={()=>{navigate("/allPlants");  window.location.reload(false)}}>перейти до товарів</button>
            </div>
            

        </div>
    )
}

export {OrderDone}