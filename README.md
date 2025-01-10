# Real-Time Location Tracker

This application provides real-time location tracking using Socket.IO, Leaflet, and Express.js. Users can share their location, and the map dynamically updates to display the positions of all connected users.

## Features

* Real-time location updates using Socket.IO.
* Leaflet map integration for visualization.
* User connection and disconnection handling.
* Error handling and input validation for location data.
* Dynamically updated user count on the map.

## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gangwarsomya/Tracker.git
Use code with caution.
Markdown
Navigate to the project directory:

cd Tracker
Use code with caution.
Bash
Install dependencies:

npm install
Use code with caution.
Bash
Running the application
Start the server:

npm start
Use code with caution.
Bash
Open your web browser and go to http://localhost:3000.

Technologies Used
Node.js: Server-side JavaScript runtime environment.

Express.js: Web framework for Node.js.

Socket.IO: Enables real-time, bidirectional communication.

Leaflet: JavaScript library for interactive maps.

EJS: Templating engine.

File Structure
app.js: Server-side logic (Socket.IO connections, location updates, user management).

public/js/script.js: Client-side JavaScript (geolocation, map interaction, Socket.IO communication).

public/css/style.css: Application styles.

views/index.ejs: Main HTML template.

README.md: This file.

How it Works
Client-side (script.js):

Uses navigator.geolocation.watchPosition() to continuously track the user's location.

Sends location data to the server via Socket.IO's send-location event.

Receives location updates from other users via the receive-location event and updates the Leaflet map markers.

Server-side (app.js):

Listens for incoming Socket.IO connections.

Handles send-location events from clients, validating the received data.

Broadcasts the received location data to all connected clients using the receive-location event.

Manages connected users and emits user-disconnected events when a user disconnects.
