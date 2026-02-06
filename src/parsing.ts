// deno-lint-ignore-file no-var
import { NUMBER_REGEX } from "./const.ts";
import { CSVColumn, CSVLine, CSVOptions, ParsingResult } from "./types.ts";

export function parse(options: CSVOptions, content: string): CSVLine[] {
  var res: CSVLine[] = [];
  var line: CSVLine = [];
  var i = 0;
  var r = undefined;

  while (i < content.length) {
    if (
      content.substring(i, i + options.lineDelimiter.length) ===
        options.lineDelimiter
    ) {
      res.push(line);
      line = [];
      i += options.lineDelimiter.length;
    } else {
      r = parseColumn(options, content, i);
      i = r.endPosition;
      line.push(parseColumnContent(options, r.content));
    }
  }

  if (line.length > 0) {
    res.push(line);
  }

  return res;
}

function parseColumn(
  options: CSVOptions,
  content: string,
  startPosition: number,
): ParsingResult {
  var i = 0;
  var startWithStringDelimiter = false;
  var res = "";
  var index = 0;

  while (startPosition + i < content.length) {
    index = startPosition + i;

    if (i === 0 && content[index] === options.stringDelimiter) {
      startWithStringDelimiter = true;
      i++;
      continue;
    } else if (!startWithStringDelimiter) {
      if (content[index] === options.columnDelimiter) {
        i++;
        break;
      } else if (
        content.substring(index, index + options.lineDelimiter.length) ===
          options.lineDelimiter
      ) {
        break;
      }
    } else if (
      startWithStringDelimiter &&
      content.substring(index, index + 2) ===
        options.stringDelimiter + options.stringDelimiter
    ) {
      res += options.stringDelimiter;
      i += 2;
      continue;
    } else if (
      startWithStringDelimiter && content[index] === options.stringDelimiter
    ) {
      startWithStringDelimiter = false;
      i++;
      continue;
    }

    i++;
    res += content[index];
  }

  return {
    endPosition: startPosition + i,
    content: res,
  };
}

function parseColumnContent(options: CSVOptions, content: string): CSVColumn {
  if (content === "true" || content === "false") {
    return content === "true";
  } else if (NUMBER_REGEX[options.floatDelimiter].test(content)) {
    return Number(
      options.floatDelimiter === "."
        ? content
        : content.replace(options.floatDelimiter, "."),
    );
  } else {
    return content;
  }
}
