const API = "http://localhost:5000/api/notes";

const form = document.getElementById("noteForm");

const notesContainer =
document.getElementById("notesContainer");

const titleInput =
document.getElementById("title");

const contentInput =
document.getElementById("content");

const pinnedInput =
document.getElementById("pinned");



// ==========================
// FETCH NOTES
// ==========================

async function fetchNotes() {

    try {

        const response = await fetch(API);

        const notes = await response.json();

        notesContainer.innerHTML = "";

        notes.forEach((note) => {

            notesContainer.innerHTML += `

                <div class="note">

                    <h3>${note.title}</h3>

                    <p>${note.content}</p>

                    <small>
                        ${note.pinned ? "📌 Pinned" : ""}
                    </small>

                    <br><br>

                    <button onclick="deleteNote('${note._id}')">
                        Delete
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}



// ==========================
// CREATE NOTE
// ==========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const note = {

        title: titleInput.value,

        content: contentInput.value,

        pinned: pinnedInput.checked

    };

    try {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(note)

        });

        form.reset();

        fetchNotes();

    } catch (error) {

        console.log(error);

    }

});



// ==========================
// DELETE NOTE
// ==========================

async function deleteNote(id) {

    try {

        await fetch(`${API}/${id}`, {

            method: "DELETE"

        });

        fetchNotes();

    } catch (error) {

        console.log(error);

    }

}


fetchNotes();