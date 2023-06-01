export function openModal(modal) {
  modal.classList.add("modal__open");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEscapeKey);
}

export function closeModal(modal) {
  modal.classList.remove("modal__open");
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
    const openedModal = document.querySelector(".modal__open");
    closeModal(openedModal);
  }
}
