import {useNavigate} from "react-router";

import css from "./userCreatedComponent.module.css"

const MessageDel = ()=>{
    const navigate = useNavigate()
    
    return(
        <div className={css.Main}>
            <div className={css.Main}>
                <h1 className={css.Title}>Товар було успішно видалено</h1>
                <button onClick={()=>navigate("/admin/allPlants")}>перейти до товарів</button>
            </div>
            

        </div>
    )
}

export {MessageDel}