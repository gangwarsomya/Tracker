// Import required dependencies
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*", // Configure CORS for production
        methods: ["GET", "POST"]
    }
});

// Configure middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Add JSON parsing middleware

// Configure view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Explicitly set views directory

// Track connected users
const connectedUsers = new Set();

// Socket.IO connection handling
io.on("connection", (socket) => {
    // Add user to connected users set
    connectedUsers.add(socket.id);
    console.log(`New connection: ${socket.id}`);
    
    // Handle location updates
    socket.on("send-location", (data) => {
        try {
            // Validate location data
            if (!data || typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
                console.error('Invalid location data received');
                return;
            }
            
            // Broadcast location to all connected clients
            io.emit("receive-location", {
                id: socket.id,
                latitude: data.latitude,
                longitude: data.longitude
            });
        } catch (error) {
            console.error('Error processing location data:', error);
        }
    });
    
    // Handle client disconnection
    socket.on("disconnect", () => {
        // Remove user from connected users set
        connectedUsers.delete(socket.id);
        console.log(`User disconnected: ${socket.id}`);
        
        // Notify all clients about disconnection
        io.emit("user-disconnected", socket.id);
    });
});

// Routes
app.get("/", (req, res) => {
    try {
        res.render("index", {
            activeUsers: connectedUsers.size
        });
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something went wrong!');
});

// Configure port
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});