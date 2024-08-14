// The following functions will cover the situation in which dates are stored in the following format: YYYYMMDD.

//First, let's extract the year information from the field
function year(date) {
  return `CASE 
          -- If the date is too short (less than 8 digits), return NULL
            WHEN length(${date}) < 8
                THEN NULL
          -- In other cases, checks if the year is before 1901. In that case, returns NULL.
            WHEN cast(SUBSTR(${date}, 1, 4) as int64) < 1901
              THEN NULL
          -- In all other case, the year is valid. Returns the year.
            ELSE cast(SUBSTR(${date}, 1, 4) as int64)
          END`
}

//Then, let's extract the month information from the field
function month(date) {

  return `CASE 
          -- If the date is too short (less than 8 digits), return NULL
            WHEN length(${date}) < 8
                THEN NULL
          -- If the month is not between 1 and 12, returns NULL
            WHEN cast(SUBSTR(${date}, 5, 2) as int64) < 1
                  OR cast(SUBSTR(${date}, 5, 2) as int64) > 12
                THEN NULL
          -- In all ohter cases, the month is valid. Returns the month.
            ELSE cast(SUBSTR(${date}, 5, 2) as int64)
          END`;
}

//Then, let's extract the day information from the field
function day(date) {

  return `CASE
          -- If the date is too short (less than 8 digits), return NULL
            WHEN length(${date}) < 8
                THEN NULL
          -- If the day is not between 1 and 31, returns NULL
            WHEN cast(SUBSTR(${date}, 7, 2) as int64) < 1
                  OR cast(SUBSTR(${date}, 7, 2) as int64) > 31
                THEN NULL
          -- Returns NULL if the 31st of the month does not exist
            WHEN cast(SUBSTR(${date}, 7, 2) as int64) = 31
                  AND ${month(date)} NOT IN (1, 3, 5, 7, 8, 10, 12)
                THEN NULL
          -- Returns NULL if it is February 30th
            WHEN cast(SUBSTR(${date}, 7, 2) as int64) = 30
                  AND ${month(date)} = 2
                THEN NULL
          -- Returns NULL if February 29th does not exist that year
            WHEN cast(SUBSTR(${date}, 7, 2) as int64) = 29
                  AND ${month(date)} = 2
                  AND ${year(date)} IS NOT NULL
                  AND MOD(${year(date)}, 4) <> 0
                THEN NULL
          -- In all other cases, the day is valid, returns the day.
            ELSE cast(SUBSTR(${date}, 7, 2) as int64)
          END`;
}

//Concatenate year, month and day to obtain the full date
function full_date(date) {
  return `
              DATE(
                    ${year(date)}, ${month(date)}, ${day(date)}
                  )
          `;
}

module.exports = { year, month, day, full_date };
