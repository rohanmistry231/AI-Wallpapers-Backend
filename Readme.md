# AI Wallpapers Website - Backend

This is the backend for the AI Wallpapers website, which handles user authentication, wallpaper management, and other related operations. The backend is built with **Node.js**, **Express.js**, and **MongoDB**.

## Folder Structure

The project has the following folder structure:

```
/ai-wallpapers-backend
│
├── /controllers
│   └── imageController.js         # Contains logic for handling image-related requests (CRUD operations)
│   └── userController.js          # Contains logic for handling user registration, login, and profile updates
│
├── /models
│   └── image.js                   # Mongoose schema for Image metadata, including image details, tags, and more
│   └── user.js                    # Mongoose schema for User, including name, email, password, etc.
│
├── /routes
│   └── imageRoutes.js             # API routes for handling image operations like create, get, update, delete, etc.
│   └── userRoutes.js              # API routes for handling user authentication and profile management
│
├── /middleware
│   └── authMiddleware.js          # Middleware for protecting routes and validating JWT tokens
│
├── /utils
│   └── pagination.js              # Utility functions for paginating the list of images
│
├── server.js                      # Main entry point for the server, where Express is configured and API routes are connected
├── package.json                   # Project dependencies and metadata
├── .env                           # Environment variables (e.g., database URL, JWT secret)
```

## Getting Started

Follow the instructions below to set up and run the backend locally.

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas cluster)

### Installing Dependencies

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd ai-wallpapers-backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Setting Up Environment Variables

1. Create a `.env` file in the root directory.
2. Add the following variables to the `.env` file:
   ```text
   MONGO_URI=<your-mongo-db-uri>
   JWT_SECRET=<your-jwt-secret-key>
   ```

### Running the Application

To start the backend server, run the following command:

```bash
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

The following are the main API routes for managing wallpapers and user authentication:

### Image Routes

- **POST** `/images`: Create a new image entry.
  - Body: `imageName`, `imageUrl`, `description`, `tags`, `size`, `format`, `category`, `resolution`
  - Response: Status 201, Image data

- **GET** `/images`: Get all images.
  - Response: Status 200, List of images

- **GET** `/images/:id`: Get a single image by its ID.
  - Params: `id` (image ID)
  - Response: Status 200, Image data

- **PUT** `/images/:id`: Update an image by its ID.
  - Params: `id` (image ID)
  - Body: `imageName`, `imageUrl`, `description`, `tags`, `size`, `format`, `category`, `resolution`
  - Response: Status 200, Updated image data

- **DELETE** `/images/:id`: Delete an image by its ID.
  - Params: `id` (image ID)
  - Response: Status 200, Deleted image data

- **GET** `/images/category/:category`: Fetch images by category.
  - Params: `category` (category name)
  - Response: Status 200, List of images for the specified category

- **GET** `/images/search`: Search images by name or tags.
  - Query: `query` (search term)
  - Response: Status 200, Search results

- **GET** `/images/paginate`: Paginate images.
  - Query: `page`, `limit` (default values are page=1, limit=10)
  - Response: Status 200, Paginated list of images

### User Routes

- **POST** `/register`: Register a new user.
  - Body: `name`, `email`, `password`
  - Response: Status 201, User data and JWT token

- **POST** `/login`: Log in an existing user.
  - Body: `email`, `password`
  - Response: Status 200, User data and JWT token

- **GET** `/profile`: Get the authenticated user's profile.
  - Protected route, requires JWT token in Authorization header (Bearer token)
  - Response: Status 200, User profile data

- **PUT** `/profile`: Update the authenticated user's profile.
  - Protected route, requires JWT token in Authorization header (Bearer token)
  - Body: `name`, `email`
  - Response: Status 200, Updated user profile

- **DELETE** `/profile`: Delete the authenticated user's account.
  - Protected route, requires JWT token in Authorization header (Bearer token)
  - Response: Status 200, Deletion confirmation

## Folder Descriptions

### `/controllers`

Contains the logic for handling requests and interacting with the models.
- `imageController.js`: Handles the image-related logic for creating, updating, deleting, and fetching images.
- `userController.js`: Handles user registration, login, profile management, and account deletion.

### `/models`

Contains Mongoose schemas.
- `image.js`: Defines the schema for image metadata.
- `user.js`: Defines the schema for user, including name, email, password, etc.

### `/routes`

Contains the API routes.
- `imageRoutes.js`: Defines the routes for image-related operations.
- `userRoutes.js`: Defines the routes for user authentication and profile management.

### `/middleware`

Contains middleware functions for protecting routes.
- `authMiddleware.js`: Middleware that checks for a valid JWT token and attaches the authenticated user to the request object.

### `/utils`

Contains utility functions.
- `pagination.js`: Utility function for paginating the list of images.

### `/config`

Contains the database configuration.
- `db.js`: Configures the connection to the MongoDB database.

### `server.js`

The main entry point of the application, where the Express server is set up, middleware is added, and routes are connected.

## Example Request

### Register User
```bash
POST http://localhost:3000/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Login User
```bash
POST http://localhost:3000/login
Content-Type: application/json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Get User Profile
```bash
GET http://localhost:3000/profile
Authorization: Bearer <your-jwt-token>
```

### Update User Profile
```bash
PUT http://localhost:3000/profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
{
  "name": "Johnathan Doe",
  "email": "johnathan.doe@example.com"
}
```

### Delete User Account
```bash
DELETE http://localhost:3000/profile
Authorization: Bearer <your-jwt-token>
```