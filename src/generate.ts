import { BYTE_ORDER_MARK, STRING_DELIMITER_REGEX } from "./const.ts";
import type { CSVColumn, FilledCSVOptions } from "./types.ts";

export function generate(options: FilledCSVOptions, lines: string[][]): string {
  return (options.bom ? BYTE_ORDER_MARK : "") + (lines
    .map(function (line) {
      return generateLine(options, line);
    })
    .join(options.lineDelimiter));
}

function generateLine(options: FilledCSVOptions, line: string[]): string {
  return line
    .map(function (column) {
      return generateColumn(options, column);
    })
    .join(options.columnDelimiter);
}

function generateStringColumn(
  options: FilledCSVOptions,
  column: string,
): string {
  if (
    column.indexOf(options.columnDelimiter) !== -1 ||
    column.indexOf(options.lineDelimiter) !== -1 ||
    column.indexOf(options.stringDelimiter) !== -1
  ) {
    return options.stringDelimiter +
      column.replace(
        STRING_DELIMITER_REGEX[options.stringDelimiter],
        options.stringDelimiter + options.stringDelimiter,
      ) + options.stringDelimiter;
  } else {
    return column;
  }
}

function generateNumberColumn(
  options: FilledCSVOptions,
  column: number,
): string {
  return options.floatDelimiter === "."
    ? column.toString()
    : column.toString().replace(".", options.floatDelimiter);
}

function generateBooleanColumn(column: boolean): string {
  return column ? "true" : "false";
}

function generateColumn(options: FilledCSVOptions, column: CSVColumn): string {
  switch (typeof column) {
    case "string":
      return generateStringColumn(options, column);
    case "number":
      return generateNumberColumn(options, column);
    case "boolean":
      return generateBooleanColumn(column);
    default:
      throw new Error(
        "TypeError: string, number or boolean awaited \n" +
          JSON.stringify(column),
      );
  }
}
