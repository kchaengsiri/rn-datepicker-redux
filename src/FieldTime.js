import React from 'react'
import { Text, View } from 'react-native'

import TimePicker from './TimePicker'

const FieldTime = ({ input, meta }) => (
  <View>
    <TimePicker
      // format='DD/MM/YYYY'
      // maxDate='31/07/2017'
      // minDate='01/06/2017'
      // pickerStyle='spinner'
      // placeholder='23/11/1990'
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
