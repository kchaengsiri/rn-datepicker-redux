import React from 'react'
import { Text, View } from 'react-native'

import DateTimePickerAndroid from '../src/DateTimePickerAndroid'

const FieldTime = ({ input, meta }) => (
  <View>
    <DateTimePickerAndroid
      mode='time'
      // format='h:mm a'
      // placeholder='please select time'
      // is24Hour={ true }
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

export default FieldTime
