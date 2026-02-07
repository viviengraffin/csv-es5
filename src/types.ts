export type CSVOptions = {
  columnDelimiter: "," | ";" | "\t";
  lineDelimiter: "\n" | "\r\n";
  stringDelimiter: "'" | '"';
  floatDelimiter: "." | ",";
  bom?: boolean;
};

export type ParsingResult = {
  endPosition: number;
  content: string;
};

export type CSVColumn = string | number | boolean;

export type CSVLine = CSVColumn[];

export type FilledCSVOptions = Required<CSVOptions>;
