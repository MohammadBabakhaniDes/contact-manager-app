import * as Yup from 'yup'; // or import {string, number, .....} as Yup from 'yup';
export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزامی میباشد"),  
    photo: Yup.string().url("آدرس معتبر نیست").required("تصویر مخاطب الزامی میباشد"),
    mobile: Yup.number().required("شماره موبایل الزامی میباشد"),
    email: Yup.string().email("ادرس ایمیل معتبر نیست").required('آدرس ایمیل الزامی میباشد'),
    job: Yup.string().nullable(),  // mitane khali bashe.
    group: Yup.string().required('انتخاب گروه الزامی میباشد')
}); 
// name va option haye contactha bayad yeki bashad.
// Yup promise based ast pas bayad dakhel tabe async trif beshe.
// Yup faghat in nist age mikhay etebarsanjihaye behtari dashte bashi mostanadat ra bekhan.