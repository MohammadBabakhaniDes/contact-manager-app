import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import { CurrentLine , Orange } from "../../helpers/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Contacts = ({remove})=> {
    console.log('contacts');

    const {filteredContacts, loading, /*deleteContact*/} = useContext(ContactContext);

    return(
        <>
        
            <section className="container"> 
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link to="/contacts/add" style={{background:'pink'}} className="btn m-2">ساخت مخاطب جدید 
                                <i className="fa fa-plus-circle"></i></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> :
                <section className="container">
                    <div className="row">
                            {
                                
                                filteredContacts.length > 0 ?
                                    filteredContacts.map(c=> (
                                        <Contact remove={()=> {remove(c.id)}} key={c.id} contact={c}// deleteContact={()=> {
                                            //deleteContact(c.id, c.fullname); 
                                    //}}
                                        />
                                    )):
                                <div className="text-center my-5" style={{background:CurrentLine}}>
                                    <p style={{color:Orange}} className="h3">
                                        مخاطب یافت نشد
                                    </p>
                                    <img src={require('../../assets/no-found.gif')} alt="" className="w-25" />
                                </div>
                            }
                        </div>
                </section>                
            }
        </>
    )
}
















// import { Fragment } from "react";
// import { Pink, CurrentLine, Orange } from "../../helpers/colors";
// import Contact from "./Contact";
// import Spinner from "../Spinner";

// const Contacts = ({contacts, loading})=> {
//     return (
//         <>
//             <section className="container">
//                 <div className="grid">
//                     <div className="row">
//                         <div className="col">
//                             <p className="h3">
//                                 <button className="btn mx-2" style={{background: Pink}}>
//                                     ساخت مخاطب جدید <i className="fa fa-plus-circle"></i>
//                                 </button>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {
//                 loading ? <Spinner /> : 
//                 <section className="container">
//                 <div className="row">
//                     {   contacts.length>0 ? contacts.map(c=> (
//                             <Contact key={c.id} contact={c} />  
//                         )):
//                         <div className="text-center my-5" style={{backgroundColor:CurrentLine}}>
//                             <p className="h3" style={{color:Orange}}>
//                                 مخاطب یافت نشد ...
//                             </p>
//                             <img src={require("../../assets/no-found.gif")} alt="" className="w-25" />
//                         </div>
//                     }
//                 </div>
//             </section>
//             }
//         </>
//     );
// }

export default Contacts;