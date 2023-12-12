
import css from "./contactComponent.module.css"

const MesegeChatComponent = ({chat})=>{
    const {createdAt, email, isUser, messageA,
        messageU, red, updatedAt, _id,} = chat
    
 return(
     <div className={css.Chat}>
        
       <i className={css.ChatIR}>ви:</i> 
        <div className={css.ChatRight}><b className={css.bRight}>{messageU}</b></div>
        
        {(red === 1)&&<div>
            <i className={css.ChatIL}>адмін:</i> 
            <div className={css.ChatLeft}><b className={css.bLeft}>{messageA}</b></div></div>
        }
     </div>
 )
}

export {MesegeChatComponent}