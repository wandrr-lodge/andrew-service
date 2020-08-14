import React from 'react';
import User from './user-circle-solid.svg';
import moment from 'moment';
import Calendar from './calendar-alt-regular.svg';
import style from '../css/modalreview.module.css'

class ModalReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
  }

  componentDidMount() {
    let date = moment(this.props.review.created_at).format('MMM D, YYYY');
    this.setState({
      date: date
    })
  }

  render() {
    return (
      <div className={style.largecontainer}>
        <div className={style.authorcontainer}>
          <div>
            <User width={40} height={40} style={{color: '#b9babb'}}/>
          </div>
          <ul className={style.authorlist}>
            <li className={style.username}>{this.props.review.name}</li>
            <li className={style.userdescription}>{this.props.review.gender}{', '}{this.props.review.age_group}</li>
            <li className={style.userdescription}>{this.props.review.authdescription}</li>
          </ul>
        </div>
        <div>
          <div className={style.totalcontainer}>
            <div style={{ display: 'inline-flex' }}>
              <div className={style.reviewtotal}>{this.props.review.total}</div>
              <div className={style.reviewword}>{this.props.word}</div>
            </div>
            <div className={style.reviewdate}>
            <Calendar width={12} height={12} />
              {this.state.date}
            </div>
          </div>
            <div className={style.reviewdescription}>{this.props.review.description}</div>
        </div>
      </div>
    )
  }
}

export default ModalReview;