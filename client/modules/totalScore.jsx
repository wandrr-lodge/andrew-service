import React from 'react';
import styles from '../css/totalscore.css';

class TotalScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div className={styles.score}>{this.props.score}</div>
      <div className="words">
        <div id="scoreWord">{this.props.word}</div>
        <div id="totalReviews">{this.props.reviews}</div>
      </div>
    </div>
    )
  }
}

export default TotalScore;