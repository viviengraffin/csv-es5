// deno-lint-ignore-file no-var
export var STRING_DELIMITER_REGEX = {
  '"': /"/g,
  "'": /'/g,
};

export var NUMBER_REGEX = {
  ".": /^[+-]?([0-9]*[.])?[0-9]+$/,
  ",": /^[+-]?([0-9]*[,])?[0-9]+$/,
};

export var BYTE_ORDER_MARK = "\ufeff";
