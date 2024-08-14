// This function replaces special characters (e.g. French accents) with their "normal" equivalent in a string. 
// It is useful to match customers that may have written their names in different ways

function replace_special_letters(name_column) {
  return `REGEXP_REPLACE(NORMALIZE(${name_column}, NFD), r"\\pM", '')`;
}

module.exports = {replace_special_letters};