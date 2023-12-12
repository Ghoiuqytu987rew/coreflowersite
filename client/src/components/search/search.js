import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {PlantUser} from "../plant/PlantUser";

import css from "./search.module.css"

const Search = () => {
    const {searchWithFilter} = useSelector(state => state.plant)
    const [state, setState] = useState(false)
    useEffect(()=>{
        if(searchWithFilter.length === 0){
            setState(true)
        }
        if(searchWithFilter.length > 0){
            setState(false)
        }
    },[searchWithFilter, state, searchWithFilter.length])
    return(
        <div>
            {state && <div className={css.NoFound}>
                    Нажаль за вашим запитом нічого не знайдено :( Спробуйте іншу назву товару.
                    </div>}
            <div className={css.AllPlants} >
                    {searchWithFilter.map(value => <PlantUser key={value._id} p={value}/>)}
                </div>
                
        </div>
    )
}

export {Search}