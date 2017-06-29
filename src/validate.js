const validate = values => {
  let errors = {}
  console.log(values)
  if (!values.date) {
    errors.date = 'date is required'
  }

  if (!values.time) {
    errors.time = 'time is required'
  }

  return errors
}

export default validate
