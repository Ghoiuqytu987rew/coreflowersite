import {useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FooterComponent } from "../../components"
import { ContactComponentGuest } from "../../components/contact/contactComponentGuest"

import css from "./contactsPage.module.css"
import { useNavigate } from "react-router"


const ContactsPage = ()=>{
    const {userShow} = useSelector(state => state.user)
    const [show, setShow] = useState(0)
    const navigate = useNavigate()


    const onClick = (data) => {
        
        setShow(data.num)
        
    }

    useEffect(()=>{
        switch (show) {
            case 1:
                setShow(1)
                break;
            case 2:
                setShow(2)
                break;
            case 3:
                setShow(3)
                break;
            case 4:
                setShow(4)
                break;
        
            default:
                break;
        }
    },[show])



    return(
        <div>
            <div className={css.Questions}>
                <div className={css.QuestionsTitl}>
                    Популярні питання
                </div>
                <hr/>
                <div>
                    <div onClick={()=>onClick({num: 1})} className={css.QuestionsTitles}>
                        Як замовити товар?
                    </div>

                    {(show ===1) ? <div className={css.QuestionsAnswers}>
                        Для замовлення товару вам треба вибрати товар який вам до вподоби і клікнути по кнопці 
                        "Дізнатися більше" після переходу на сторінку товару ви можете клікнути по кнопці "придбати товар"
                        після цього відкриється форма в якій треба внести дані для доставки, 4 прості кроки і можете чекати на товар.
                    </div>: <div></div>}
                </div>
                <hr/>
                <div>
                    <div onClick={()=>onClick({num: 2})} className={css.QuestionsTitles}>
                        Оплата і доставка?
                    </div>
                    {(show ===2) ? <div className={css.QuestionsAnswers}>
                        Після того як ви оформили замовлення з вами звяжеться наш менеджер для узгодження даних і часу
                        відправки, доставку можна оплатити наложним платижем у відділенні нової пошти після того як ви переконаєтесь що 
                        ви отримали те що хотіли.
                        
                    </div>: <div></div>}
                </div>
                <hr/>
                <div>
                    <div onClick={()=>onClick({num: 3})} className={css.QuestionsTitles}>
                        Як ми здійснюємо доставку по місту Полтава?
                    </div>
                    {(show ===3) ?<div className={css.QuestionsAnswers}>
                        Також ми маємо можливість доставити вам товар в межах міста Полтава наш курєр доставить товар
                        в продовж 2 робочих днів. Ціна доставки по місту становить 30 грн. При замовленні більше ніж на
                        250 грн доставка безкоштовнаю
                    
                    </div>: <div></div>}
                </div>
                <hr/>
                <div>
                    <div onClick={()=>onClick({num: 4})} className={css.QuestionsTitles}>
                        Як ми пакуємо товари для доставки?
                    </div>
                    {(show ===4) ?<div className={css.QuestionsAnswers}>
                        Пакування товару не є однаковим для всих видів товарів. Але спільним є те що товар здебільшого пакується
                        в водонепронекний матеріал після цього загортається в світлонепронекний матеріал.
                    </div>: <div></div>}
                </div>
                <hr/>
                
            </div>

            <div> 
                <div className={css.QuestionsTitl} >Зворотній звязок</div>
                <div  className={css.ContactTxt} >Ви можете звязатись з нами заповнивши просту форму нижче:</div>
                {!userShow && <div className={css.ContactCompon}>
                    <ContactComponentGuest/>
                </div>}
                {userShow && <div className={css.ContactCompon}>
                    <button onClick={()=> navigate("/userPage/contact")} className={css.ButtonCont}>контакт</button>
                </div>}
            </div>
        
            <FooterComponent/>
        </div>
    )
}

export {ContactsPage}