const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey when is a string with less than 256 characters", () => {
    const event = { partitionKey: 'test' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns the partition key as string when is defined but not of string type", () => {
    const event = { partitionKey: 1234 };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("Returns a sha3-512 encripted when event has no property partitionKey", () => {
    const event = { test: 'test' };
    const eventString = JSON.stringify(event);
    const encryptedString = crypto.createHash("sha3-512").update(eventString).digest("hex");

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(encryptedString);
  });

  it("Returns a sha3-512 encripted when event has property partitionKey and is longer than 256 characters", () => {
    const event = { partitionKey: 'test'.repeat(100) };
    const encryptedString = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(encryptedString);
  });
});
