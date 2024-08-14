// This code replaces multiple consecutive spaces by a single space

function remove_multiple_spaces() {
  return `CREATE TEMP FUNCTION remove_multiple_spaces(column_name STRING)
  RETURNS STRING
  LANGUAGE js AS r"""
    if (column_name === null) {
        return column_name;
    }
    else {
      return column_name.replace(/  +/g, ' ');
    }
  """;`
}

module.exports = {remove_multiple_spaces};