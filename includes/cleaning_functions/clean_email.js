// This code detects all invalid email addresses and replace them by a NULL value

function clean_email(email_column) {
  return `CASE WHEN NOT REGEXP_CONTAINS(lower(${email_column}), r'^[a-z0-9!#$%&*\`=?^_+|~.-]+@[a-z0-9.-]+\.[a-z]{2,}$')
                  OR length(${email_column}) < 8
                  OR length(Split(${email_column}, '@')[ORDINAL(1)]) < 2
                  OR NOT CONTAINS_SUBSTR(Split(${email_column}, '@')[ORDINAL(2)], '.')
                THEN NULL
            ELSE TRIM(lower(${email_column}))
          END`;

}

module.exports = { clean_email };