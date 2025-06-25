# Shopping List

A full-stack web application built with ASP.NET Core Web API backend and React TypeScript frontend, featuring modern UI components and state management.

**🌐 Live Demo**
- **Frontend**: https://shopping-list-gray-kappa.vercel.app
- **Backend API**: https://shopping-list-production-3dc5.up.railway.app

## 🏗️ Architecture

* **Backend**: ASP.NET Core 8 Web API with PostgreSQL database
* **Frontend**: React with TypeScript, Material-UI components, and Redux Toolkit for state management

## 📁 Project Structure

```
├── backend/          # ASP.NET Core 8 Web API
└── frontend/         # React TypeScript application
```

## 🚀 Getting Started

### Prerequisites

* .NET 8 SDK
* Node.js (version 16 or higher)
* PostgreSQL

### Backend Setup

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Restore NuGet packages:**

```bash
dotnet restore
```

3. **Configure the database connection:**
   * Create `appsettings.Development.json` in the backend root directory:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=YOUR_DATABASE_NAME;Username=YOUR_USERNAME;Password=YOUR_PASSWORD"
  }
}
```

**Connection String Examples:**
   * **Local PostgreSQL**: `Host=localhost;Port=5432;Database=ShoppingListDb;Username=postgres;Password=yourpassword`
   * **With SSL**: `Host=localhost;Port=5432;Database=ShoppingListDb;Username=postgres;Password=yourpassword;SSL Mode=Require`
   * **Railway PostgreSQL**: Use the provided DATABASE_URL environment variable

4. **Apply database migrations:**

```bash
# Create a new migration (if needed)
dotnet ef migrations add InitialCreate

# Update the database
dotnet ef database update
```

5. **Run the backend:**

```bash
dotnet run
```

The API will be available at `https://localhost:7059` (or the port specified in your launch settings).

### Frontend Setup

1. **Navigate to the frontend directory:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**
   * Create a `.env` file in the frontend root directory:

```env
REACT_APP_API_BASE_URL=https://localhost:7059
```

Replace `https://localhost:7059` with your backend API URL. For production, you can use:
```env
REACT_APP_API_BASE_URL=https://shopping-list-production-3dc5.up.railway.app
```

4. **Start the development server:**

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## 🛠️ Development

### Backend Commands

```bash
# Restore packages
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run

# Create a new migration
dotnet ef migrations add MigrationName

# Update database with migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

### Frontend Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📋 Configuration Files

### Backend Configuration
* `appsettings.json` - Production configuration (committed to repo)
* `appsettings.Development.json` - Development configuration (create locally, not committed)

### Frontend Configuration
* `.env` - Environment variables (create locally, not committed)
* `.env.example` - Example environment file (committed to repo)

## 🔧 Technologies Used

### Backend
* ASP.NET Core 8
* Entity Framework Core
* PostgreSQL
* Npgsql (PostgreSQL provider for .NET)
* Web API

### Frontend
* React 18
* TypeScript
* Material-UI (MUI)
* Redux Toolkit
* React Router

## 🚀 Deployment

### Backend (Railway)
- Deployed on Railway with PostgreSQL database
- Environment variables configured for production
- SSL connection to PostgreSQL database

### Frontend (Vercel)
- Deployed on Vercel with automatic GitHub integration
- Environment variables configured to point to Railway backend
- Optimized build for production

## 📝 Notes

* Make sure PostgreSQL is running before starting the backend
* The backend uses Entity Framework migrations for database schema management
* Environment-specific configuration files are not tracked in Git for security reasons
* Default API port is 7059, default React port is 3000
* PostgreSQL connection requires proper SSL configuration in production environments