import React from "react";



const Beneficiaries = () => {
    return (

        <>
            <section className="heading">
                <h1>Beneficiaries Details</h1>

                <form action="/submit" method="post">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required /><br />

                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required /><br />

                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" required /><br />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required /><br />

                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required /><br />

                    <label htmlFor="country">Country:</label>
                    <select id="country" name="country" required>
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                    </select><br />

                    <label>Gender:</label>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" value="female" />
                    <label htmlFor="female">Female</label><br /><br />


                    <button>Save and add another beneficiary</button>
                </form>

            </section>
        </>

    )
}

export default Beneficiaries