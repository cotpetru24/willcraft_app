import React from "react";



// Function to set recipe rating stars
export function formatReviewRating(rating) {
    const yellowStar = '<img class="rating-stars" src="./icons8-star.png" alt="Yellow Star" />';
    const grayStar = '<img class="rating-stars" src="./icons8-star-filled-30-gray.png" alt="Gray Star" />';
    return yellowStar.repeat(rating) + grayStar.repeat(5 - rating);
}


const HomeReview = () => {
    return (
        <section className="review-container">
               <p>
                The process was seamless and easy to follow. I appreciate the detailed instructions and
                the quick turnaround time. Will definitely use this service again.
            </p>
            <h4>
                Jane
            </h4>
            <p>May 1990</p>
            <div className="review-starts-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(4) }}></div>
            {/* <h4>Great Service!</h4> */}
         

        </section>
    )

}

export default HomeReview;