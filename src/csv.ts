import { generate } from "./generate.ts";
import { parse } from "./parsing.ts";
import type { CSVOptions } from "./types.ts";

/**
 * Create a CSV Instance
 *
 * @param options Options of this CSV
 * @param lines Parsed content of this CSV
 */
function CSV(options: CSVOptions, lines?: string[][]) {
  this.options = options;
  this.lines = lines || [];
}

/**
 * Parse the string CSV to a CSV Instance
 *
 * @param options Options of this CSV content
 * @param content Content of this CSV
 * @returns CSV Instance
 */
CSV.parse = function (options: CSVOptions, content: string) {
  return new CSV(options, parse(options, content));
};

/**
 * Add line to this CSV Instance
 *
 * @param line Line to add
 * @returns Lines number of this CSV Instance
 */
CSV.prototype.push = function (line: string[]) {
  return this.lines.push(line);
};

/**
 * Generate the string of this CSV Instance
 *
 * @returns {string} String CSV
 */
CSV.prototype.toString = function () {
  return generate(this.options, this.lines);
};

export { CSV };
