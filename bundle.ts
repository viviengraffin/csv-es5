import { build } from "esbuild";

build({
  entryPoints: ["./main.ts"],
  outfile: "output.js",
  format: "iife",
  bundle: true,
  globalName: "CSV",
  target: [
    "es5",
  ],
});
