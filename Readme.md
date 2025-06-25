# Shopping List

A full-stack web application built with ASP.NET Core Web API backend and React TypeScript frontend, featuring modern UI components and state management.

## 🏗️ Architecture

- **Backend**: ASP.NET Core 8 Web API with SQL Server database
- **Frontend**: React with TypeScript, Material-UI components, and Redux Toolkit for state management

## 📁 Project Structure

```
├── backend/          # ASP.NET Core 6 Web API
└── frontend/         # React TypeScript application
```

## 🚀 Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server Express

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
   - Create `appsettings.Development.json` in the backend root directory:
   ```json
   {
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft.AspNetCore": "Warning"
       }
     },
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=YOUR_DATABASE_NAME;Encrypt=False;Trusted_Connection=True;TrustServerCertificate=True;"
     }
   }
   ```
   
   **Connection String Examples:**
   - **Windows Authentication**: `Server=localhost;Database=YourDbName;Encrypt=False;Trusted_Connection=True;TrustServerCertificate=True;`
   - **SQL Server Authentication**: `Server=localhost;Database=YourDbName;User Id=your_username;Password=your_password;Encrypt=False;TrustServerCertificate=True;`
   - **SQL Server Express**: `Server=localhost\\SQLEXPRESS;Database=YourDbName;Encrypt=False;Trusted_Connection=True;TrustServerCertificate=True;`

4. **Apply database migrations:**
   ```bash
   # Create a new migration (if needed)
   dotnet ef migrations add InitialCreate
   
   # Update the database
   dotnet ef database update
   ```
   
5. **Build the backend**
   ```bash
   dotnet build
   ```

6. **Run the backend:**
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
   - Create a `.env` file in the frontend root directory:
   ```env
   REACT_APP_API_BASE_URL=https://localhost:7059
   ```
   
   Replace `https://localhost:7059` with your backend API URL.

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

```

## 📋 Configuration Files

### Backend Configuration
- `appsettings.json` - Production configuration (committed to repo)
- `appsettings.Development.json` - Development configuration (create locally, not committed)

### Frontend Configuration
- `.env` - Environment variables (create locally, not committed)
- `.env.example` - Example environment file (committed to repo)

## 🔧 Technologies Used

### Backend
- ASP.NET Core 8
- Entity Framework Core
- SQL Server
- Web API

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- React Router

## 📝 Notes

- Make sure SQL Server is running before starting the backend
- The backend uses Entity Framework migrations for database schema management
- Environment-specific configuration files are not tracked in Git for security reasons
- Default API port is 7059, default React port is 3000

