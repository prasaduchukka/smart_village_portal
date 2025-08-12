document.addEventListener("DOMContentLoaded", function () {
    fetchMeetingsTicker();

    // Optional: refresh every 30 seconds
    setInterval(fetchMeetingsTicker, 30000);
});

function fetchMeetingsTicker() {
    fetch("https://smart-village-portal-zfsn.onrender.com/meetings/all")
        .then(response => response.json())
        .then(meetings => {
            const ticker = document.getElementById("meetingTicker");

            if (meetings.length === 0) {
                ticker.textContent = "No meetings scheduled.";
                return;
            }

            const items = meetings.map(m => {
                return `${m.title} (${new Date(m.scheduledDateTime).toLocaleString()} @ ${m.location})`;
            });

            ticker.textContent = items.join("   •   ");
        })
        .catch(err => {
            console.error("Error loading meetings:", err);
            document.getElementById("meetingTicker").textContent = "Error loading meetings.";
        });
}
