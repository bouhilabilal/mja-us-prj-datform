// When two sources are joined and have a common column, one source has to be prioritized. 
// This function returns the value from the prioritized source if non NULL, and returns the value from the other source if NULL.

function largest(Source_1_column_name, Source_2_column_name) {
  return `CASE  WHEN ${Source_1_column_name} IS NULL
                  THEN ${Source_2_column_name}
                WHEN ${Source_2_column_name} IS NULL
                  THEN ${Source_1_column_name}
                WHEN ${Source_1_column_name} > ${Source_2_column_name}
                  THEN ${Source_1_column_name}
                ELSE ${Source_2_column_name}
          END`;
}


module.exports = {largest};