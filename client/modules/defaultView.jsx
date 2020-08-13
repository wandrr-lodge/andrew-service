import React from 'react';
import styles from '../css/default.module.css';
import TotalScore from './totalScore.jsx';
import Categories from './Categories.jsx';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.word)
    return (
      <div className={styles.view}>
        <h4 className={styles.header}>Reviews & Ratings</h4>
        <TotalScore score={this.props.reviews.total} word={this.props.word} reviews={this.props.count} />
        <Categories scores={[
          { name: 'Security', score: this.props.reviews.security },
          { name: 'Location', score: this.props.reviews.location },
          { name: 'Staff', score: this.props.reviews.staff },
          { name: 'Atmosphere', score: this.props.reviews.atmosphere },
          { name: 'Cleanliness', score: this.props.reviews.cleanliness },
          { name: 'Facilities', score: this.props.reviews.facilities },
          { name: 'Value For Money', score: this.props.reviews.value }
        ]} style={{ "grid-template-columns": "repeat(4,1fr)" }}/>
      </div>
    )
  }
};


export default DefaultView;