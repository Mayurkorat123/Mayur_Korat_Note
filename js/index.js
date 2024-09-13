const newNote = document.querySelector(".add-note");
const inHtml = document.querySelector("#note");

const updateLsData = () => {
  const textArea = document.querySelectorAll("textArea");
  const notes = [];
  console.log(textArea);
  textArea.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const createNote = (text = "") => {
  console.log(text);
  const note = document.createElement("div");
  note.classList.add("create-note");
  const htmlData = `<div class="note-button">
                <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
            <p class ="main  ${text ? "" : "hidden"}"></p>
            <textarea class ="${
              text ? "hidden" : ""
            }" id="textArea"></textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  const delButton = note.querySelector(".delete");
  const ediButton = note.querySelector(".edit");
  const textArea = note.querySelector("#textArea");
  const mainDv = note.querySelector(".main");

  delButton.addEventListener("click", () => {
    console.log("Note removed previoua================>>>>", note);
    note.remove();
    updateLsData();
  });
  mainDv.innerHTML = text;

  ediButton.addEventListener("click", () => {
    mainDv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("change", (event1) => {
    const value = event1.target.value;
    console.log(value);
    mainDv.innerHTML = value;
    updateLsData();
  });

  textArea.value = text;
  inHtml.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    createNote(note);
    console.log(note);
  });
}

newNote.addEventListener("click", () => createNote());
