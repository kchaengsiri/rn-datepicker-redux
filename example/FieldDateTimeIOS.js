import React from 'react'
import { Text, View } from 'react-native'

import DateTimePickerIOS from '../src/DateTimePickerIOS'

const FieldDateTimeIOS = ({ input, meta }) => (
  <View>
    <DateTimePickerIOS
      mode='datetime'
      // format='dddd, MMMM Do YYYY'
      // maxDate='1506729600000'
      // minDate={new Date()}
      // placeholder='please select datetime'
      // timeZoneOffsetInMinutes={ 0 }
      // minuteInterval={ 10 }
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

export default FieldDateTimeIOS
