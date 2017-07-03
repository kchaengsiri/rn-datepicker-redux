import React from 'react'
import { Text, View } from 'react-native'

import DateTimePickerIOS from '../src/DateTimePickerIOS'

const FieldTime = ({ input, meta }) => (
  <View>
    <DateTimePickerIOS
      mode='time'
      // format='h:mm a'
      // placeholder='please select time'
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
