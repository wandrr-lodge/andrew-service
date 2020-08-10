import React from 'react';
import styles from '../css/totalscore.css';

class TotalScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className={styles.reviews}>
      <div className={styles.score}>{this.props.score}</div>
      <div className={styles.words}>
        <div className={styles.scoreWord}>{this.props.word}</div>
        <div className={styles.totalReviews}>{this.props.reviews} total reviews</div>
      </div>
    </div>
    )
  }
}

export default TotalScore;