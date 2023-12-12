import {FooterComponent, Search} from "../components";
import { NewfiltrComponent } from "../components/filtr/newfiltrComponent";

const SearchPage = ()=>{
    return(
        <div>
            <NewfiltrComponent/>
            <Search/>
            <FooterComponent/>
        </div>
    )
}

export {SearchPage}