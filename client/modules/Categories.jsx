import React from 'react';
import styles from '../css/categories.module.css';

class Categories extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <ul className="categoriesGrid">
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
    <li className="category-rating">
      <div>
        <div className="rating-category-name">{obj.name}</div>
        <div className="rating-category-score">{obj.score}</div>
      </div>
      <div className={styles.rating}>
        <div className={styles.bar} style={css}></div>
      </div>
    </li>
  )
};

export default Categories;