# List all available scripts.
default:
    just --list --unsorted

################################################################################
# Build
# Purge and minify CSS.
[private]
build-css target="development":
    bunx tailwindcss -i ./css/main.css -o ./css/stylesheet.css {{ if target == "production" { "--minify" } else { "" } }}

# Compile TypeScript files.
[private]
build-js target="development":
    bunx webpack --mode {{ target }}

# Build assets. module: ["css", "js", "all"]
build target="development" *modules="css js":
    {{ if modules =~ "css" { "just build-css " + target } else { "" } }}
    {{ if modules =~ "js"  { "just build-js "  + target } else { "" } }}

################################################################################
# Watch
[private]
watch-css:
    bunx tailwindcss -i ./css/main.css -o ./css/stylesheet.css --watch

[private]
watch-js target="development":
    bunx webpack --mode {{ target }} --watch

# Watches building of assets. module: ["css", "js", "all"]
watch *modules="all":
    #!/bin/bash
    set -euo pipefail
    for module in {{ modules }}; do
        case $module in
            css) just watch-css;;
            js)  just watch-js;;
            *)   just watch-js & just watch-css;;
        esac
    done
