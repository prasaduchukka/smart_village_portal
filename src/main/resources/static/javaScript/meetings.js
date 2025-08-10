function showSection(sectionId) {
    document.getElementById("submitSection").style.display = "none";
    document.getElementById("viewSection").style.display = "none";
    document.getElementById("updateFormContainer").style.display = "none";

    document.getElementById(sectionId).style.display = "block";

    if (sectionId === "viewSection") {
        fetchMeetings();
    }
}


// ✅ Add Meeting
document.getElementById("meetingForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const meetingData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        scheduledDateTime: document.getElementById("scheduledDateTime").value,
        location: document.getElementById("location").value
    };

    try {
        const response = await fetch("http://localhost:8095/meetings/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(meetingData)
        });

        if (response.ok) {
            alert("Meeting added!");
            document.getElementById("meetingForm").reset();
            showSection("viewSection");
        } else {
            alert("Error adding meeting.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Network error.");
    }
});

// ✅ Fetch & Display Meetings
async function fetchMeetings() {
    try {
        const response = await fetch("http://localhost:8095/meetings/all");
        const meetings = await response.json();

        const listContainer = document.getElementById("meetingList");
        listContainer.innerHTML = "";

        meetings.forEach(meeting => {
            const div = document.createElement("div");
            div.className = "meeting-item";
            div.innerHTML = `
                <p><strong>${meeting.title}</strong></p>
                <p>${meeting.description}</p>
                <p><em>Date:</em> ${meeting.scheduledDateTime}</p>
                <p><em>Location:</em> ${meeting.location}</p>
                
				<label>
				    <input type="checkbox" ${meeting.completed ? "checked" : ""} onchange="toggleResolved(${meeting.id})">
				    Resolved
				</label></br>
                <button onclick="editMeeting(${meeting.id}, '${meeting.title}', '${meeting.description}', '${meeting.scheduledDateTime}', '${meeting.location}')">Update</button>
                <button onclick="deleteMeeting(${meeting.id})">Delete</button>
                <hr>
            `;
            listContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading meetings:", error);
        document.getElementById("meetingList").innerHTML = "<p>Error loading meetings.</p>";
    }
}


async function toggleResolved(id) {
    try {
        await fetch(`http://localhost:8095/meetings/status/${id}`, { method: "PUT" });
        fetchMeetings(); // Refresh after toggle
    } catch (error) {
        console.error("Error updating complaint status:", error);
    }
}

// ✅ Edit Meeting - Fill Update Form
function editMeeting(id, title, description, scheduledDateTime, location) {
    document.getElementById("updateId").value = id;
    document.getElementById("updateTitle").value = title;
    document.getElementById("updateDescription").value = description;
    document.getElementById("updateScheduledDateTime").value = scheduledDateTime.slice(0, 16);
    document.getElementById("updateLocation").value = location;

    showSection("updateFormContainer");
}

// ✅ Update Meeting
document.getElementById("updateMeetingForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("updateId").value;
    const updatedMeeting = {
        title: document.getElementById("updateTitle").value,
        description: document.getElementById("updateDescription").value,
        scheduledDateTime: document.getElementById("updateScheduledDateTime").value,
        location: document.getElementById("updateLocation").value
    };

    try {
        const response = await fetch(`http://localhost:8095/meetings/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMeeting)
        });

        if (response.ok) {
            alert("Meeting updated successfully.");
            showSection("viewSection");
        } else {
            alert("Error updating meeting.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Network error while updating meeting.");
    }
});

// ✅ Delete Meeting
async function deleteMeeting(id) {
    if (!confirm("Are you sure you want to delete this meeting?")) return;

    try {
        const response = await fetch(`http://localhost:8095/meetings/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Meeting deleted.");
            fetchMeetings();
        } else {
            alert("Error deleting meeting.");
        }
    } catch (error) {
        console.error("Error deleting meeting:", error);
        alert("Network error.");
    }
}

// Default: show submit form
showSection("submitSection");
