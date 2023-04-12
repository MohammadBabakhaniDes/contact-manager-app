import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './component';
import { useEffect } from 'react';
import { createContact, deleteContact, getAllContacts, getAllGroups } from './services/contactService';
import _, { debounce } from 'lodash'; // lodash bargerefte shode az ketabkhane _ ast.

import { ContactContext } from './context/contactContext';
import { useImmer } from 'use-immer';
import { toast, ToastContainer } from 'react-toastify';


const App = ()=> {  
  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [groups, setGroups] = useImmer([]);
  //const [contact, setContact] = useImmer({});
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const navigate = useNavigate();
  //const [errors, setErrors] = useState([]);

  useEffect(()=> {
    console.log('contact manager App');

    const fetchData = async() => {
      try {
        setLoading(true);
        // inja montazer javab vay nemise bad setLoading, mire useEffect update ejra mikone
        const { data : contactsData } = await getAllContacts();  // gereftane data az javab axios va tabdil name an be contactsData
        const { data : groupsData } = await getAllGroups();
        // inja be ezaye har set yek bar render nemisha har se set ra mibinad bad yek bar render mikonad
        setContacts(contactsData); // inja az immer estefade nemikonim faghat zamani az immer estefade mikonim ke mikhaim ye taghiri dar state ijad konim va bezarim sare jash.
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      }catch(err) {
        console.log(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []); 
   //1. zamani load mishi ke component sakhta besha 
   //2. nemitanim tabee asli ra acync tarif konim vali mishe be sourat tabee dakhel tabee asli an ra besazim va seda bezanim

/*  useEffect(()=> { // baraye avalin bar hengame sakht ejra mishavad.
    const fetchData = async() => {
      try {
        setLoading(true);

        const response = await axios.get("http://localhost:9000/contacts");
        console.log(response);

        const { data : contactsData } = await getAllContacts();  // gereftane data az javab axios va tabdil name an be contactsData
        
        setContacts(contactsData);
        setFilteredContacts(contactsData);

        setLoading(false);
      }catch(err) {
        console.log(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [forceRender]);   */

   const createContactForm = async (values)=> {  
    //event.preventDefault();
    try {
      setLoading(draft=> !draft);  // ==setLoading(!loading)

    //  await contactSchema.validate(contact, {abortEarly: false}); // hame errorha ra bede na faghat yeki.
      //agar khata dashte bashe catch ra ejra mikone.

      const {status, data} = await createContact(values);

      /*
       * Note
       * 1- Rerender -> forceRender, setForceRender  (useEffect Update)
       * 2- setContacts(data)  (sari tar anjam misha)
       */

      if(status === 201) {   // post agar movafaghiat amiz basha status barabar mishe ba 201
        toast.success('مخاطب با موفقیت اضافه شد ', {icon:'🚀'});
        // const allContacts = [...contacts, data];
        // setContacts(allContacts);
        // setFilteredContacts(allContacts);
        setContacts(draft=> {draft.push(data)}); // chon meghdari return nemikonim va modify mikonim an ra dakhele {} mizarim.
        setFilteredContacts(draft=> {draft.push(data)});

        //setContact({});
        //setErrors([]);
        setLoading((prevLoading)=> !prevLoading);
     // setForceRender(true);
        navigate('/contacts');
      }
      }catch(err) {
        console.log(err.message);
        //setErrors(err.inner);
        setLoading((prevLoading)=> !prevLoading);
    }
  }

  //  const onContactChange = (event)=> {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  //  };

  const removeContact = async(contactId)=> {
    /*
      * NOTE
      * 1- forceRender -> setForceRender
      * 2- Server Request
      * 3- Delete local state
      * 4- Delete State Before Server Request
    */

    const contactsBackup = [...contacts];
    try { 
      // const updatedContact = contacts.filter(c => c.id !== contactId);  // az state contacts mostaghim estefade kardim chon filter taghiri dar araye ijad nemikone.
      // setContacts(updatedContact);
      // setFilteredContacts(updatedContact);
      setContacts((draft)=> draft.filter(c=> c.id !== contactId));
      setFilteredContacts((draft)=> draft.filter(c=> c.id !== contactId));

      const {status} = await deleteContact(contactId); 
      toast.error('مخاطب با موفقیت حذف شد ', {icon:"👺"}); // .success doroste vali baraye rangesh .error dadim

      if(status !== 200) {
        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);
      }
    } catch(err) { 
      console.log(err.message);
      setContacts(contactsBackup); // age server khamosh bashe darkhasti nemitana befresta ke status dashte basha => catch ejra mishe.
      setFilteredContacts(contactsBackup);
    }
   }
  


//  let filterTimeout;
  const contactSearch = _.debounce((query)=> {
//    clearTimeout(filterTimeout);

    if(!query) return setFilteredContacts([...contacts]);

    console.log(query);
//    filterTimeout = setTimeout(()=> {
      setFilteredContacts(draft=> draft.filter(c=> c.fullname.toLowerCase().includes(query.toLowerCase())));
//    }, 1000);
  }, 1000);
  
  return(
  <ContactContext.Provider value={{
    loading,  // loading == loading: loading
    setLoading,
    //contact,
    filteredContacts,
    setFilteredContacts,
    setContacts,
    contacts,
    groups, 
    //errors,
    //onContactChange,
   // deleteContact: removeContact,
    createContact: createContactForm,
    contactSearch,
  }}>

  <div className='App'>
    <ToastContainer rtl={true} position={'top-right'} theme={'colored'} />
    <Navbar />
    <Routes>
      <Route path='/' element={<Navigate to={'/contacts'} />} />
      <Route path='/contacts' element={<Contacts remove={removeContact} />} />
      <Route path='/contacts/add' element={<AddContact />} />
      <Route path='/contacts/:contactId' element={<ViewContact />} />
      <Route path='/contacts/edit/:contactId' element={<EditContact />} />
    </Routes>
  </div>
  
  </ContactContext.Provider>
  );
}

















// import './App.css';
// import { Navbar, Contacts, AddContact, EditContact, ViewContact } from './component';
// import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

// const App = ()=> {
//   const [getContacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="App">
//       <Navbar />
//       {/*  <Contacts contacts={getContacts} loading={loading} /> */ }
//       <Routes>
//         <Route path='/' element={<Navigate to={'/contacts'} />} />
//         <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading}/>} />
//         <Route path='/contacts/add' element={<AddContact />} />
//         <Route path='/contacts/:contactId' element={<ViewContact />} />
//         <Route path='/contacts/edit/:contactId' element={<EditContact />} />
//       </Routes>
//     </div>
    
//   );
// }

export default App;
