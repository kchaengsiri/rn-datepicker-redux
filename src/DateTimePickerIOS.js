import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  DatePickerIOS,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import moment from 'moment'

class DateTimePicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      date: this.props.value,
      defaultFormat: {
        date: 'DD/MM/YYYY',
        time: 'HH:mm',
        datetime: 'DD/MM/YYYY HH:mm'
      },
      modalVisible: false
    }

    this._openPicker = this._openPicker.bind(this)
    this._selectDate = this._selectDate.bind(this)
    this._closePicker = this._closePicker.bind(this)
  }

  _action (name, payload) {
    if (typeof this.props[name] === 'function') {
      this.props[name](payload)
    }
  }

  _isTimestamp (value) {
    return ((/^\d{1,13}$/g).test(value))
  }

  _isDate (value) {
    return (value instanceof Date)
  }

  _getDate (value) {
    const { maxDate, minDate, format } = this.props
    if (!value || value === '') {
      const now = moment().toDate()
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
      return moment(Number(value)).toDate()
    } else {
      return moment(value, format).toDate()
    }
  }

  _openPicker () {
    this.setState({ modalVisible: true })
    this._action('onFocus')
  }

  _selectDate () {
    if (this._isDate(this.state.date)) {
      this._action('onChange', this.state.date)
      this._closePicker()
    }
  }

  _closePicker () {
    this.setState({ modalVisible: false })
    this._action('onBlur')
  }

  _appearance () {
    const { format, mode, placeholder, value } = this.props
    let _format = format || this.state.defaultFormat[mode]
    let _text
    let _style
    if (!value && value === '') {
      _style = { color: '#ccc' }
      _text = placeholder
    } else {
      _style = { color: '#222' }
      _text = moment(value).format(_format)
    }
    return (
      <View style={{
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        height: 40
      }}>
        <Text style={ _style }>
          { _text }
        </Text>
      </View>
    )
  }

  render () {
    const {
      mode,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes
    } = this.props
    const { date, modalVisible } = this.state
    return (
      <View>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={ this._openPicker }
        >
          { this._appearance() }
        </TouchableHighlight>

        <Modal
          animationType='fade'
          transparent={ true }
          visible={ modalVisible }
        >
          <TouchableHighlight
            underlayColor='transparent'
            onPress={ this._closePicker }
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            <View />
          </TouchableHighlight>
          <View style={{
            height: 250,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            shadowRadius: 5,
            shadowColor: '#444',
            shadowOpacity: 0.5,
            backgroundColor: '#fff'
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: '#888',
              borderBottomWidth: 1
            }}>
              <TouchableOpacity
                onPress={ this._closePicker }
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 15
                }}
              >
                <Text style={{ color: '#999' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ this._selectDate }
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10
                }}
              >
                <Text style={{ color: '#0080c0' }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              date={ this._getDate(date) }
              maximumDate={ maxDate && this._getDate(maxDate) }
              minimumDate={ minDate && this._getDate(minDate) }
              mode={ mode }
              onDateChange={ date => this.setState({ date }) }
              minuteInterval={ minuteInterval }
              timeZoneOffsetInMinutes={ timeZoneOffsetInMinutes }
            />
          </View>
        </Modal>
      </View>
    )
  }
}

DateTimePicker.defaultProps = {
  mode: undefined,
  format: undefined,
  maxDate: undefined,
  minDate: undefined,
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
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

export default DateTimePicker
