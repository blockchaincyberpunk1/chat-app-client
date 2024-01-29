# Frontend Installation Guide for Chat App

## Getting Started

This guide will help you set up the frontend of the Chat App on your local machine.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation Steps

1. **Clone the Repository**

    Clone the Chat App repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   ```

2. **Navigate to the Server directory**
    Change to the server directory in the cloned repository:

   ```bash
   cd chat-app/client
   ```

3. **Install Dependencies**
   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

4. **Start the Server**
   Launch the server:

   ```bash
   npm start
   ```

The application should now be running and accessible at http://localhost:3000 or http://10.0.0.46:3000.


## Verifying the Setup

Once the application is running, you should be able to open your browser and visit `http://localhost:3000`. This will load the Chat App interface.

## Troubleshooting

### Common Issues

- **Dependency Errors**: If you encounter issues related to dependencies, try deleting the `node_modules` folder and the `package-lock.json` file, then rerun `npm install`.

- **Connection to Backend**: Ensure the backend server is running and accessible. The frontend app expects the backend to be available at `http://localhost:4000`.

### Browser Compatibility

Ensure you are using a modern, updated web browser for the best experience and compatibility.



