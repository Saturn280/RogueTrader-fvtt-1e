import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveCharacteristicTest
} from "../module/rules/char-test.mjs";

test("roll below target is a success", () => {
  const result = resolveCharacteristicTest(45, 32);

  assert.equal(result.success, true);
  assert.equal(result.degrees, 2);
});

test("roll equal to target is a success", () => {
  const result = resolveCharacteristicTest(45, 45);

  assert.equal(result.success, true);
  assert.equal(result.degrees, 1);
});

test("roll above target is a failure", () => {
  const result = resolveCharacteristicTest(45, 47);

  assert.equal(result.success, false);
  assert.equal(result.degrees, 1);
});

test("a very high roll can cause multiple failure degrees", () => {
  const result = resolveCharacteristicTest(35, 78);

  assert.equal(result.success, false);
  assert.equal(result.degrees, 5);
});

test("invalid values are rejected", () => {
  assert.throws(
    () => resolveCharacteristicTest(45, 0),
    RangeError
  );

  assert.throws(
    () => resolveCharacteristicTest(101, 50),
    RangeError
  );
});

test("minimum roll is handled correctly", () => {
  const result = resolveCharacteristicTest(45, 1);

  assert.equal(result.success, true);
  assert.equal(result.degrees, 4);
});

test("maximum roll against maximum target succeeds", () => {
  const result = resolveCharacteristicTest(100, 100);

  assert.equal(result.success, true);
  assert.equal(result.degrees, 1);
});