export const querySelectorWithThrow = <K extends keyof HTMLElementTagNameMap>(element : HTMLElement | Document, selector : K) =>
    element.querySelectorAll(selector)[0]