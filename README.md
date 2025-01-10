
# Real-Time Location Tracker

This application provides real-time location tracking using Socket.IO, Leaflet, and Express.js. Users can share their location, and the map dynamically updates to display the positions of all connected users.

## Features

* Real-time location updates using Socket.IO.
* Leaflet map integration for visualization.
* User connection and disconnection handling.
* Error handling and input validation for location data.
* Dynamically updated user count on the main page.

## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gangwarsomya/Tracker.git 
   ```
2. Navigate to the project directory:
   ```bash
   cd Tracker
   ```
3. Install dependencies:
   ```bash
   npx nodemon
   ```
   ```bash
   npm init -y
   ```
   ```bash
   npm i express ejs
   ```
   ```bash
   npm i socket.io  
   ```

### Running the Application

1. Start the server:
   ```bash
   npx nodemon app.js 
   ```
2. Open your web browser and go to `http://localhost:3000`.

## Technologies Used

* **Node.js:** Server-side JavaScript runtime environment.
* **Express.js:** Web framework for Node.js.
* **Socket.IO:** Enables real-time, bidirectional communication.
* **Leaflet:** JavaScript library for interactive maps.
* **EJS:** Templating engine for dynamic HTML.

## File Structure

* **app.js:** Main server-side application logic (handles Socket.IO connections, location updates, and user management).
* **public/js/script.js:** Client-side JavaScript for handling geolocation, map interaction, and Socket.IO communication.
* **public/css/style.css:** Styles for the application.
* **views/index.ejs:** HTML template for the main page.
* **README.md:** This file.

## How It Works

1. **Client-Side (`script.js`):**
   - Obtains the user's location using `navigator.geolocation.watchPosition()`.
   - Emits the location data to the server via a Socket.IO event called `send-location`.
   - Listens for `receive-location` events from the server (containing other users' locations) and updates the Leaflet map markers accordingly.
   - Handles user disconnection events to remove markers from the map.

2. **Server-Side (`app.js`):**
   - Establishes a Socket.IO connection.
   - Listens for `send-location` events from clients. Validates the received location data.
   - Broadcasts the received location data to all connected clients via the `receive-location` event.
   - Manages connected users and emits `user-disconnected` events when a client disconnects.
   - Renders the `index.ejs` file, passing the number of active users to the template.

