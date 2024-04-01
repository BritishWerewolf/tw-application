export class TabView extends HTMLElement {
    static observedAttributes = ["current"];

    constructor() {
        super();
    }

    get current() {
        return this.getAttribute("current") ?? "";
    }

    get controls() {
        return this.querySelectorAll("tab-view-control");
    }

    get pages() {
        return this.querySelectorAll("tab-page");
    }

    set current(value) {
        if (value) {
            this.setAttribute("current", value);
        } else {
            this.removeAttribute("current");
        }
    }

    setActiveControl() {
        this.controls.forEach(control => control.classList.remove("active"));
        Array.from(this.controls).find(control => control.to == this.current)?.classList?.add("active");
    }

    render() {
        // Firstly we need to hide all pages.
        this.pages.forEach(page => page.hide && page.hide());

        // Now retrieve the selected page and show it.
        const currentPage = Array.from(this.pages).find(tabPage => tabPage.page === this.current);
        if (currentPage) {
            currentPage.show();
        }

        this.setActiveControl();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue == newValue) {
            return;
        }

        if (name === "current") {
            this.current = newValue;
            this.render();
        }
    }
}

export class TabViewControl extends HTMLElement {
    constructor() {
        super();
    }

    get tabView() {
        return this.closest("tab-view");
    }

    get to() {
        return this.getAttribute("to");
    }

    connectedCallback() {
        this.addEventListener("click", _ => {
            if (!this.tabView) {
                console.error("TabView cannot be found around control.");
                return;
            }

            // Find the tab view that the this control belongs to.
            const tabPage = Array.from((this.tabView).pages)
            .find(tabPage => tabPage.page == this.to);

            if (!tabPage) {
                console.error(`TabPage cannot be found for \`page="${this.to}"\``);
                return;
            }

            this.tabView.current = tabPage.page;
        });
    }
}

export class TabPage extends HTMLElement {
    constructor() {
        super();
    }

    get tabView() {
        return this.closest("tab-view");
    }

    get page() {
        return this.getAttribute("page") ?? "";
    }

    show() {
        this.style.display = "block";
    }

    hide() {
        this.style.display = "none";
    }

    connectedCallback() {
        this.hide();

        if (!this.tabView) {
            console.error(`TabView cannot be found for this TabPage (${this.page})`);
            return;
        }
        this.tabView.render();
    }
}

customElements.define("tab-view", TabView);
customElements.define("tab-view-control", TabViewControl);
customElements.define("tab-page", TabPage);
