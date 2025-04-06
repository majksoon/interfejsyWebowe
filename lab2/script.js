"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const listSelect = document.getElementById("list-select");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalConfirm = document.getElementById("modal-confirm");
  const modalCancel = document.getElementById("modal-cancel");
  const searchInput = document.getElementById("search-input");
  const caseInsensitiveCheckbox = document.getElementById("case-insensitive");
  const deletedList = document.getElementById("deletedList");
  const categoryInput = document.getElementById("category-input");
  const addCategoryBtn = document.getElementById("add-category-btn");
  const listsContainer = document.querySelector(".lists");
  const listaUsuniete = document.getElementById("listaUsuniete");

  let lastDeleted = null;
  let lastDeletedParent = null;
  let lastDeletedDeletedLi = null;
  let categoryCounter = 3;

  function taskExists(taskText) {
    const allTaskSpans = document.querySelectorAll(".list ul li .task-text");
    for (let span of allTaskSpans) {
      if (span.textContent.toLowerCase() === taskText.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
      alert("Zadanie nie może być puste!");
      return;
    }
    if (taskExists(taskText)) {
      alert("Zadanie już istnieje!");
      return;
    }
    const listId = listSelect.value;
    const listContainer = document.querySelector(`#${listId} ul`);
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    const dateSpan = document.createElement("span");
    dateSpan.className = "done-date";
    li.appendChild(dateSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "X";
    li.appendChild(deleteBtn);

    taskSpan.addEventListener("click", function () {
      li.classList.toggle("done");
      if (li.classList.contains("done")) {
        const now = new Date();
        dateSpan.textContent = now.toLocaleString();
      } else {
        dateSpan.textContent = "";
      }
    });

    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      modalMessage.textContent =
        "Czy na pewno chcesz usunąć zadanie o treści: " + taskText + "?";
      modal.style.display = "flex";
      lastDeleted = li;
      lastDeletedParent = listContainer;

      modalConfirm.onclick = function () {
        listContainer.removeChild(li);
        const now = new Date();
        const deletedLi = document.createElement("li");
        deletedLi.textContent = `${taskText} (usunięte: ${now.toLocaleString()})`;
        deletedList.appendChild(deletedLi);
        lastDeletedDeletedLi = deletedLi;
        modal.style.display = "none";
      };
      modalCancel.onclick = function () {
        modal.style.display = "none";
        lastDeleted = null;
        lastDeletedParent = null;
        lastDeletedDeletedLi = null;
      };
    });

    listContainer.appendChild(li);
    taskInput.value = "";
  }

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    const isCaseInsensitive = caseInsensitiveCheckbox.checked;
    const allItems = document.querySelectorAll(".list ul li");
    allItems.forEach(function (li) {
      const text = li.querySelector(".task-text")
        ? li.querySelector(".task-text").textContent
        : li.textContent;
      let match;
      if (isCaseInsensitive) {
        match = text.toLowerCase().includes(query.toLowerCase());
      } else {
        match = text.includes(query);
      }
      li.style.display = match ? "" : "none";
    });
  });

  const listHeaders = document.querySelectorAll(".list h2");
  listHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      const ul = this.nextElementSibling;
      ul.style.display = ul.style.display === "none" ? "" : "none";
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "z") {
      if (lastDeleted && lastDeletedParent) {
        lastDeletedParent.appendChild(lastDeleted);
        if (lastDeletedDeletedLi) {
          lastDeletedDeletedLi.remove();
        }
        lastDeleted = null;
        lastDeletedParent = null;
        lastDeletedDeletedLi = null;
      }
    }
  });

  function addCategory() {
    const categoryName = categoryInput.value.trim();
    if (!categoryName) {
      alert("Nazwa kategorii nie może być pusta!");
      return;
    }
    const options = listSelect.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].text.toLowerCase() === categoryName.toLowerCase()) {
        alert("Kategoria już istnieje!");
        return;
      }
    }
    const option = document.createElement("option");
    const newListId = "lista" + categoryCounter++;
    option.value = newListId;
    option.textContent = categoryName;
    listSelect.appendChild(option);

    const newList = document.createElement("div");
    newList.className = "list";
    newList.id = newListId;

    const h2 = document.createElement("h2");
    h2.textContent = categoryName;
    newList.appendChild(h2);

    const ul = document.createElement("ul");
    newList.appendChild(ul);

    h2.addEventListener("click", function () {
      ul.style.display = ul.style.display === "none" ? "" : "none";
    });

    listsContainer.insertBefore(newList, listaUsuniete);
    categoryInput.value = "";
    updateSelectSize();
  }

  addCategoryBtn.addEventListener("click", addCategory);
  categoryInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addCategory();
    }
  });

  function updateSelectSize() {
    const count = listSelect.options.length;
    if (count > 5) {
      listSelect.size = 5;
    } else {
      listSelect.size = 1;
    }
  }

  updateSelectSize();
});
