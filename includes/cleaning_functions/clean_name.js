// This code detects all invalid names and replace them by a NULL value

// Function to use in case the database contains names with non roman characters (e.g. Chinese names)

function clean_name(name_column) {
  return `CASE

          -- Replace names containing invalid characters by a null value  
          WHEN REGEXP_CONTAINS(${name_column}, r'[!"#%$​*+,:;<=>?@\^_\`\|~€£]|[\])}]|[\[({]')
                THEN NULL
          

          -- All other names are put in standard format, with the first letter of each "word" in uppercase
            ELSE INITCAP(TRIM(${name_column}))

            
          END`;

}

// Function to use if all names are written in roman characters
function clean_name_only_roman_letters(name_column) {
  return `CASE

          -- Replace names containing invalid characters by a null value  
            WHEN NOT REGEXP_CONTAINS(lower(${name_column}), r'^[a-z0-9&\/. -]+$')
                THEN NULL
          

          -- All other names are put in standard format, with the first letter of each "word" in uppercase
            ELSE INITCAP(TRIM(${name_column}))

            
          END`;
}

module.exports = { clean_name, clean_name_only_roman_letters };