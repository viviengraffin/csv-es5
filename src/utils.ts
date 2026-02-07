import type { CSVOptions } from "./types.ts";

export function fillCSVOptions(options: CSVOptions): Required<CSVOptions> {
  if (typeof options.bom !== "boolean") {
    options.bom = false;
  }

  return options as Required<CSVOptions>;
}
