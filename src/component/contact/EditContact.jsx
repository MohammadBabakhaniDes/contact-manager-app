import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Comment, Orange, Purple } from "../../helpers/colors";
import { getAllGroups, getContact, updateContact } from "../../services/contactService";
import Spinner from "../Spinner";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ContactContext } from "../../context/contactContext";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

const EditContact = ()=> {
    const {contactId} = useParams();
    const navigate = useNavigate();
    const {loading, setLoading, groups, contacts, setContacts, setFilteredContacts} = useContext(ContactContext);

    const[contact, setContact] = useImmer({});

    useEffect(()=> {
        const fetchData = async()=> {
            try{
                setLoading(true);
                const { data : contactData } = await getContact(contactId);
                
                setLoading(false);
                setContact(contactData);
            } catch(err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const submitForm = async (values)=> { // mishe in tabe ra dakhel app.js gozasht va baraye edit va addContact estefade kard vali ma inja mikhaim edit hoshe khodesh ra dashte bashe.
        //event.preventDefault();
        try {
            setLoading(true);
            const { data, status } = await updateContact(values, contactId);

            if(status === 200) {   // dar surat movafaghiat status == 200
              setLoading(false);
              toast.info('مخاطب با موفقیت ویرایش شد ', {icon:"☑"})
              // const allContacts = [...contacts];
              // const contactIndex = allContacts.findIndex((c)=> c.id === parseInt(contactId));
              // console.log(allContacts[contactIndex]);
              // allContacts[contactIndex] = {...data}; 
              // console.log(allContacts[contactIndex]);
              // setContacts(allContacts);
              // setFilteredContacts(allContacts);
              setContacts(draft=> {
                const contactIndex = draft.findIndex((c)=> c.id === parseInt(contactId));
                draft[contactIndex]= {...data}
              });
              setFilteredContacts(draft=> {
                const contactIndex = draft.findIndex((c)=> c.id === parseInt(contactId));
                draft[contactIndex]= {...data}
              });
              navigate('/contacts');
            }
        } catch(err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    /* 
     * NOTE
     * 1- forceRender -> setForceRender(true)
     * 2- Send request server
     * 3- Update local state
     * 4- Update local state before sending request to server(
     *    1- copy state
     *    2- update state
     *    3- send request
     *    4- status == 200 => send request
     *    5- status == error => setState(copy state)
     * )
     */

    return (
        <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: Orange }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Orange }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                  initialValues={contact}
                  validationSchema= {contactSchema} // chon darim az yup estefade mikonim.
                  onSubmit={(values) => {  // zaman submit tamam valuehaye inputha ra be ma mide.
                    submitForm(values);
                  }}>

                  <Form>
                    <div className="mb-2">
                      <Field
                        name="fullname"
                        type="text"
                        // value={formik.values.fullname}
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                      <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="photo"
                        type="text"
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                      <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="mobile"
                        type="number"
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                      <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>} />                    
                    </div>
                    <div className="mb-2">
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                      />
                      <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="job"
                        type="text"
                        className="form-control"
                        placeholder="شغل"
                      />
                      <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>} />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="group"
                        as="select"
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {
                            groups.length > 0 && groups.map((group)=> (  
                                <option key={group.id} value={group.id}>  
                                    {group.name}
                                </option>
                            ))
                        }
                      </Field>
                      <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>} />
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: Purple }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: Comment }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
                  </Formik>
                  
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    alt=""
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${Purple}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                alt=""
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
    );
}

export default EditContact;