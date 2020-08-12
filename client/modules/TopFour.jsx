import React from 'react';
import style from '../css/top.module.css';
import SingleReview from './SingleReview.jsx';

class TopFour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: []
    }
  }

    componentWillMount() {
      this.set();
    }

    set() {
      let result = [];
      console.log('something');
      for (let i = 0; i < 4; i += 1) {
        if (this.props.reviews[i] !== undefined) {
          result.push(this.props.reviews[i]);
        }
      }
      console.log(result);
      this.setState({
        top: result
      });
      console.log(this.state.top);
    }

    render() {

      return (
        <div className={style.reviewgrid}>
          {this.props.reviews.map((review) =>
            <SingleReview review={review} />
          )}
        </div>
      )
    }

}

export default TopFour;