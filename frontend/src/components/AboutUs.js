import React from "react";




const AboutUs = () => {
    return (
        <section className="about-us-container">
            <h1>About Willcraft</h1>
            <p>
                Welcome to Willcraft, a user-friendly web application designed to help you create wills efficiently and securely. This project represents the culmination of our hard work and dedication as part of the final project for our Computing BSc course.
                We are proud to present a tool that simplifies the complex process of will writing, ensuring that your wishes are documented clearly and legally.
            </p>
            <h2>What is Willcraft?</h2>
            <p>
                Willcraft is a comprehensive application that guides users through the process of creating a legally binding will. Our aim is to make the
                creation of wills accessible to everyone, regardless of their legal knowledge. With Willcraft, you can:
            </p>
            <ul>
                <li>
                    <p>
                        Create a personalized will by answering simple questions about your assets and beneficiaries.
                    </p>
                </li>
                <li>
                    <p>
                        Save and edit your will as needed.
                    </p>
                </li>
                <li>
                    <p>
                        Print or download your completed will in a professional format ready for signing and witnessing.
                    </p>
                </li>
            </ul>
            <h2>How Does It Work?</h2>
            <p>
                Willcraft is built using the MERN stack, leveraging the power of
                MongoDB, Express.js, React.js, and Node.js to deliver a seamless user experience. Here’s how it works:
            </p>
            <ol>
                <li>
                    <p>
                        <span>User Registration and Login:</span>Start by creating an account to securely manage your will
                    </p>
                </li>
                <li>
                    <p>
                        <span>Step-by-Step Guidance:</span>Answer a series of straightforward questions about your
                        assets, beneficiaries, and specific wishes. Our intuitive interface makes it easy to enter the necessary information.
                    </p>
                </li>
                <li>
                    <p>
                        <span>Real-Time Editing:</span>As you enter your details, you can see a real-time preview of your will. Make adjustments as needed until you are
                        satisfied with the document.
                    </p>
                </li>
                <li>
                    <p>
                        <span>Document Generation:</span>Once complete, Willcraft generates a formatted will that you can download or print. Follow the provided instructions
                        to ensure your will is legally valid by signing it in the presence of witnesses.
                    </p>
                </li>
                <li>
                    <p>
                        <span>Secure Storage:</span>Your data is securely stored, allowing you to revisit and update your will at any time.
                    </p>
                </li>

            </ol>
            <h2>Technology Stack</h2>
            <p>
                Willcraft is developed using the following technologies:
            </p>
            <ul>
                <li>
                    <span>MongoDB:</span>A NoSQL database for storing user data securely.
                </li>
                <li>
                    <span>Express.js:</span>A web application framework for building robust APIs.
                </li>
                <li>
                    <span>React.js:</span>A JavaScript library for creating dynamic user interfaces.
                </li>
                <li>
                    <span>Node.js:</span>A server environment for running JavaScript on the server.
                </li>
            </ul>
            <p>
                We hope Willcraft provides you with the peace of mind that comes from having a legally sound will in place. Thank you for using our application,
                and we welcome any feedback to help us improve further.
            </p>

        </section>
    )

}

export default AboutUs;