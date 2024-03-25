const crypto = require('crypto');

const generateUniqueId = (length) => {
  const uuid = crypto.randomUUID();
  if (length) {
    const uniqueId = uuid.replace(/-/g, '').substring(0, length);
    return uniqueId;
  }

  return uuid;
};

module.exports = generateUniqueId;
