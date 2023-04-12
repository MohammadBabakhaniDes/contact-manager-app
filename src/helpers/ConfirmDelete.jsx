
import { confirmAlert } from "react-confirm-alert";

import { CurrentLine, Foreground, Purple, Yellow } from "./colors";




export const ConfirmDelete = (remove, contactId, contactFullname) => {
    console.log('x');

    confirmAlert({
      customUI: ({ onClose })=> {
        return (
          <div dir='rtl' style={{
            backgroundColor: CurrentLine,
            border: `1px solid ${Purple}`,
            borderRadius: '1em'
          }} className="p-4">
            <h1 style={{color: Yellow}}>پاک کردن مخاطب</h1>
            <p style={{color: Foreground}}>مطمئنی که میخای مخاطب {contactFullname} رو پاک کنی ؟</p>
            <button onClick={()=> {
              remove(contactId);
              onClose(); // onclose ke custom ui khodesh dare.
            }} className="btn mx-2" style={{backgroundColor:{Purple}}}>مطمئن هستم</button>
            <button onClick={onClose} style={{backgroundColor: Comment}} className='btn'>  {/* onClose custom UI */}
              انصراف
            </button>
          </div>
        )
      }
    })
   }
