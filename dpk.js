const crypto = require("crypto");

/*
* Funcion antigua
  exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;
    let candidate;

    if (event) {
      if (event.partitionKey) {
        candidate = event.partitionKey;
      } else {
        const data = JSON.stringify(event);
        candidate = crypto.createHash("sha3-512").update(data).digest("hex");
      }
    }

    if (candidate) {
      if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
      }
    } else {
      candidate = TRIVIAL_PARTITION_KEY;
    }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    return candidate;
  };
*/

/*
 * Funcion nueva
   The difference mainly are the validations or the assignment of default value, for example:
   at the beginin is better to set the value of candidate as the TRIVIAL_PARTITION_KEY than assign this after
   next we check the existence of the event with an if else, but we could use the OR operator and short circuit validation to remove this validation
   And finally the typeof validation and the max length keep the same behavior.
   With all of this we remove all the specific validations with short circuit or default values.
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
  }

  return candidate;
};
