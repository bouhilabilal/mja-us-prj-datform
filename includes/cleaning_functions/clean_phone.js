// This function transforms phone numbers into E164 format, when the phone number is stored in international format.

function clean_phone(phone_column) {
  return `CASE
          -- If there are no numbers in the phone number, return NULL
            WHEN REGEXP_REPLACE(TRIM(${phone_column}), r'[^0-9+]+', '') = ''
                THEN NULL
          -- If the phone number starts with '00' (international format), it replaces '00' by '+'
            WHEN STARTS_WITH(TRIM(${phone_column}), '00')
                THEN CONCAT('+', SUBSTR(REGEXP_REPLACE(TRIM(${phone_column}), r'[^0-9+]+', ''), 3))
          
          -- All other phone numbers remain unchanged
            ELSE REGEXP_REPLACE(TRIM(${phone_column}), r'[^0-9+]+', '')

          END`;

}

module.exports = { clean_phone };