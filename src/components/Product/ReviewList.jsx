import React, { Component, Fragment } from 'react';
import Stars from './Stars';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { auth, reviews, reviewEditClick, handleDeleteReview } = this.props;

    let ownReview = null;
    const otherReviews = reviews.filter(review => {
      if (`${review.customerId}` == `${auth.id}`) {
        ownReview = review;
        return false;
      }

      return true;
    });

    const sortedReviews = ownReview ? [
      ownReview,
      ...otherReviews
    ] : otherReviews

    return (
      <div id="reviews">
        <h1>Reviews</h1>
        
        { !sortedReviews.length && (<div> There are no reviews for this product</div>) }
        { sortedReviews.map(review => {
          const { id, rating, review: reviewText, Auth: { email } } = review;

          return (
            <div key={id} className="review clearfix">
              <img src="/images/avatar.png" />
              <div className="content">
                <div className="clearfix">
                  <span>{ email.split('@')[0] }</span>
                  <span><Stars readonly initialRating={rating} /></span>
                  
                  { `${review.customerId}` == `${auth.id}` && (
                    <Fragment>
                      <button
                        className="actions"
                        type="text"
                        onClick={() => handleDeleteReview(id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                      <button
                        onClick={() => reviewEditClick(id, reviewText, rating)}
                        className="actions"
                        type="text"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </Fragment>
                  ) }
                </div>
                <p>
                  { reviewText }
                </p>
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
}

export default ReviewList;
