import css from "./submitOrder.module.css"
import {useDispatch, useSelector} from "react-redux";
import {orderActions} from "../../../redux";
import jwtDecode from "jwt-decode";
import { userActions } from "../../../redux/slices/userSlice";

const SubmitOrder= ()=>{
    const dispatch = useDispatch()
    const {adresNoNP} = useSelector(state => state.order)
    const {numberOfBuyMenu} = useSelector(state => state.order)
    const {userById} = useSelector(state => state.user)
    // const {objectForCard} = useSelector(state => state.plant)
    const {cityString} = useSelector(state => state.novaPoshta)
    const {deliveryMethod} = useSelector(state => state.order)
    const {personWhoWillTAke} = useSelector(state => state.order)
    const {personWhoOrder} = useSelector(state => state.order)
    const {payMethod} = useSelector(state => state.order)
    const {departmentOfCity} = useSelector(state => state.order)
    const order = JSON.parse(localStorage.getItem("order"))
    const { price} = order
    const onSubmit = async () => {
        try{

            if(localStorage.getItem("accessToken") !== "0"){
                const user = await jwtDecode(localStorage.getItem("accessToken"))
                await dispatch(userActions.getUserById(user._id))
                
                const whoOrder = await {lastName: personWhoWillTAke.lastName, FirstName: userById.name, PhoneNumber: personWhoWillTAke.PhoneNumber, email: userById.email}
                const whoWillTake = await {lastName: personWhoWillTAke.lastName, FirstName: personWhoWillTAke.name || userById.name, PhoneNumber: personWhoWillTAke.PhoneNumber, email: personWhoWillTAke.email || userById.email}
                
                if( deliveryMethod && payMethod && whoOrder && whoWillTake && order && user){
                    const OrderS = {cityString: cityString || adresNoNP.city, departmentOfCity: departmentOfCity.department || adresNoNP.department, 
                        deliveryMethod, payMethod, personWhoOrder: whoOrder, 
                        personWhoWillTAke: whoWillTake, objectForCard: order, userId: user._id}
                    await dispatch(orderActions.sendOrderToEmail(OrderS))
                    await dispatch(orderActions.orderDone(true))
                }
            }
            if(localStorage.getItem("accessToken") === "0"){

                const whoWillTake = await {lastName: personWhoWillTAke.lastName, FirstName: personWhoWillTAke.FirstName || personWhoOrder.FirstName, PhoneNumber: personWhoWillTAke.PhoneNumber, email: personWhoWillTAke.email || personWhoOrder.email}
                
                if(deliveryMethod && payMethod && personWhoOrder && personWhoWillTAke && order){
                    const OrderS = {cityString: cityString || adresNoNP.city, departmentOfCity: departmentOfCity.department || adresNoNP.department,
                        deliveryMethod, payMethod, personWhoOrder, 
                        personWhoWillTAke: whoWillTake, objectForCard: order, userId: "Замовлення від Гостя"}
                    await dispatch(orderActions.sendOrderToEmail(OrderS))
                    await dispatch(orderActions.orderDone(true))
                }
                
            }

        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <div className={css.mainDiv}>
            <div className={css.rightPart}>
                {/* <h2>{PlantName}</h2> */}
                <h1>Сума {price} грн </h1>
                <div className={css.ButonDiv}>
                    
                    <button className={css.ButonBack} onClick={()=>{dispatch(orderActions.chengeNumberOfBuyMenu(numberOfBuyMenu - 1))}} >Назад</button>
                            
                    <button className={css.Buton} onClick={()=> onSubmit()}>Замовити</button> 
                </div>
                
            </div>
        </div>
    )
}

export {SubmitOrder}











