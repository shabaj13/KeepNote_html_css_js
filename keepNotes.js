const addNotebtn = document.getElementById("addNotebtn");
const noteInputField = document.getElementById("noteInputField");
const closeBtn = document.getElementById("closeBtn");
const addBox = document.getElementById("addBox");

const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const addInputBtn = document.getElementById("addBtn");
const inputHeading = document.getElementById("inputHeading");

const noteTitle = document.getElementById("noteTitle");
const noteDesc = document.getElementById("noteDesc");

const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let isUpdated = false, updatedId;

addNotebtn.addEventListener("click", () => {
  titleInput.focus();
  noteInputField.classList.remove("hideAddField");
});

closeBtn.addEventListener("click", () => {
  titleInput.value = ""; //note add karne k baad agar phir se naya note add karna ho tab note ka input khali rahega
  descInput.value = "";
  addInputBtn.innerHTML = "Add Note"
  inputHeading.innerHTML = "Add a Note";
  noteInputField.classList.add("hideAddField");
  isUpdated = false;
});

//getting localStorage notes if exist and parsing them to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

function showNote() {
  document.querySelectorAll(".noteDiv").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let Notehtml = ` <div class="noteDiv">
                        <div class="note">
                             <h3 class="noteTitle" id="noteTitle">${note.title}</h3>
                             <span class="noteDesc">${note.desc}</span>
                         </div>
                      <div class="notedetail">
                          <span class="noteDate">${note.date}</span>
                           <span class="noteOpt" ">
                           <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                           <div class="options">
                             <ul>
                               <li id="editBtn" onclick="editNote(${index},'${note.title}','${note.desc}')"><ion-icon name="pencil"></ion-icon> Edit</li>
                                <li id="deleteBtn" onclick="deleteNote(${index})"><ion-icon name="trash"></ion-icon> Delete</li>
                              </ul>
                            </div>
                          </span>
                      </div>
                    </div>`;
    addBox.insertAdjacentHTML("afterend", Notehtml);
  });
}
showNote();


//Edit Note
function editNote(noteId,title,desc) { 
  addNotebtn.click();
  isUpdated = true;
  updatedId=noteId;
  addInputBtn.innerHTML = "Update"
  inputHeading.innerHTML = "Update Note";
  titleInput.value = title;
  descInput.value = desc;
  
}


//Delete Note
function deleteNote(noteId) {
  console.log(noteId);
  confirm("Are you sure you want to delete this note?",notes.splice(noteId, 1)); //removing selected note from array/tasks
  localStorage.setItem("notes", JSON.stringify(notes)); //saved updated data in localStorage
  showNote();
}

addInputBtn.addEventListener("click", () => {
  let noteInputTitle = titleInput.value, //value ek variable meh store kar diya
    noteInputDesc = descInput.value;

  if (noteInputTitle || noteInputDesc) {
    console.log(noteInputTitle, noteInputDesc);
  }

  let dateObj = new Date(); //date ka value sab nikala
  month = months[dateObj.getMonth()];
  day = dateObj.getDay();
  year = dateObj.getFullYear();

  let noteInfo = {
    // note meh joh joh value sab chahiye woh object meh convert
    title: noteInputTitle, // kar liya
    desc: noteInputDesc,
    date: `${month} ${day} ${year}`,
  };
  if (!isUpdated) {
    notes.push(noteInfo); //adding a new note to notes
  } else {
    isUpdated = false; 
    notes[updatedId]=noteInfo; //updating specified one
  }
  localStorage.setItem("notes", JSON.stringify(notes)); //saving the data in localStorage
  //aur isko object se array meh convert kar liya

  closeBtn.click();
  showNote();
});
