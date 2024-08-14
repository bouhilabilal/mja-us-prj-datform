function ApplayRegEx(email_column) {
    return `CASE WHEN NOT REGEXP_CONTAINS(lower(${email_column}), r'/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
                THEN TRIM(lower(${email_column}))
            ELSE NULL
          END`;

}

module.exports = {
    ApplayRegEx
};
