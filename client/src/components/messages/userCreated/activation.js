import {useNavigate} from "react-router";

import css from "./userCreatedComponent.module.css"

const Activation = ()=>{
    const navigate = useNavigate()
    
    return(
        <div className={css.Main}>
            <div className={css.Main}>
                <h1 className={css.Title}>Ваша електронна адреса була підтверджена</h1>
                <h2>Бажаємо вам знайти в нас все що вам сподобається.</h2>
                <button onClick={()=>navigate("/new")}>перейти на сайт</button>
            </div>
        </div>
    )
}

export {Activation}