import {AllPlantUser} from "../components";
import {Outlet} from "react-router";

import { FooterComponent } from "../components/footer/footerComponent";

const AllPlansUserPage = ()=>{
    const Style = {
        "display": "flex",
        "flex-wrap": "wrap",
    "justify-content": "center",
    }
    return(
        <div>
            <AllPlantUser style={Style}/>
            <Outlet/>
            <FooterComponent/>
        </div>
    )
}

export {AllPlansUserPage}