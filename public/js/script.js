// Initialize Socket.IO connection
const socket = io();

// Check if browser supports geolocation
if (navigator.geolocation) {
    // Watch user's position continuously
    navigator.geolocation.watchPosition(
        // Success callback - when position is successfully retrieved
        (position) => {
            // Extract latitude and longitude from position object
            const { latitude, longitude } = position.coords;
            // Emit location data to server
            socket.emit('send-location', { latitude, longitude });
        },
        // Error callback - handle geolocation errors
        (error) => {
            console.error('Geolocation error:', error);
        },
        // Configuration options for geolocation
        {
            enableHighAccuracy: true,  // Request high accuracy GPS data
            timeout: 5000,            // Time to wait for location data (5 seconds)
            maximumAge: 0,            // Don't use cached positions
        }
    );
}

// Initialize Leaflet map centered at [0, 0] with zoom level 16
const map = L.map("map").setView([0, 0], 16);

// Add OpenStreetMap tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Device Track", // Map attribution/credits
}).addTo(map);

// Object to store markers for each connected user
const markers = {};

// Listen for location updates from other users
socket.on("receive-location", (data) => {  
    const { id, latitude, longitude } = data;  
    
    // Center map on received coordinates
    map.setView([latitude, longitude]);  
    
    // Update existing marker or create new one
    if (markers[id]) {  
        // Update existing marker position
        markers[id].setLatLng([latitude, longitude]);  
    } else {  
        // Create new marker for user
        markers[id] = L.marker([latitude, longitude]).addTo(map);  
    }
});

// Handle user disconnection
socket.on("user-disconnected", (id) => {  
    if (markers[id]) {  
        // Remove disconnected user's marker from map
        map.removeLayer(markers[id]);  
        // Remove marker reference from markers object
        delete markers[id];  
    }  
});