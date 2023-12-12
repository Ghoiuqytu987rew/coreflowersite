import {useDispatch, useSelector} from "react-redux";
import {plantsActions} from "../../redux/slices/allPlantsSlice"

const NewfiltrComponent = () => {
    const dispatch = useDispatch()
    const {serchName} = useSelector(state => state.plant)
    const Price = async (data) =>{
        const search = await {name: serchName.search, params: data} 
        await dispatch(plantsActions.searchWithFilter(JSON.stringify(search)))
    }
    return(
        <div>
            <form >
                <select onChange={(e)=> Price(e.target.value)} name="sort" placeholder="Сортувати спочатку">
                    <option value="new">Спочатку новинки</option>
                    <option value="old">Спочатку давньошні</option>
                    <option value="expensive">Від дорогих до дешевих</option>
                    <option value="cheep">Від дешевих до дорогих</option>
                </select>
            </form>
        </div>
    )
}

export {NewfiltrComponent}