function showSection(sectionId) {
            document.getElementById("submitSection").style.display = "none";
            //document.getElementById("viewSection").style.display = "none";
            document.getElementById(sectionId).style.display = "block";

            if (sectionId === "viewSection") {
                fetchComplaints(); // Load complaints when that section is visible
            }
        }

        document.getElementById("complaintForm").addEventListener("submit", async function (event) {
            event.preventDefault();

            const complaintData = {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                submittedBy: document.getElementById("submittedBy").value
            };

            try {
                const response = await fetch("http://localhost:8095/complaint/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(complaintData)
                });

                if (response.ok) {
                    const result = await response.json();
                    document.getElementById("response").innerHTML =
                        `<p style="color:green;">Complaint submitted! ID: ${result.id}</p>`;
                    document.getElementById("complaintForm").reset();
                } else {
                    document.getElementById("response").innerHTML =
                        "<p style='color:red;'>Error submitting complaint.</p>";
                }
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("response").innerHTML =
                    "<p style='color:red;'>Network error.</p>";
            }
        });

		async function fetchComplaints() {
		    try {
		        const response = await fetch("http://localhost:8095/complaint/all");
		        const complaints = await response.json();

		        const listContainer = document.getElementById("complaintsList");
		        listContainer.innerHTML = "";

		        complaints.forEach(complaint => {
		            const div = document.createElement("div");
		            div.className = "complaint-item";
		            div.innerHTML = `
		                <p><strong>${complaint.title}</strong></p>
		                <p>${complaint.description}</p>
		                <p><em>Submitted by:</em> ${complaint.submittedBy}</p>
		                <label>
		                    <input type="checkbox" ${complaint.resolved ? "checked" : ""} onchange="toggleResolved(${complaint.id})">
		                    Resolved
		                </label>
		                <div class="btn-group">
		                    <button class="btn btn-update" onclick="editComplaint(${complaint.id}, '${complaint.title}', '${complaint.description}', '${complaint.submittedBy}')">Update</button>
		                    <button class="btn btn-delete" onclick="deleteComplaint(${complaint.id})">Delete</button>
		                </div>
		                <hr>
		            `;
		            listContainer.appendChild(div);
		        });
		    } catch (error) {
		        console.error("Error loading complaints:", error);
		        document.getElementById("complaintsList").innerHTML = "<p>Error loading complaints.</p>";
		    }
		}


        async function toggleResolved(id) {
            try {
                await fetch(`http://localhost:8095/complaint/resolve/${id}`, { method: "PUT" });
                fetchComplaints(); // Refresh after toggle
            } catch (error) {
                console.error("Error updating complaint status:", error);
            }
        }

		
		function editComplaint(id, title, description, submittedBy) {
		    document.getElementById("updateId").value = id;
		    document.getElementById("updateTitle").value = title;
		    document.getElementById("updateDescription").value = description;
		    document.getElementById("updateSubmittedBy").value = submittedBy;

		    showSection("updateFormContainer");
		}

		document.getElementById("updateComplaintForm").addEventListener("submit", async function (event) {
		    event.preventDefault();
			
			//const id = document.getElementById("updateId").value;
		    const updatedComplaint = {
		        id: document.getElementById("updateId").value,
		        title: document.getElementById("updateTitle").value,
		        description: document.getElementById("updateDescription").value,
		        submittedBy: document.getElementById("updateSubmittedBy").value
		    };

		    try {
				const id = updatedComplaint.id;
		        const response = await fetch(`http://localhost:8095/complaint/update/${id}`, {
		            method: "PUT",
		            headers: { "Content-Type": "application/json" },
		            body: JSON.stringify(updatedComplaint)
		        });

		        if (response.ok) {
		            alert("Complaint updated successfully.");
		            showSection("viewSection");
					fetchComplaints(); // ✅ Refresh the list
		        } else {
		            alert("Error updating complaint.");
		        }
		    } catch (error) {
		        console.error("Error:", error);
		        alert("Network error while updating complaint.");
		    }
		});

		async function deleteComplaint(id) {
		    const confirmDelete = confirm("Are you sure you want to delete this complaint?");
		    if (!confirmDelete) return;

		    try {
		        const response = await fetch(`http://localhost:8095/complaint/${id}`, {
		            method: "DELETE"
		        });

		        if (response.ok) {
		            alert("Complaint deleted.");
		            fetchComplaints();  // ✅ Refresh the list
		        } else {
		            alert("Error deleting complaint.");
		        }
		    } catch (error) {
		        console.error("Error deleting complaint:", error);
		        alert("Network error while deleting complaint.");
		    }
		}
		
        // Optional: show form section by default
        showSection("submitSection");
// Load complaints on page load
window.onload = fetchComplaints;
