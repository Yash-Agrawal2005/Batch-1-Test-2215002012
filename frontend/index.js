const leaderboardBody = document.getElementById("leaderboard-body");
let leaderboardData = []; // To hold the leaderboard data fetched from the backend

// Fetch data from the backend
const fetchLeaderboardData = async () => {
    try {
        const response = await fetch("http://localhost:3001/data"); // Replace with your API endpoint
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");
        leaderboardData = await response.json(); // Assuming the backend returns an array of objects
        renderLeaderboard(leaderboardData);
    } catch (error) {
        console.error(error);
        showErrorState();
    }
};

// Render leaderboard rows
const renderLeaderboard = (data) => {
    leaderboardBody.innerHTML = ''; // Clear the table body
    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'border-gray-700');
        row.innerHTML = `
            <td class="p-4">${index + 1}</td>
            <td class="p-4">${student.roll}</td>
            <td class="p-4">${student.name}</td>
            <td class="p-4">${student.section || 'N/A'}</td>
            <td class="p-4">${student.totalSolved || 'N/A'}</td>
            <td class="p-4 text-green-400">${student.easySolved || 'N/A'}</td>
            <td class="p-4 text-yellow-400">${student.mediumSolved || 'N/A'}</td>
            <td class="p-4 text-red-400">${student.hardSolved || 'N/A'}</td>
            <td class="p-4">
                <button class="pin-btn bg-blue-500 text-white px-2 py-1 rounded" data-index="${index}">
                    Pin
                </button>
            </td>
        `;
        leaderboardBody.appendChild(row);
    });

    // Add click listeners for "Pin" buttons
    document.querySelectorAll('.pin-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            pinRow(index);
        });
    });
};

// Pin a row to the top
const pinRow = (index) => {
    const pinnedRow = leaderboardData.splice(index, 1)[0]; // Remove the selected row
    leaderboardData.unshift(pinnedRow); // Add it to the top
    renderLeaderboard(leaderboardData); // Re-render the table
};

// Show error state
const showErrorState = () => {
    const errorState = document.getElementById("error-state");
    errorState.classList.remove("hidden");
};

// Show loading state
const showLoadingState = () => {
    const loadingState = document.getElementById("loading-state");
    loadingState.classList.remove("hidden");
};

// Hide loading state
const hideLoadingState = () => {
    const loadingState = document.getElementById("loading-state");
    loadingState.classList.add("hidden");
};

// Initialize leaderboard
const initLeaderboard = () => {
    showLoadingState();
    fetchLeaderboardData().finally(hideLoadingState);
};

// Run on page load
document.addEventListener("DOMContentLoaded", initLeaderboard);
