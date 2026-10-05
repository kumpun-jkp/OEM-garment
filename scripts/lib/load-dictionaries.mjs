import fs from "node:fs/promises";
import ts from "typescript";

// Node's test runner strips types, but it does not resolve Next.js extensionless
// imports. Transpile only this data module and point its imports at source files.
export async function loadDictionaries() {
  const source = await fs.readFile(
    new URL("../../src/content/translations.ts", import.meta.url),
    "utf8",
  );
  let { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  });
  for (const file of ["site", "products", "copy-refinements"])
    outputText = outputText.replaceAll(
      `"./${file}"`,
      JSON.stringify(
        new URL(`../../src/content/${file}.ts`, import.meta.url).href,
      ),
    );
  return (
    await import(
      `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
    )
  ).dictionaries;
}
