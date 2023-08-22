module.exports = {
    // WebSocket Configuration
    WEBSOCKET_URL: 'ws://localhost:8080/2579048',

    // Message Queue (MQ) Configuration
    MQ_HOST: 'localhost',
    MQ_PORT: 5672,  // Default port for RabbitMQ; adjust if using a different MQ system
    MQ_QUEUE_NAME: 'esports_data_queue',

    // API & Server Configuration
    SERVER_PORT: 3000,
    API_KEY: 'YOUR_API_KEY',  // For API authentication (if required)

    // Database Configuration (assuming you'll be using one)
    DB_HOST: 'localhost',
    DB_PORT: 5432,  // Default port for PostgreSQL; adjust if using a different DB
    DB_USER: 'your_db_user',
    DB_PASSWORD: 'your_db_password',
    DB_NAME: 'esports_data_db',

    // Logging & Monitoring
    LOG_LEVEL: 'info',  // Possible values: 'debug', 'info', 'warn', 'error'
    MONITORING_ENDPOINT: 'http://monitoring-service-url',

    // Environment Configuration
    ENV: process.env.NODE_ENV || 'development',
};
