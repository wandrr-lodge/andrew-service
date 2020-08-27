import React from 'react';
import style from '../css/latest.module.css';
import TopFour from './TopFour.jsx';
import ModalWindow from './ModalWindow.jsx';

class LatestReviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonText: 'Read all Reviews'
    }
  }

  render() {
    // console.log(this.props.topfour);
    return (
      <div className={style.view}>
        <h4 className={style.latest}>Latest Reviews</h4>
        <TopFour reviews={this.props.topfour} />
        <ModalWindow
          buttonDisplay="block"
          reviews={this.props.reviews}
          averages={this.props.averages}
          count={this.props.length}
          word={this.props.word}
          buttonStyle={1}
          innerStyle={1}
          buttonText={this.state.buttonText}
        />
      </div>
    )
  }
};

export default LatestReviews;
