const validate = values => {
  let errors = {}

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

  if (!values.datetime) {
    errors.datetime = 'datetime is required'
  } else if (!(values.datetime instanceof Date)) {
    errors.datetime = 'datetime is invalid'
  }

  return errors
}

export default validate
