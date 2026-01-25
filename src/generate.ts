import { stringDemimiterRegex } from "./const.ts";
import { CSVOptions } from "./types.ts";

export function generate(options: CSVOptions, lines: string[][]): string {
  return lines
    .map(function (line) {
      return generateLine(options, line);
    })
    .join(options.lineDelimiter);
}

function generateLine(options: CSVOptions, line: string[]): string {
  return line
    .map(function (column) {
      return generateColumn(options, column);
    })
    .join(options.columnDelimiter);
}

function generateColumn(options: CSVOptions, column: string): string {
  if (
    column.indexOf(options.columnDelimiter) !== -1 ||
    column.indexOf(options.lineDelimiter) !== -1 ||
    column.indexOf(options.stringDelimiter)!==-1
  ) {
    return options.stringDelimiter +
      column.replace(
        stringDemimiterRegex[options.stringDelimiter],
        options.stringDelimiter + options.stringDelimiter,
      ) + options.stringDelimiter;
  } else {
    return column;
  }
}
