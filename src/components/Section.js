import { containerSelector } from "../utils/constants";

export default class Section {
  constructor({ items, renderer }) {
    this._items = items || [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
