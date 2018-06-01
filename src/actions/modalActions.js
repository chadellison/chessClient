export const handleModalAction = (payload) => {
  return {
    type: 'HANDLE_MODAL',
    payload
  }
}

export const spinnerAction = (active) => {
  return {
    type: 'SPINNER',
    active: active
  }
}
