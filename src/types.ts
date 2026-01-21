export type CSVOptions = {
  columnDelimiter: string;
  lineDelimiter: string;
  stringDelimiter: string;
};

export type ParsingResult = {
  endPosition: number;
  content: string;
};
