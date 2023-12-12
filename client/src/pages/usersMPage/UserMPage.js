import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import { useEffect, useState } from "react"

import { UsersMComponent } from "../../components"
import { FindUserComponent } from "../../components/admin/usersManeger/findUserComponent"
import { userActions } from "../../redux/slices/userSlice"
import { orderActions } from "../../redux"



const UsersMPage = ()=>{
    const {userById} = useSelector(state => state.user)
    const {userByIdShow} = useSelector(state => state.user)
    const {createdAt, email, name, _id} = userById
    const [state, setState] = useState(false)
    const {ordersById} = useSelector(state => state.order)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const showOrders = async (id) => {
        await setState(true)
        await navigate("/admin/users/userOrder")
        await dispatch(orderActions.getOrdersByUserId(id))
    }

    const onDelete = async (id) => {
        await navigate("/admin")
        await dispatch(userActions.deleteU(id))
    }

    const noActivate = async (id) => {
        const item = await {id: id}
        await dispatch(userActions.forceNoAct(item))
    }

    const activate = async (id) => {
        const item = await {id: id}
        await dispatch(userActions.forceAct(item))
    }
    useEffect(()=>{
        
    },[ordersById, state])
    return(
        <div>
            {userByIdShow&&<div>
                <div>імя: {name}</div>
            <div>id: {_id}</div>
            <div>email: {email}</div>
            <div>був створений: {createdAt}</div>
            <button onClick={()=> showOrders(_id)}>Показати замовлення</button>
            
            <button onClick={()=> onDelete(_id)}>Видалити</button>
            <button onClick={()=> noActivate(_id)}>Зробити не активним</button>
            <button onClick={()=> activate(_id)}>Зробити активним</button>
            {state&& <Outlet/>}

            <hr/>
                </div>}
            <FindUserComponent/>
            <UsersMComponent/>
        </div>
    )
}

export {UsersMPage}