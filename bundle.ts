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
      (Deno.readTextFileSync("output.js").split("\n})();")[0] +
        "\n  return CSV;\n})();");
    Deno.writeTextFileSync("output.js", content);
  });
