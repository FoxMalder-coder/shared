const tabList = document.querySelector("[role='tablist']");
const tabs = tabList.querySelectorAll("[role='tab']");

let tabFocus = 0;
const changeTabFocus = (e) => {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) { tabFocus = tabs.length - 1; }
        } else if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) { tabFocus = 0; }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

const hideContent = (parent, content) => {
    parent
        .querySelectorAll(content)
        .forEach(item => { item.setAttribute("hidden", true) });
}

const showContent = (parent, content) => {
    parent.querySelector(content).removeAttribute("hidden");
}

const changeTabPanel = (e) => {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector("[aria-selected='true']")
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    hideContent(mainContainer, "[role='tabpanel']");
    showContent(mainContainer, `#${targetPanel}`);

    hideContent(mainContainer, ".g-image");
    showContent(mainContainer, `#${targetImage}`);
}

tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach(tab => { tab.addEventListener("click", changeTabPanel); }); 