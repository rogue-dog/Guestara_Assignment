# Menu Management Backend Server

This project is a Node.js backend server for managing a menu with categories, subcategories, and items.
<br><br>The Postman Collection to test the application is [here](https://www.postman.com/payload-architect-96039570/workspace/guestara-assignment/collection/35034522-20b2d16b-4a65-40ff-b65a-b502a9ded8c4?action=share&creator=35034522).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/menu-management.git
    cd menu-management
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start your MongoDB server.
2. Start the Node.js server:
    ```sh
    node app.js
    ```

The server will run on `https://127.0.0.1:3000`.

## API Endpoints

### Category

- **Create Category**
    ```http
    POST /api/categories
    ```
    **Payload**:
    ```json
    {
        "name": "Category Name",
        "image": "http://example.com/image.jpg",
        "description": "Description",
        "taxApplicability": true,
        "tax": 10,
        "taxType": "percentage"
    }
    ```

- **Get All Categories**
    ```http
    GET /api/categories
    ```

- **Get Category by ID or Name**
    ```http
    GET /api/categories/:identifier
    ```

- **Edit Category**
    ```http
    PUT /api/categories/:id
    ```
    **Payload**:
    ```json
    {
        "name": "Updated Name",
        "image": "http://example.com/updated_image.jpg",
        "description": "Updated Description",
        "taxApplicability": false,
        "tax": 0,
        "taxType": "fixed"
    }
    ```

### Subcategory

- **Create Subcategory**
    ```http
    POST /api/subcategories/:categoryId
    ```
    **Payload**:
    ```json
    {
        "name": "Subcategory Name",
        "image": "http://example.com/image.jpg",
        "description": "Description",
        "taxApplicability": true,
        "tax": 5
    }
    ```

- **Get All Subcategories**
    ```http
    GET /api/subcategories
    ```

- **Get Subcategories by Category**
    ```http
    GET /api/subcategories/category/:categoryId
    ```

- **Get Subcategory by ID or Name**
    ```http
    GET /api/subcategories/:identifier
    ```

- **Edit Subcategory**
    ```http
    PUT /api/subcategories/:id
    ```
    **Payload**:
    ```json
    {
        "name": "Updated Name",
        "image": "http://example.com/updated_image.jpg",
        "description": "Updated Description",
        "taxApplicability": false,
        "tax": 0
    }
    ```

### Item

- **Create Item**
    ```http
    POST /api/items
    ```
    **Payload**:
    ```json
    {
        "name": "Item Name",
        "image": "http://example.com/image.jpg",
        "description": "Description",
        "taxApplicability": true,
        "tax": 2,
        "baseAmount": 100,
        "discount": 10,
        "category": "Category ID",
        "subCategory": "Subcategory ID"
    }
    ```

- **Get All Items**
    ```http
    GET /api/items
    ```

- **Get Items by Category**
    ```http
    GET /api/items/category/:categoryId
    ```

- **Get Items by Subcategory**
    ```http
    GET /api/items/subcategory/:subCategoryId
    ```

- **Get Item by ID or Name**
    ```http
    GET /api/items/:identifier
    ```

- **Edit Item**
    ```http
    PUT /api/items/:id
    ```
    **Payload**:
    ```json
    {
        "name": "Updated Name",
        "image": "http://example.com/updated_image.jpg",
        "description": "Updated Description",
        "taxApplicability": false,
        "tax": 0,
        "baseAmount": 90,
        "discount": 5
    }
    ```

### Search

- **Search Items by Name**
    ```http
    GET /api/items/search/:name
    ```
