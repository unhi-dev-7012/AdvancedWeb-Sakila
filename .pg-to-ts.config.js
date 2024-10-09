require('dotenv').config();


module.exports = {
  // PostgreSQL database connection string using environment variables
    connectionString: `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
    
    // Specify schema to include (optional)
    schema: 'public', // or ['schema1', 'schema2']

    // Directory to save generated TypeScript entities
    output: './src/entities',

    // Additional options like whether to use timestamps, types, etc.
    options: {
        camelCase: true, // Convert names to camelCase
        // other options...
    }
};
