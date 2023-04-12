import { Link } from "react-router-dom";

import { CurrentLine, Purple, Orange, Cyan, Red } from "../../helpers/colors";
import { ConfirmDelete } from "../../helpers/ConfirmDelete";

const Contact = ({contact, remove/*deleteContact*/})=> {
    
    
    return(
        <div className="col-md-6">
            <div className="card my-2" style={{background:CurrentLine}}>
                <div className="card-body">
                    <div className="row d-flex justify-content-around align-items-center">
                        <div className="col-sm-4 col-md-4">
                            <img src={contact.photo} 
                             alt={contact.fullname} style={{border:`1px solid ${Purple}`}}
                             className="img-fluid rounded" />
                        </div>
                        <div className="col-sm-7 col-md-7">
                            <ul className="list-group p-0">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوداگی : <span className="fw-bold">{contact.fullname}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                     شماره موبایل : <span className="fw-bold">{contact.mobile}</span>
                                 </li>
                                 <li className="list-group-item list-group-item-dark">
                                 آدرس ایمیل :{"  "}
                                     <span className="fw-bold">
                                         {contact.email}
                                     </span>
                                 </li>
                            </ul>
                        </div>
                        <div className="col-sm-1 col-md-1 d-flex flex-column align-items-center">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{ background: Orange }}>
                                <i className="fa fa-eye" />
                            </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1" style={{background:Cyan}}>
                                <i className="fa fa-pen" />
                            </Link>
                            <button onClick={()=> {
                                console.log('m');
                                ConfirmDelete(remove, contact.id, contact.fullname);
                                console.log('m2');
                            }} className="btn my-1" style={{background:Red}}>   
                                <i className="fa fa-trash" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


















// import { CurrentLine, Purple, Orange, Cyan, Red } from "../../helpers/colors";
// const Contact = ()=> {
//     return (
//         <div className="col-md-6">
//             <div style={{background:CurrentLine}} className="card my-2">
//                 <div className="card-body">
//                     <div className="row align-items-center d-flex justify-content-around">
//                         <div className="col-md-4 col-sm-4">
//                             <img src="https://via.placeholder.com/200" 
//                              alt="" style={{border:`1px solid ${Purple}`}}
//                                 className="img-fluid rounded" />
//                         </div>
//                         <div className="col-md-7 col-sm-7">
//                             <ul className="list-group p-0">
//                                 <li className="list-group-item list-group-item-dark">
//                                 نام و نام خانوداگی :{"  "}
//                                     <span className="fw-bold">
//                                         یونس قربانی         
//                                     </span>
//                                 </li>
//                                 <li className="list-group-item list-group-item-dark">
//                                     شماره موبایل : <span className="fw-bold">09016226745</span>
//                                 </li>
//                                 <li className="list-group-item list-group-item-dark">
//                                 آدرس ایمیل :{"  "}
//                                     <span className="fw-bold">
//                                         younes.gh@chmail.ir
//                                     </span>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
//                             <button className="btn my-1" style={{ background: Orange }}>
//                                 <i className="fa fa-eye" />
//                             </button>
//                             <button className="btn my-1" style={{background:Cyan}}>
//                                 <i className="fa fa-pen" />
//                             </button>
//                             <button className="btn my-1" style={{background:Red}}>
//                                 <i className="fa fa-trash" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>            
//         </div>
        
//     );
// }

export default Contact;