import { useLocation } from "react-router-dom";
import { Background, Purple } from "../helpers/colors";
import SearchContact from "./contact/SearchContact";


const Navbar = ()=> {

    const location = useLocation();

    return(      
    <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{background:Background}}>
        <div className="container">
            <div className="row w-100">
                <div className="col">
                    <div className="navbar-brand">
                        <i style={{color:Purple}} className="fas fa-id-badge"></i> {' '}
                        وب اپلیکیشن مدیریت <span style={{color:Purple}}>مخاطبین</span>
                    </div>
                </div>

                {
                    location.pathname === '/contacts' ? (
                        <div className="col">
                            <SearchContact />
                        </div>
                    ) : (null)
                }
            </div>
        </div>
    </nav>
    );
}
















// import { Background, Purple } from "../helpers/colors";
// import SearchContact from "./contact/SearchContact";

// const Navbar = ()=> {
//     return(
//         <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" 
//          style={{background: Background}}>
//             <div className="container">
//                 <div className="row w-100">
//                     <div className="col">
//                         <div className="navbar-brand">
//                             <i className="fas fa-id-badge" style={{color:Purple}}></i>
//                             {' '}وب اپلیکیشن مدیریت  <span style={{color:Purple}}>مخاطبین</span>
//                         </div>
//                     </div>
//                     <div className="col">
//                         <SearchContact />
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }

export default Navbar; 