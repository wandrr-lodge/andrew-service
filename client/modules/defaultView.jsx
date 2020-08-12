import React from 'react';
import styles from '../css/default.module.css';
import TotalScore from './totalScore.jsx';
import Categories from './Categories.jsx';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className={styles.view}>
        <h4 className={styles.header}>Reviews & Ratings</h4>
        <TotalScore score={9.1} word={'good'} reviews={45} />
        <Categories scores={[
          { name: 'Security', score: 9.4 },
          { name: 'Location', score: 9.9 },
          { name: 'Staff', score: 9.2 },
          { name: 'Atmosphere', score: 8.8 },
          { name: 'Cleanliness', score: 8.9 },
          { name: 'Facilities', score: 8.4 },
          { name: 'Value For Money', score: 9.1 }
        ]} />
      </div>
    )
  }
};


export default DefaultView;