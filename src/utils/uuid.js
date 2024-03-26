const crypto = require('crypto');

module.exports = {
  generateUniqueId: (length) => {
    const uuid = crypto.randomUUID();
    if (length) {
      const uniqueId = uuid.replace(/-/g, '').substring(0, length);
      return uniqueId;
    }

    return uuid;
  },
};
