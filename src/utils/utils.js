export function openModal(modal) {
  modal.classList.add("modal__opened");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEscapeKey);
}

export function closeModal(modal) {
  modal.classList.remove("modal__opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEscapeKey);
}

export function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

export function closeModalByEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal__opened");
    closeModal(openedModal);
  }
}
