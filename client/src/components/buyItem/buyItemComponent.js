import { useDispatch, useSelector } from "react-redux";

import {GetCityComponent} from "./getCityComponent/GetCityComponent";
import {GetDepartmentComponent} from "./getDepartmentComponent/GetDepartmentComponent";
import {UserInfoComponent} from "./userInfoComponent/userInfoComponent";
import {OrderComponent} from "./orderComponent/orderComponent";
import {PersonWhoReciveComponent} from "./personWhoReciveComponent/personWhoReciveComponent";
import {KindOfPay} from "./kindOfPay/KindOfPay";
import {KindOfDelivery} from "./kindOfdelivery/kindOfDelivery";
import {SubmitOrder} from "./submitOrde/submitOrder";

import css from "./buyItemComponent.module.css"
import { useEffect, useState } from "react";
import { orderActions } from "../../redux";
import { GetCityForDeliveryNoNP } from "./getCityForDelivery/getCityForDeliveryNoNP";
import { OrderDone } from "../messages/userCreated/orderDone";

const BuyItemComponent= ()=>{
    const dispatch = useDispatch()
    const {newPostShow} = useSelector(state => state.order)
    const {orderIsDone} = useSelector(state => state.order)
    const {numberOfBuyMenu} = useSelector(state => state.order)
    const {error} = useSelector(state => state.order)
    const [infoUser, setInfoUser] = useState(false)
    const [personRecive, setPersonRecive] = useState(false)
    const [city, setCity] = useState(false)
    const [kindOfPay, setKindOfPay] = useState(false)
    const [np, setNp] = useState(false)
    const [deliv, setDeliv] = useState(false)
    const [e, setE] = useState(false)
    useEffect(()=>{
        switch (numberOfBuyMenu) {
            case 1:
                setInfoUser(true)
                setPersonRecive(false)
                setCity(false)
                setKindOfPay(false)
                break;
            case 2:
                setPersonRecive(true)
                setInfoUser(false)
                setCity(false)
                setKindOfPay(false)
                break;
            case 3:
                setPersonRecive(false)
                setInfoUser(false)
                setCity(true)
                setKindOfPay(false)
                break;
            case 4:
                setPersonRecive(false)
                setInfoUser(false)
                setCity(false)
                setKindOfPay(true)
                break;
        
            default:
                break;
        }
        switch (newPostShow) {
            case 1:
                setNp(true)
                break;
            case 0:    
                setNp(false)
                setDeliv(false)
                break;
            case 2:
                setDeliv(true)
                break;
        
            default:
                break;
        }
        if (error.message !== "") { 
            setE(true)
        }
        if (error.message === "") { 
            setE(false)
        }

    },[numberOfBuyMenu, newPostShow, orderIsDone, error.message ])

    return(
        <div className={css.mainDivBuiItem}>
            <div className={css.Title}><h1>Оформлення замовлення</h1></div>
        
            {!orderIsDone && <><div className={css.formaOrder}>
                <div className={css.ShowSteps}>
                <div className={infoUser?css.Active : css.NoActive}></div>
                <div className={personRecive?css.Active : css.NoActive}></div>
                <div className={city?css.Active : css.NoActive}></div>
                <div className={kindOfPay?css.Active : css.NoActive}></div>
                </div>
                <div className={css.ShowSteps}>
                    <h3 className={css.Title}> {numberOfBuyMenu}-й крок з 4-х</h3>
                </div>
    
                {infoUser && <UserInfoComponent/>}
                {personRecive &&<PersonWhoReciveComponent/>}
                {city &&<><KindOfDelivery/>
                    {np && <div className={css.Form1}>
                        <GetCityComponent/>
                        <GetDepartmentComponent/>
                    </div>}
                    {deliv && <div>
                            {/* <GetCityComponent/> */}
                            <GetCityForDeliveryNoNP/>
                    </div>}
                </>} 
                {kindOfPay && <div className={css.divPay}>
                    <div className={css.divPayUp}>
                        <KindOfPay/>
                        <OrderComponent/>
                    </div>
                    
                    <SubmitOrder/>
                </div>}

            </div>
            {e && <div className={css.Error}>{error.message}</div>}
            </>}
            {orderIsDone&& <OrderDone/>}
        </div>
    )
}

export {BuyItemComponent}











