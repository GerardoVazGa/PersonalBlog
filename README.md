# techBlog

A comprehensive personal blog platform built with Node.js, Express, and PostgreSQL. Features a complete content management system with user authentication, comment system, file uploads, and responsive design.

## 🚀 Features

- **🔐 Authentication System**: JWT-based admin authentication with secure cookie storage
- **📝 Post Management**: Full CRUD operations for blog posts with rich text content
- **💬 Advanced Comment System**:
  - Hierarchical nested comments
  - Like/dislike functionality
  - Anonymous commenting with user ID tracking
  - Comment moderation (approved/rejected status)
- **🏷️ Tagging & Categories**: Organize content with tags and categories
- **📤 File Upload System**:
  - Image uploads for posts
  - Temporary file storage with cleanup
  - File management utilities
- **🔍 Search Functionality**: Search posts by title and content
- **📄 Pagination**: Efficient navigation through large content lists
- **👨‍💼 Admin Panel**: Dedicated interface for content management
- **📱 Responsive Design**: Mobile-first approach with modern CSS
- **🛡️ Security Features**:
  - HTML sanitization with DOMPurify
  - SQL injection prevention
  - XSS protection
  - Secure file uploads

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Advanced relational database
- **JWT (jsonwebtoken)** - Token-based authentication
- **Multer** - File upload handling middleware
- **DOMPurify** - HTML sanitization and XSS prevention
- **JSDOM** - DOM manipulation for content processing
- **UUID** - Unique identifier generation

### Frontend
- **EJS** - Embedded JavaScript templating
- **CSS3** - Modern styling with responsive design
- **JavaScript (ES6+)** - Client-side interactivity
- **Font Awesome** - Icon library

### Development Tools
- **Nodemon** - Development server with auto-restart
- **Dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (version 16 or higher)
- PostgreSQL (version 12 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd techBlog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the project root:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=techblog
   DB_PORT=5432
   ADMIN_PASS=your_admin_password
   SECRET_JWT_KEY=your_jwt_secret_key
   EXPIRES_JWT_IN=1h
   UPLOAD_PATH=./public/uploads
   ```

4. **Database Setup:**
   - Create a PostgreSQL database named `techblog`
   - Ensure the database user has appropriate permissions
   - The application will create tables automatically on first run

5. **Start the application:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Architecture

```
techBlog/
├── src/
│   ├── configs/           # Configuration files (DB, JWT, uploads)
│   │   ├── db_config.js          # Database connection settings
│   │   ├── jwt_config.js         # JWT configuration
│   │   ├── uploads_config.js     # File upload configuration
│   │   └── env.js                # Environment variables
│   ├── controllers/       # Route handlers (MVC pattern)
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── posts.controller.js   # Post CRUD operations
│   │   ├── comments.controller.js # Comment management
│   │   ├── category.controller.js # Category operations
│   │   └── upload.controller.js   # File upload handling
│   ├── db/                # Database connection
│   │   └── db.js                 # PostgreSQL connection pool
│   ├── middlewares/       # Express middlewares
│   │   ├── isAdmin.middleware.js      # Admin authorization
│   │   ├── loggedAdmin.middleware.js  # JWT authentication
│   │   ├── useCategories.middleware.js # Category data injection
│   │   └── assignAnonId.middleware.js # Anonymous user tracking
│   ├── models/            # Data access layer
│   │   ├── post.model.js         # Post database operations
│   │   ├── comments.model.js     # Comment database operations
│   │   ├── category.model.js     # Category database operations
│   │   └── tags.model.js         # Tag database operations
│   ├── routes/            # API route definitions
│   │   ├── views.routes.js       # Frontend page routes
│   │   ├── posts.routes.js       # Post API endpoints
│   │   ├── auth.routes.js        # Authentication routes
│   │   ├── comments.routes.js    # Comment API endpoints
│   │   ├── categories.routes.js  # Category routes
│   │   ├── uploads.routes.js     # File upload routes
│   │   └── admin.routes.js       # Admin panel routes
│   ├── services/          # Business logic layer
│   │   ├── auth.service.js       # Authentication services
│   │   ├── post.service.js       # Post business logic
│   │   ├── comments.service.js   # Comment services
│   │   ├── category.service.js   # Category services
│   │   └── upload.service.js     # File upload services
│   ├── utils/             # Utility functions
│   │   ├── slugify.js            # URL slug generation
│   │   ├── sanatizer.js          # Content sanitization
│   │   ├── formatDate.js         # Date formatting
│   │   ├── pagination.js         # Pagination utilities
│   │   ├── buildCommentsTree.js  # Comment hierarchy building
│   │   ├── generatePreview.js    # Post preview generation
│   │   ├── fileUtils.js          # File system operations
│   │   ├── replaceTempToPosts.js # File path management
│   │   └── toDeleteOldImageCont.js # Image cleanup utilities
│   ├── views/             # EJS templates
│   │   ├── partials/             # Reusable components
│   │   │   ├── header.ejs        # Site header
│   │   │   ├── footer.ejs        # Site footer
│   │   │   ├── scripts.ejs       # JavaScript includes
│   │   │   └── *.ejs             # Other partials
│   │   └── *.ejs                 # Main page templates
│   └── index.js           # Application entry point
├── public/
│   ├── javascript/        # Client-side JavaScript
│   ├── styles/            # CSS stylesheets
│   │   ├── base/                 # Base styles (resets, variables)
│   │   ├── components/           # Component-specific styles
│   │   └── layouts/              # Layout styles
│   └── uploads/           # User-uploaded files
│       ├── postsFiles/           # Post images
│       └── tempFiles/            # Temporary uploads
├── package.json
├── README.md
└── .env.example          # Environment template
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout

### Posts (Admin Only)
- `GET /api/posts/search` - Search posts
- `GET /api/posts/:id` - Get post by ID (JSON)
- `POST /api/posts` - Create new post (with file upload)
- `PUT /api/posts/:id` - Update post (with optional file upload)
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments/:postId` - Get comments for a post
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id/like` - Like/unlike a comment

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category (admin only)

### File Uploads
- `POST /api/uploads/temp` - Upload temporary file
- `POST /api/uploads/posts` - Move temp file to posts directory

### Frontend Views
- `GET /` - Home page with recent posts
- `GET /blog` - All posts list (paginated)
- `GET /blog/page/:page` - Posts list by page
- `GET /blog/category/:category` - Posts by category
- `GET /blog/category/:category/page/:page` - Category posts by page
- `GET /post/:slug` - Individual post view
- `GET /about` - About page
- `GET /admin/posts/new` - Create new post (admin)
- `GET /admin/posts/:id/edit` - Edit post (admin)

## 📜 Available Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (not implemented)
```

## 🔐 Authentication & Security

### JWT Authentication
- Tokens stored in HTTP-only cookies for security
- Configurable token expiration
- Admin-only access control for content management

### Content Security
- HTML sanitization using DOMPurify
- XSS prevention
- SQL injection protection via parameterized queries
- File upload validation and security

### User Tracking
- Anonymous user identification for comment likes
- Session-based admin authentication

## 💬 Comment System

### Features
- **Hierarchical Structure**: Nested replies up to multiple levels
- **Like System**: Users can like/unlike comments
- **Anonymous Support**: Comments without user accounts
- **Moderation**: Approved/rejected comment status
- **Content Validation**: Length limits and sanitization

### Technical Implementation
- Tree structure building algorithm
- Like tracking with user identification
- Real-time like count updates

## 📤 File Management

### Upload Process
1. Files uploaded to temporary directory
2. Validation and processing
3. Move to permanent location on post creation
4. Automatic cleanup of unused temporary files

### Supported Features
- Image optimization and resizing
- File type validation
- Secure file naming
- Path management utilities

## 🎨 Frontend Architecture

### Template System
- EJS templating with partials for reusability
- Dynamic navigation highlighting
- Responsive design patterns

### Styling Organization
- **Base**: CSS resets, variables, typography
- **Components**: Reusable UI components (buttons, cards, forms)
- **Layouts**: Page-specific layouts and sections

### JavaScript Features
- Dynamic form handling
- AJAX requests for interactive features
- Modal management
- Search functionality

## 🚀 Deploy

**TechBlog** - [TechBlog](https://techblog-e5zd.onrender.com)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**GerardoVazGa** - [GitHub](https://github.com/GerardoVazGa)

---

Thanks for using techBlog! If you have any questions or suggestions, feel free to open an issue.
