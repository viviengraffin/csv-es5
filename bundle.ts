import { build } from "esbuild";

build({
  entryPoints: ["./main.ts"],
  outfile: "output.js",
  bundle: true,

  target: [
    "es5",
  ],
})
  .then(() => {
    const content = "var CSV = " +
      ((Deno.readTextFileSync("output.js").split("\n})();") +
        "  return CSV;\n})();").replace(";,", ";"));
    Deno.writeTextFileSync("output.js", content);
  });
