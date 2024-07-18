import React from "react";





const Pricing = () => {
    return (<>
    <div className="pricing-component-container">
        <section className="price-container">
            <img src="./accept_terms.png"/>
            <h4>
                Wills
            </h4>
            <p>£20</p>
            <p>each</p>


        </section>

        <section className="price-container">
            <img src="./printing_invoice.png"/>
            <h4>
                Printing
            </h4>
            <p>£5</p>
            <p>per will</p>


        </section>

        <section className="price-container">
            <img src="./storage.png"/>
            <h4>
                Storage
            </h4>
            <p>£25</p>
            <p>per annum</p>

        </section>


        </div>
    </>
    )

}

export default Pricing;