import React from 'react'
import { Rate } from 'antd';
import PropTypes from 'prop-types';

const desc = ['1', '2', '3', '4', '5']

class Rater extends React.Component {
  state = {
    value: 3,
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <span>
        <Rate tooltips={desc} onChange={this.handleChange} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
    );
  }
}



Rater.propTypes = {
  state: PropTypes.object,
  handleChange: PropTypes.func,
}
export default Rater