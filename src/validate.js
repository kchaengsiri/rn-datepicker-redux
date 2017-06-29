const validate = values => {
  let errors = {}
  console.log(values)
  if (!values.date) {
    errors.date = 'date is required'
  } else if (!(values.date instanceof Date)) {
    errors.date = 'date is invalid'
  }

  if (!values.time) {
    errors.time = 'time is required'
  } else if (!(values.time instanceof Date)) {
    errors.time = 'time is invalid'
  }

  return errors
}

export default validate
