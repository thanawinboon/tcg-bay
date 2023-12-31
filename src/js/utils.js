function getDate(timestamp) {
  const date = new Date(timestamp)
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  return `${yyyy}-${mm}-${dd}`
}

export { getDate }
