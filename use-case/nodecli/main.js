import * as util from "node:util";
import * as fs from "node:fs/promises";
// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from "./md2html.js";

const {
    values,
    positionals
} = util.parseArgs({
    allowPositionals: true,
    options: {
        gfm: {
            type: "boolean",
            default: false,
        }
    }
});
const filePath = positionals[0];
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    const html = md2html(file, {
        // gfmフラグのパース結果をオプションとして渡す
        gfm: values.gfm
    });
    console.log(html);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});