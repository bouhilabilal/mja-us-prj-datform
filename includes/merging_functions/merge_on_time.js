// This function merges the values of a column for a duplicated customer, following the recency or ancienty rule

function recent(column, merge_criteria, order_criteria) {
  return `FIRST_VALUE(${column} IGNORE NULLS) OVER(PARTITION BY ${merge_criteria} ORDER BY ${order_criteria} DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)`;
}

function ancient(column, merge_criteria, order_criteria) {
  return `FIRST_VALUE(${column} IGNORE NULLS) OVER(PARTITION BY ${merge_criteria} ORDER BY ${order_criteria} ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)`;
}

module.exports = {
  recent,
  ancient
}