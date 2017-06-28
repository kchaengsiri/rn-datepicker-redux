import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  DatePickerAndroid,
  TouchableHighlight,
  Text,
  View
} from 'react-native'
import moment from 'moment'

class DatePicker extends Component {
  componentDidMount () {
    console.log(this.props)
  }

  _getDate (date) {
    const { minDate, maxDate, format } = this.props

    if (!date || date === '') {
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
    }

    if (date instanceof Date) {
      return date
    }

    return moment(date, format).valueOf()
  }

  _openPicker () {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus()
    }
    DatePickerAndroid
      .open({
        date: this._getDate(this.props.value),
        minDate: this.props.minDate && this._getDate(this.props.minDate),
        maxDate: this.props.maxDate && this._getDate(this.props.maxDate),
        mode: this.props.pickerStyle
      })
      .then(({ action, day, month, year }) => {
        if (action === DatePickerAndroid.dismissedAction) {
          this.props.onBlur()
        } else {
          let result = moment([year, month, day]).format('DD/MM/YYYY')
          this.props.onChange(result)
          this.props.onBlur()
        }
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

DatePicker.defaultProps = {
  format: 'DD/MM/YYYY',
  maxDate: undefined,
  minDate: undefined,
  pickerStyle: 'default',
  placeholder: '',
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onFocus: undefined
}

DatePicker.propTypes = {
  format: PropTypes.string,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  pickerStyle: PropTypes.oneOf(['calendar', 'spinner', 'default']),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

export default DatePicker
