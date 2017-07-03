import React from 'react'
import { Text, View } from 'react-native'

import DateTimePickerAndroid from '../src/DateTimePickerAndroid'

const FieldDateTime = ({ input, meta }) => (
  <View>
    <DateTimePickerAndroid
      mode='datetime'
      // format='dddd, MMMM Do YYYY'
      // maxDate='1506729600000'
      // minDate={new Date()}
      // pickerStyle='spinner'
      placeholder='please select datetime'
      is24Hour={ true }
      onChange={ input.onChange }
      onBlur={ input.onBlur }
      onFocus={ input.onFocus }
      value={ input.value }
    />
    { (meta.visited  && meta.invalid) &&
      <Text style={{ color: '#f00', fontSize: 12 }}>
        { meta.error }
      </Text>
    }
  </View>
)

export default FieldDateTime
