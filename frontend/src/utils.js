const ValidateEmail = (mail) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
const ValidatePhone = (mobile) => (/^\d{10}$/.test(mobile))
const ValidateAY = (AY) => (/^\d{4}$/.test(AY))

const generateHeaders = (token) => ({headers: {Authorization: `Bearer ${token}`}})

export {ValidateEmail, ValidatePhone, ValidateAY, generateHeaders}