const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient(); // Initialize Prisma client

// Connect to the database and start the server
async function main() {
  try {
    await prisma.$connect();
    console.log('PostgreSQL Connected...');
    
    // Middleware
    app.use(express.json());
    app.use(cors());

    // Define Routes
    app.use('/api/auth', require('./routes/auth')(prisma));
    app.use('/api/tasks', require('./routes/tasks')(prisma));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
}

main();