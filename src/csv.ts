// deno-lint-ignore-file no-var
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
  var parsed = parse(options, content);
  return new CSV(options, parsed);
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
  var doubleStringDelimiterRegex = new RegExp(
    this.options.stringDelimiter,
    "g",
  );
  var options = this.options;

  return this.lines
    .map(function (line) {
      return line
        .map(function (column) {
          return options.stringDelimiter +
            column.replace(
              doubleStringDelimiterRegex,
              options.stringDelimiter + options.stringDelimiter,
            ) + options.stringDelimiter;
        })
        .join(options.columnDelimiter);
    })
    .join(options.lineDelimiter);
};

export { CSV };
