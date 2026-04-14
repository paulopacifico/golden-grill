# Golden Grill — Technical Specification

## Overview

Golden Grill is a burger shop platform composed of a RESTful ASP.NET Core 8 Web API backend and an Angular 18+ standalone frontend, containerized via Docker and deployed to a Hostinger VPS.

---

## Repository & Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Root docs, Docker Compose, shared config |
| `GoldenGrill.Api` | ASP.NET Core 8 Web API |
| `GoldenGrill-Web` | Angular 18 standalone frontend |

---

## Backend — GoldenGrill.Api

### Tech Stack

| Concern | Choice |
|---|---|
| Framework | ASP.NET Core 8 Web API |
| ORM | Entity Framework Core 8 |
| Database | SQLite |
| Container | Docker (mcr.microsoft.com/dotnet/aspnet:8.0) |

### Project Structure

```
GoldenGrill.Api/
├── Controllers/
│   └── ProductsController.cs
├── Data/
│   └── AppDbContext.cs
├── Models/
│   └── Product.cs
├── Migrations/
├── GoldenGrill.Api.csproj
├── Program.cs
└── Dockerfile
```

### Database Schema

#### Table: Products

| Column | Type | Constraints |
|---|---|---|
| Id | INTEGER | PRIMARY KEY, AUTOINCREMENT |
| Name | TEXT | NOT NULL |
| Description | TEXT | NOT NULL |
| Price | REAL | NOT NULL |
| ImageUrl | TEXT | NOT NULL |

### API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Response |
|---|---|---|---|
| GET | `/products` | List all products | `200 Product[]` |
| GET | `/products/{id}` | Get product by ID | `200 Product` / `404` |
| POST | `/products` | Create new product | `201 Product` |
| PUT | `/products/{id}` | Update product | `204` / `404` |
| DELETE | `/products/{id}` | Delete product | `204` / `404` |

### Product Model

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
```

### Seed Data (3 burgers)

| Name | Description | Price |
|---|---|---|
| Classic Smash | Double smash patty, cheddar, pickles, mustard | 29.90 |
| BBQ Bacon Crunch | Crispy bacon, BBQ sauce, onion rings, cheddar | 34.90 |
| Spicy Jalapeño | Jalapeños, pepper jack, chipotle mayo, lettuce | 31.90 |

### CORS Policy

Allow all origins in development; restrict to frontend origin in production.

---

## Frontend — GoldenGrill-Web

### Tech Stack

| Concern | Choice |
|---|---|
| Framework | Angular 18+ (Standalone) |
| Styling | Tailwind CSS v3 |
| HTTP | Angular HttpClient |
| Container | Docker (Nginx alpine) |

### Project Structure

```
GoldenGrill-Web/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       └── product.service.ts
│   │   ├── features/
│   │   │   └── products/
│   │   │       ├── product-list/
│   │   │       │   ├── product-list.component.ts
│   │   │       │   └── product-list.component.html
│   │   │       └── product-card/
│   │   │           ├── product-card.component.ts
│   │   │           └── product-card.component.html
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.routes.ts
│   ├── styles.css
│   └── index.html
├── tailwind.config.js
├── angular.json
├── Dockerfile
└── nginx.conf
```

### Key Components

| Component | Responsibility |
|---|---|
| `AppComponent` | Root shell, navbar |
| `ProductListComponent` | Fetch & display all products |
| `ProductCardComponent` | Renders a single product card |
| `ProductService` | HTTP calls to the API |

### Routes

| Path | Component |
|---|---|
| `/` | `ProductListComponent` |
| `/products/:id` | `ProductDetailComponent` (future) |

### Environment Config

```ts
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

---

## Docker Strategy

### Backend Dockerfile (multi-stage)

- Stage 1: `mcr.microsoft.com/dotnet/sdk:8.0` — build & publish
- Stage 2: `mcr.microsoft.com/dotnet/aspnet:8.0` — runtime

### Frontend Dockerfile (multi-stage)

- Stage 1: `node:20-alpine` — `ng build`
- Stage 2: `nginx:alpine` — serve `/dist`

### Docker Compose (root, future)

```yaml
services:
  api:
    build: ./GoldenGrill.Api
    ports: ["5000:8080"]
  web:
    build: ./GoldenGrill-Web
    ports: ["4200:80"]
```

---

## Deployment (Hostinger VPS)

1. SSH into VPS
2. Clone repo
3. `docker compose up -d --build`
4. Nginx reverse proxy on VPS routes domains to containers

---

## Git Commit Convention

```
<type>(<scope>): <short description>
```

| Type | Usage |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Config/tooling |
| `docs` | Documentation |
