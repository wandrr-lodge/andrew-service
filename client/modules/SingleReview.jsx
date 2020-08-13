import React from 'react';
import moment from 'moment';
import Calendar from './calendar-alt-regular.svg';
import style from '../css/singlereview.module.css';


class SingleReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      mounted: false
    }
  }

  componentDidMount() {
    let date = moment(this.props.review.created_at).format('MMM D, YYYY');
    this.setState({
      date: date,
      mounted: true
    })
  }

  render() {
    let mounted = this.state.mounted;
    return (
      <div className={style.outer}>
        <div className={style.container}>
          <div className={style.reviewheader}>
            <div className={style.reviewtotal}>{this.props.review.total}</div>
            <div className={style.reviewdate}>
              <Calendar width={12} height={12} />
              {this.state.date}
            </div>
          </div>
          <div className={style.reviewbody}>
            {this.props.review.description}
          </div>
        </div>
      </div>
    )
  }
};

export default SingleReview;