# Tailwind Application
This is a super simple site, built using nothing but HTML, Tailwind and a couple of custom components that I wrote.

## Usage
I have included a `justfile`, so ensure you have [casey/just](https://github.com/casey/just) installed on your machine.

You can find the available commands by calling `just`, since the default recipe will list everything.  
Otherwise, they are listed below here
```
$ just
just --list --unsorted
Available recipes:
    default                        # List all available scripts.
    build *modules="css js"        # Build assets for production. module: ["css", "js"]
    build-dev *modules="css js"    # Build assets for development. module: ["css", "js"]
    watch *modules="all"           # Watches building of assets. module: ["css", "js", "all"]
```
Both the build scripts use a space separated modules for either `css`, `js`, both to build for that module.

The watch script actually looks for `css`, `js`, or any other string.  
It was built slightly differently as I couldn't use a fall through since I needed both scripts to run simultaneously with `&`.

## Anything else?
Yes, I have included [`blogs_md_easy`](https://github.com/BritishWerewolf/blogs-md-easy) that I have rebuilt as a WASM module.  
At some point I will rewrite the library to have both a binary CLI and a WASM build, but for now this version was cheated manually.
