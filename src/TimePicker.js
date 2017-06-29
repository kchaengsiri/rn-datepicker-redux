import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TimePickerAndroid,
  TouchableHighlight,
  Text,
  View
} from 'react-native'
import moment from 'moment'

class TimePicker extends Component {
  componentDidMount () {
    console.log(this.props)
  }

  _action (actionName, payload = undefined) {
    if (typeof this.props[actionName] === 'function') {
      this.props[actionName](payload)
    }
  }

  _getTime (time) {
    if (!time || time === '') {
      let _time = moment()
      return {
        hour: _time.hour(),
        minute: _time.minute()
      }
    }

    let _time = time.split(':')
    if (_time.length >= 2) {
      return {
        hour: Number(_time[0]),
        minute: Number(_time[1])
      }
    } else {
      return this._getTime()
    }
  }

  _openPicker () {
    this._action('onFocus')
    const time = this._getTime(this.props.value)
    TimePickerAndroid
      .open({
        ...time,
        is24Hour: false
      })
      .then(({ action, hour, minute }) => {
        if (action === TimePickerAndroid.dismissedAction) {
        } else {
          let result = moment().hour(hour).minute(minute).format('HH:mm')
          this._action('onChange', result)
        }
        this._action('onBlur')
      })
  }

  render () {
    const { placeholder, value } = this.props
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={ this._openPicker.bind(this) }
      >
        <View style={{ borderWidth: 1, borderColor: '#999', padding: 10, height: 40 }}>
          <Text style={{
            color: (value && value !== '') ? '#222' : '#ccc'
          }}>
            { (value && value !== '') ? value : placeholder }
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

TimePicker.defaultProps = {
  is24Hour: undefined,
  placeholder: '',
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onFocus: undefined
}

TimePicker.propTypes = {
  is24Hour: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

export default TimePicker
