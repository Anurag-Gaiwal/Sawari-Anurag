# Sawari-Anurag

Sawari-Anurag is a full-stack MERN project that facilitates carpooling services. It allows drivers to publish rides, and passengers can request rides. Based on these requests, drivers can accept or reject rides. The project utilizes MongoDB as the database, React for the frontend, and Node.js with Express for the backend.

![Sawari-Anurag](https://github.com/pranavraikar01/sawari-pranav/assets/114228628/bcdf9365-b29c-4d7e-a072-e8ce9a32297b)

## Setup

### Configuration File

Inside the server folder, create a `config.env` file with the following details:

```plaintext
NODE_ENV=development

PORT=3000

USERNAME="Your username"

DATABASE="Link of your MongoDB Atlas database connection"

DATABASE_PASSWORD="Your password"

JWT_SECRET="Your secret key"

JWT_EXPIRES_IN=90d

JWT_COOKIE_EXPIRES_IN=90
```

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**
   ```bash
   cd Sawari-Anurag
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm start
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:5173) in your browser to view the application.

## Technologies Used

- MongoDB: NoSQL database for data storage.
- Express.js: Web application framework for Node.js.
- React: JavaScript library for building user interfaces.
- Node.js: JavaScript runtime environment.
- JWT: JSON Web Tokens for authentication.
- Axios: Promise-based HTTP client for making requests.
- dotenv: Module for loading environment variables from a `.env` file.

## Contributing

Contributions to Sawari-Anurag are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact Anurag at [anuraggaiwal0gmail.com](mailto:anuraggaiwal0gmail.com).
