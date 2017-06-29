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
  componentDidMount () {
    console.log(this.props)
  }

  _action (actionName, payload = undefined) {
    if (typeof this.props[actionName] === 'function') {
      this.props[actionName](payload)
    }
  }

  _getDate (date) {
    if (!date || date === '') {
      const now = moment().valueOf()
      if (this.props.minDate) {
        const _minDate = this._getDate(this.props.minDate)
        if (now < _minDate) {
          return _minDate
        }
      }
      if (this.props.maxDate) {
        const _maxDate = this._getDate(this.props.maxDate)
        if (now > _maxDate) {
          return _maxDate
        }
      }
      return now
    }

    if (date instanceof Date) {
      return date
    }

    // timestamp ?
    if (date.length > 0 && (/^\d+$/g).test(date)) {
      return Number(date)
    }
    return moment(date, this.props.format).valueOf()
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

  _datePicker () {
    return DatePickerAndroid.open({
      date: this._getDate(this.props.value),
      minDate: this.props.minDate && this._getDate(this.props.minDate),
      maxDate: this.props.maxDate && this._getDate(this.props.maxDate),
      mode: this.props.pickerStyle
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
    const time = this._getTime(this.props.value)
    return TimePickerAndroid.open({
      ...time,
      is24Hour: false
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
    if (action !== DatePickerAndroid.dismissedAction) {
      this._timePicker().then(({ action, hour, minute }) => {
        if (action !== TimePickerAndroid.dismissedAction) {
          let result = moment([year, month, day]).hours(hour).minutes(minute)
          this._action('onChange', result.format(this.props.format))
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
    let _date = value
    let _format = format || defaultFormat[mode]
    if (_date && _date !== '') {
      if (_date instanceof Date) {
        _date = moment(_date).format(_format)
      }
      _text = <Text style={{ color: '#222' }}>{ _date }</Text>
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
