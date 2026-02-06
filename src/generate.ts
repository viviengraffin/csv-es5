import { STRING_DELIMITER_REGEX } from "./const.ts";
import { CSVColumn, CSVOptions } from "./types.ts";

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

function generateStringColumn(options: CSVOptions, column: string): string {
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

function generateNumberColumn(options: CSVOptions, column: number): string {
  return options.floatDelimiter === "."
    ? column.toString()
    : column.toString().replace(".", options.floatDelimiter);
}

function generateBooleanColumn(column: boolean): string {
  return column ? "true" : "false";
}

function generateColumn(options: CSVOptions, column: CSVColumn): string {
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
