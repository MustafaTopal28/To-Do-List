document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.querySelector(".add__task button");
  const taskInput = document.querySelector(".new__task input");
  const todoContainer = document.querySelector(".todo__container");

  addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
        <span>${taskText}</span>
        <button class="done-btn add-btn">Done</button>
        <button class="delete-btn">Delete</button>
      `;
      todoContainer.querySelector("div:first-child").appendChild(taskElement);
      taskInput.value = "";

      const doneBtn = taskElement.querySelector(".done-btn");
      doneBtn.addEventListener("click", function () {
        const taskToMove = this.parentNode;
        const accomplishedContainer = document.querySelector(".todo__container > div:last-child");
        accomplishedContainer.appendChild(taskToMove);
        taskToMove.classList.add("accomplished");
      });

      const deleteBtn = taskElement.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        const taskToDelete = this.parentNode;
        taskToDelete.remove();
      });
    } else {
      alert("Please enter a task!");
    }
  });
});
