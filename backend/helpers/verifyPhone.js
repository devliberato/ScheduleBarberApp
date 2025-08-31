function verifyPhone(phone) {
  const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?[\s-]?)?\d{4,5}[-]?\d{4}$/;
  return phoneRegex.test(phone);
}

module.exports = verifyPhone;