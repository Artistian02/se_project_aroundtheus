import { containerSelector } from "../utils/constants";

export default class Section {
  constructor({ items, renderer }) {
    this._renderedItems = items || [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
