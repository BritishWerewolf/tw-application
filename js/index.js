import * as wasm from "./blogs_md_easy/blogs_md_easy_wasm.js";

function convert() {
    const template = document.getElementById("template");
    const markdown = document.getElementById("markdown");
    const output = document.getElementById("output");

    if (template?.textContent && markdown?.textContent && output?.textContent) {
        output.textContent = wasm.convert(
            template.textContent,
            [markdown.textContent],
        )[0];
    }
}

const template = document.getElementById("template");
const markdown = document.getElementById("markdown");
const convertBtn = document.getElementById("convert");

if (template) {
    template.textContent = "<html>\n<head>\n<title>{{ £title }}</title>\n</head>\n<body>\n<h1>{{ £title | uppercase }} by {{ £author }}</h1>\n<main>{{ £content }}</main>\n</body>\n</html>";
}

if (markdown) {
    markdown.textContent = ":meta\nauthor = John Doe\n:meta\n# Hello, World!\nIt's nice to meet you!";
}

convertBtn.addEventListener("click", convert);
