import React from 'react';
import styles from '../css/categories.module.css';

class Categories extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className={styles.categoriesGrid}>
        {this.props.scores.map((score) =>
        <ListItem obj={score} />
        )}
      </ul>
    )
  }
};

const ListItem = ({obj}) => {
  let css = {width: `${obj.score * 10}%`};
  return (
    <li className={styles.categoryRating}>
      <div className={styles.categoriesText}>
        <div className={styles.categoryName}>{obj.name}</div>
        <div className={styles.categoryScore}>{obj.score}</div>
      </div>
      <div className={styles.rating}>
        <div className={styles.bar} style={css}></div>
      </div>
    </li>
  )
};

export default Categories;