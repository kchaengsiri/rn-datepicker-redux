import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableHighlight,
  Text,
  View
} from 'react-native'
import moment from 'moment'

const defaultFormat = {
  date: 'DD/MM/YYYY',
  time: 'HH:mm',
  datetime: 'DD/MM/YYYY HH:mm'
}

class DateTimePicker extends Component {
  _action (actionName, payload = undefined) {
    if (typeof this.props[actionName] === 'function') {
      this.props[actionName](payload)
    }
  }

  _isTimestamp (value) {
    return ((/^\d{1,13}$/g).test(value))
  }

  _isDate (value) {
    return (value instanceof Date)
  }

  _getDate (value) {
    const { format,minDate, maxDate } = this.props
    if (!value || value === '') {
      const now = moment().valueOf()
      if (minDate) {
        const _minDate = this._getDate(minDate)
        if (now < _minDate) {
          return _minDate
        }
      }
      if (maxDate) {
        const _maxDate = this._getDate(maxDate)
        if (now > _maxDate) {
          return _maxDate
        }
      }
      return now
    } else if (this._isDate(value)) {
      return value
    } else if (this._isTimestamp(value)) {
      return Number(value)
    } else {
      return moment(value, format).valueOf()
    }
  }

  _getTime (value) {
    if (this._isDate(value)) {
      return {
        hour: value.getHours(),
        minute: value.getMinutes()
      }
    } else if (this._isTimestamp(value)) {
      let _time = moment(value)
      return {
        hour: _time.hour(),
        minute: _time.minute()
      }
    } else {
      let _time = moment()
      return {
        hour: _time.hour(),
        minute: _time.minute()
      }
    }
  }

  _datePicker () {
    const { value, minDate, maxDate, pickerStyle } = this.props
    return DatePickerAndroid.open({
      date: this._getDate(value),
      minDate: minDate && this._getDate(minDate),
      maxDate: maxDate && this._getDate(maxDate),
      mode: pickerStyle
    })
  }
  _datePickerCallback ({ action, day, month, year }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      let result = moment([year, month, day]).toDate() //.format(this.props.format)
      this._action('onChange', result)
    }
    this._action('onBlur')
  }

  _timePicker () {
    const { value, is24Hour } = this.props
    const time = this._getTime(value)
    return TimePickerAndroid.open({
      ...time,
      is24Hour: is24Hour
    })
  }
  _timePickerCallback ({ action, hour, minute }) {
    if (action !== TimePickerAndroid.dismissedAction) {
      let result = moment().hour(hour).minute(minute).toDate()
      this._action('onChange', result)
    }
    this._action('onBlur')
  }

  _datetimePickerCallback ({ action, day, month, year }) {
    if (action === DatePickerAndroid.dismissedAction) {
      this._action('onBlur')
    } else {
      this._timePicker().then(({ action, hour, minute }) => {
        if (action !== TimePickerAndroid.dismissedAction) {
          let result = moment([year, month, day]).hours(hour).minutes(minute).toDate()
          this._action('onChange', result)
        }
        this._action('onBlur')
      })
    }
  }

  _openPicker () {
    this._action('onFocus')

    switch (this.props.mode) {
      case 'date':
        this._datePicker().then(this._datePickerCallback.bind(this))
        break
      case 'time':
        this._timePicker().then(this._timePickerCallback.bind(this))
        break
      case 'datetime':
        this._datePicker().then(this._datetimePickerCallback.bind(this))
        break;
      default:
        break;
    }
  }

  _appearance ({ mode, format, placeholder, value }) {
    let _text
    let _result = value
    let _format = format || defaultFormat[mode]
    if (_result && _result !== '') {
      _result = moment(_result).format(_format)
      _text = <Text style={{ color: '#222' }}>{ _result }</Text>
    } else {
      _text = <Text style={{ color: '#ccc' }}>{ placeholder }</Text>
    }
    return (
      <View style={{
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        height: 40
      }}>
        { _text }
      </View>
    )
  }

  render () {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={ this._openPicker.bind(this) }
      >
        { this._appearance(this.props) }
      </TouchableHighlight>
    )
  }
}

DateTimePicker.defaultProps = {
  mode: undefined,
  format: undefined,
  maxDate: undefined,
  minDate: undefined,
  pickerStyle: 'default',
  is24Hour: undefined,
  placeholder: '',
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onFocus: undefined
}

DateTimePicker.propTypes = {
  mode: PropTypes.string.isRequired,
  format: PropTypes.string,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  pickerStyle: PropTypes.oneOf(['calendar', 'spinner', 'default']),
  is24Hour: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

export default DateTimePicker
