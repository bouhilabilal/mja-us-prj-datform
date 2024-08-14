// This code will check if an array is a sub-array of another one, in order to exclude subarrays from the duplicates

function identify_subarray() {
  return `CREATE TEMP FUNCTION is_arrayA_in_arrayB(arrayA ARRAY<string>, arrayB ARRAY<string>)
              AS (
                    (
                      SELECT min(unnested_arrayA in UNNEST(arrayB))
                      FROM UNNEST(arrayA) as unnested_arrayA
                    )
                  );`

}

module.exports = {identify_subarray};