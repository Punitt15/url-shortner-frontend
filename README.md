# URL Shortener Application

A modern web application that allows users to create short URLs from long ones, track clicks, and manage their shortened URLs.

## Features

### Authentication
- User registration and login system
- Secure token-based authentication
- Protected routes for authenticated users
- Automatic redirection to login page for unauthenticated users

### URL Management
- Create short URLs from long URLs
- View list of all shortened URLs
- Track number of clicks for each URL
- Click on short URLs to visit the original URL
- Automatic click tracking

### User Interface

#### Login/Register Page
- Clean and modern authentication forms
- Email and password input fields
- Form validation
- Error message display
- Easy navigation between login and register pages
- Responsive design for all screen sizes

#### Dashboard
The dashboard is divided into two main sections:

1. **URL Shortener Form**
   - Input field for entering long URLs
   - "Shorten" button to generate short URLs
   - Error message display for failed attempts
   - Automatic input clearing after successful shortening
   - Disabled button state when input is empty

2. **URL List**
   - Displays all shortened URLs created by the user
   - Each URL entry shows:
     - The shortened URL (clickable)
     - Number of clicks
   - Click tracking on URL visits
   - "No URLs found" message when list is empty
   - Loading state indicator
   - Error message display for failed API calls

#### Navigation
- Logout button to end the session
- Automatic redirection to login page after logout

### Error Handling
- User-friendly error messages
- Form validation errors
- API error handling
- Authentication error handling
- Automatic redirection on authentication failures

### Security Features
- Token-based authentication
- Secure password handling
- Protected API endpoints
- Automatic session management
- Secure URL redirection

## Technical Stack
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Fetch API for HTTP requests
- Local Storage for token management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Endpoints

The application interacts with the following API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/urls` - Create short URL
- `GET /api/urls/allShortUrl` - Get all user's short URLs
- `GET /api/urls/:shortUrl` - Track URL click and redirect

## UI Components

### AuthForm
- Handles both login and registration
- Form validation
- Error message display
- Responsive design

### UrlShortner
- URL input form
- Error handling
- Success feedback
- Automatic refresh

### UrlList
- Displays shortened URLs
- Click tracking
- Loading states
- Error handling
- Responsive layout

## Styling
The application uses Tailwind CSS for styling with:
- Modern color scheme
- Responsive design
- Hover effects
- Loading states
- Error states
- Clean typography
- Consistent spacing
- Mobile-friendly layout
