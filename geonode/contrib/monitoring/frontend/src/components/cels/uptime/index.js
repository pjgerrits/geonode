import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HoverPaper from '../../atoms/hover-paper';
import styles from './styles';
import actions from './actions';


const mapStateToProps = (state) => ({
  interval: state.interval.interval,
  response: state.geonodeAverageResponse.response,
  timestamp: state.interval.timestamp,
  uptime: state.uptime.response,
});


@connect(mapStateToProps, actions)
class Uptime extends React.Component {
  static propTypes = {
    get: PropTypes.func.isRequired,
    interval: PropTypes.number,
    reset: PropTypes.func.isRequired,
    style: PropTypes.object,
    timestamp: PropTypes.instanceOf(Date),
    uptime: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.get = (interval = this.props.interval) => {
      this.props.get(interval);
    };
  }

  componentWillMount() {
    this.get();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.timestamp && nextProps.timestamp !== this.props.timestamp) {
        this.get(nextProps.interval);
      }
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const style = {
      ...styles.content,
      ...this.props.style,
    };
    let uptime = 0;
    if (this.props.uptime) {
      const data = this.props.uptime.data.data;
      if (data.length > 0) {
        if (data[0].data.length > 0) {
          const metric = data[0].data[0];
          uptime = metric.count;
        }
      }
    }
    return (
      <HoverPaper style={style}>
        <h3>Uptime</h3>
        <span style={styles.stat}>{uptime} days</span>
      </HoverPaper>
    );
  }
}


export default Uptime;
