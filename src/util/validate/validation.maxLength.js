function validateValidationMaxLength({ setting, value, label }) {
  if (value.length > setting)
    throw new Error(
      `${label} must be less than or equal to ${setting} characters.`
    );
}

module.exports = validateValidationMaxLength;
