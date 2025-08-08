// Load all meetings on page load
document.addEventListener("DOMContentLoaded", function () {
    fetchMeetings();

    // Form submission
    document.getElementById("meetingForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const meeting = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            location: document.getElementById("location").value
        };

        // POST to backend
        fetch("/meetings/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(meeting)
        })
        .then(() => {
            fetchMeetings(); // Reload list
            document.getElementById("meetingForm").reset();
        });
    });
});

// Function to fetch all meetings from backend
function fetchMeetings() {
    fetch("/meetings/all")
        .then(response => response.json())
        .then(data => displayMeetings(data));
}

// Render meetings in the DOM
function displayMeetings(meetings) {
    const list = document.getElementById("meetingList");
    list.innerHTML = "";

    meetings.forEach(meeting => {
        const div = document.createElement("div");
        div.className = "meeting";
        if (meeting.completed) div.classList.add("completed");

        div.innerHTML = `
            <strong>${meeting.title}</strong> <br>
            ${meeting.description}<br>
            <em>${new Date(meeting.scheduledDateTime).toLocaleString()}</em> at <b>${meeting.location}</b><br>
            <label>
                <input type="checkbox" class="checkbox" ${meeting.completed ? "checked" : ""} 
                onchange="toggleCompleted(${meeting.id}, this.checked)">
                Mark as Completed
            </label>
        `;

        list.appendChild(div);
    });
}

// Toggle completed status for a meeting
function toggleCompleted(id, isCompleted) {
    fetch(`/meetings/status/${id}?completed=${isCompleted}`, {
        method: "PUT"
    })
    .then(() => fetchMeetings());
}
