import React from "react";





const Prices = () => {
    return (<>
    <div className="pricing-component-container">
        <section className="price-container">
            <img src="./accept_terms.png"/>
            <h3 className="price-heading">
                Wills
            </h3>
            <h2 className="price-price">£20</h2>
            <h4 className="price-subheading">each</h4>


        </section>

        <section className="price-container">
            <img src="./printing_invoice.png"/>
            <h3 className="price-heading">
                Printing
            </h3>
            <h2 className="price-price">£5</h2>
            <h4 className="price-subheading">per will</h4>


        </section>

        <section className="price-container">
            <img src="./storage.png"/>
            <h3 className="price-heading">
                Storage
            </h3>
            <h2 className="price-price">£25</h2>
            <h4 className="price-subheading">per annum</h4>

        </section>


        </div>
    </>
    )

}

export default Prices;