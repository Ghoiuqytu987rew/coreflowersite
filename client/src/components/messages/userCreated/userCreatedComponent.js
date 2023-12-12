import css from "./userCreatedComponent.module.css"

const UserCreated = ()=>{
    
    return(
        <div className={css.Main}>
            <div className={css.Main}>
                <h1 className={css.Title}>Дякую що доєднались до нас!!</h1>
                <h2>Будь-ласка підтвердіть свою електронну адресую.</h2>
            </div>
            

        </div>
    )
}

export {UserCreated}