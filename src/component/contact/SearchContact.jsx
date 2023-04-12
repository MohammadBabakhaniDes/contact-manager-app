import { Purple } from "../../helpers/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const SearchContact = ()=> {
    const { contactSearch } = useContext(ContactContext);

    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" 
             id="basic-addon1" style={{ background: Purple }}>
                <i className="fas fa-search"></i>
            </span>
            <input dir="rtl" type="text"
                className='form-control'
                onChange={(event)=> {contactSearch(event.target.value)}}
                placeholder="جست و جوی مخاطب"
                aria-label="Search"           
                aria-describedby="basic-addon1" />
        </div>
    );
}

export default SearchContact;