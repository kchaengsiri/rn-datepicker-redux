import React from 'react'

import DatePicker from './DatePicker'

const FieldDate = ({ input, meta }) => (
  <DatePicker
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
)

export default FieldDate
