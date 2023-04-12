import { createContext } from "react";

export const ContactContext = createContext({
    loading: false, //be jaye inke dar har component yek state loading dashte bashim dar kole app az yek loading estefade mikonim.
    setLoading: ()=> {},
   // contact: {},
    setContacts: ()=> {},
    contacts: [],
    filteredContacts: [],
    setFilteredContacts: ()=> {},
    groups: [],
   // errors: [],
   // onContactChange: ()=> {},
   // deleteContact: ()=> {},
    updateContact: ()=> {},
    createContact: ()=> {},
    contactSearch: ()=> {}
});
