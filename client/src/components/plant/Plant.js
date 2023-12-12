import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import {plantsActions} from "../../redux";

import css from "./plantUser.module.css"
import {EditPlant} from "../admin/adminForms/editPlant";

const Plant = (p) => {
    const {editInfoForm} = useSelector(state => state.plant)
    const [forSell, setForSell] = useState(true)
    const [noForSell, setNoforSell] = useState(true)
    const [ haveChoice, setHaveChoice] = useState(false)
    const [ newPrice, setNewPrice] = useState(false)
    const [ sellChoice, setSellChoice] = useState(false)
    const [ sell, setSell] = useState()
    const [ have, setHave] = useState()
    const [ showAdminForm, setShowAdminForm] = useState(false)
    const {register, handleSubmit} = useForm()
    const {_id, PlantName, PlantSub, about, price, fullImage, cropImage} = p.p
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickShow = () =>{
      setShowAdminForm(true)
   }

    const delClick = async () =>{
        await setShowAdminForm(false)
       await navigate("/messageDel")
        const deleteObj = await JSON.stringify({_id, fullImage, cropImage})
       await dispatch(plantsActions.deleteOne(deleteObj))
       window.location.reload(false)

    }
    const changePriceClick =() =>{
        setNewPrice(true)
     }

     const setNewPriceClick = async (newPrice) =>{
        const data = await {newPrice: newPrice.newPrice, id: _id}
        await dispatch(plantsActions.changePrice(data))
        setNewPrice(false)
     }

     const sellButton = async (newPrice) =>{
        setSellChoice(true)
     }

      const Have = () =>{
      setHaveChoice(true)
   }

   const onChangeSell = (data) => {

    if (data.noForSell){
    setForSell(false)
    setSell(0)
  }
   else if(data.forSell){
    setNoforSell(false)
    setSell(1)
  }
    else if(!data.noForSell&&!data.forSelly){
    setNoforSell(true)
    setForSell(true)
  }
}

const onChangeHave = (data) => {
  if (data.noForSell){
  setForSell(false)
  setHave(1)

}
 else if(data.forSell){
  setNoforSell(false)
  setHave(0)
}
  else if(!data.noForSell&&!data.forSelly){
  setNoforSell(true)
  setForSell(true)
}
}
     
    const saveItemStatusSell = async () =>{
      setSellChoice(false)
      const data = await {id: _id, sell: sell }
      await dispatch(plantsActions.sellStatus(data))
    }

    const saveItemStatusHave = async () =>{
      setHaveChoice(false)
      const data = await {id: _id, have: have }
      await dispatch(plantsActions.have(data))
    }
   const editButton = () =>{
        dispatch(plantsActions.buttonFormChange(true))
   }
    
  return(
      <div className={css.plantAdmin}>
        
         <div className={css.plantUser}>
                <div className={css.ImageDiv} >
                    <img prop="img" alt="img" className={css.Image }src={cropImage}/>
                </div>
                    <div className={css.divph1}><h3 className={css.ph1}>{PlantName} {PlantSub}</h3></div>
                    <div className={css.priceDiv}><h2>{price} грн</h2> </div>

                <div className={css.buttonDiv}>
                    <button className={css.button} onClick={()=> onClickShow() }>Дізнатися більше</button>
                </div>

            </div>
          {showAdminForm&& <div className={css.info}>
          <div><h1>{PlantName}</h1></div>
          <div><h2>{about}</h2></div>
          <div>{price} грн</div>
          <button onClick={()=> delClick() }>видалити</button>
          <button onClick={()=> changePriceClick() }>змінити ціну</button>
          <button onClick={()=> Have() }>наявність</button>
          <button onClick={()=> sellButton() }>розпродаж статус</button>
              <button onClick={()=> editButton() }>редагувати</button>

          {newPrice && <>
            <form onSubmit={handleSubmit(setNewPriceClick)}> 
                <h3><input type="text" {...register("newPrice")} placeholder="нова ціна" /></h3>     
                  <button type="submit"> зберегти </button>
                </form></>}
                


            {sellChoice&&<>
              <form onInput={handleSubmit(onChangeSell)}>
                {forSell&&
                        <h3><input type="checkbox" {...register("forSell")} /> розпродаж</h3>}
                {noForSell&&
                        <h3><input type="checkbox" {...register("noForSell")} />не розпродаж </h3>}
                <button onClick={()=>saveItemStatusSell()}>зберегти</button>

            </form></>}

            {haveChoice&&<>
              <form onInput={handleSubmit(onChangeHave)}>
                {forSell&&
                        <h3><input type="checkbox" {...register("forSell")} /> є в наявності</h3>}
                {noForSell&&
                        <h3><input type="checkbox" {...register("noForSell")} />немає в наявності </h3>}
                <button onClick={()=>saveItemStatusHave()}>зберегти</button>

            </form></>}

              {editInfoForm&&<EditPlant id={_id}/>}

            </div>
          }
      </div>
  )
}

export {Plant}