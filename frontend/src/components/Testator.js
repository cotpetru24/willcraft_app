// import React, { useState, useEffect } from "react";
// import "flag-icon-css/css/flag-icons.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import PersonForm from "./PersonForm";
// import { createPerson } from "../features/people/peopleSlice";






// const Testator = () => {


//     const [formData, setFormData] = useState({ title: '', fullLegalName: '', fullAddress: '', dob: '', email: '', tel: '' });
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const onSubmit = (e) => {
//         e.preventDefault()
//         dispatch(createPerson({ formData }))
//         setFormData('')
//         navigate('/creatingOrder')
//     }



//     return (
//         <>
//             <section>
//                 <div className="creatingOrder-section-heading-container">
//                     <h1>Your details</h1>
//                 </div>
//                 <form onSubmit={onSubmit}>
//                     <div className="creatingOrder-section-main-content-container">
//                         <PersonForm role='testator' />
//                     </div>
//                     <div className="creatingOrder-section-navigation-container">
//                         <button>Back</button>
//                         <button type="submit">Save and continue</button>
//                     </div>
//                 </form>
//             </section>
//         </>
//     )
// }

// export default Testator;




// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import PersonForm from "./PersonForm";
// import { createPerson } from "../features/people/peopleSlice";

// const Testator = () => {
//   const [formData, setFormData] = useState({ title: '', fullLegalName: '', fullAddress: '', dob: '', email: '', tel: '' });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createPerson(formData));  // Passing formData directly
//     setFormData({ title: '', fullLegalName: '', fullAddress: '', dob: '', email: '', tel: '' });  // Reset form data
//     navigate('/creatingOrder');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handlePlaceSelected = (place) => {
//     setFormData({
//       ...formData,
//       fullAddress: place.formatted_address
//     });
//   };

//   return (
//     <>
//       <section>
//         <div className="creatingOrder-section-heading-container">
//           <h1>Your details</h1>
//         </div>
//         <form onSubmit={onSubmit}>
//           <div className="creatingOrder-section-main-content-container">
//             <PersonForm
//               role='testator'
//               formData={formData}
//               handleInputChange={handleInputChange}
//               handlePlaceSelected={handlePlaceSelected}
//             />
//           </div>
//           <div className="creatingOrder-section-navigation-container">
//             <button>Back</button>
//             <button type="submit">Save and continue</button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }

// export default Testator;



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import { createPerson } from "../features/people/peopleSlice";

const Testator = () => {
  const [formData, setFormData] = useState({
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPerson(formData));  // Passing formData directly
    setFormData({
      title: '',
      fullLegalName: '',
      fullAddress: '',
      dob: '',
      email: '',
      tel: ''
    });  // Reset form data
    navigate('/creatingOrder');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePlaceSelected = (place) => {
    setFormData({
      ...formData,
      fullAddress: place.formatted_address
    });
  };

  return (
    <>
      <section>
        <div className="creatingOrder-section-heading-container">
          <h1>Your details</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="creatingOrder-section-main-content-container">
            <PersonForm
              role="testator"
              formData={formData}
              handleInputChange={handleInputChange}
              handlePlaceSelected={handlePlaceSelected}
            />
          </div>
          <div className="creatingOrder-section-navigation-container">
            <button>Back</button>
            <button type="submit">Save and continue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Testator;
