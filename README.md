# 🌐 Knowledge Graph Application Frontend

>  A modern React application for visualizing and exploring medical knowledge graphs with an intuitive interface.

## Features

-  **Interactive Graph Visualization** - Dynamic graph rendering using D3.js
- **Smart Query Interface** - Explore medical relationships effortlessly
-  **User-Friendly Forms** - Easy data input and manipulation
- **Modern UI/UX** - Sleek design with Material-UI components
-  **Medical Knowledge Graph** - Visualize relationships between symptoms, diseases, treatments, and specialists

##  Data Requirements

### medical-data.json

The application requires a `medical-data.json` file in the root directory. This file contains the knowledge graph data with the following structure:

```json
{
  "source": "Symptom/Disease/Treatment",
  "relation": "indicates/treated by/prescribed by",
  "target": "Disease/Treatment/Specialist",
  "source_type": "Type of the source node",
  "target_type": "Type of the target node"
}
```

The data includes relationships between:
-  Symptoms and Diseases
-  Diseases and Treatments
- Treatments and Medical Specialists


##  Tech Stack

| Technology | Version | Purpose |
|------------|---------|----------|
| React | 19.1.0 | UI Framework |
| TypeScript | Latest | Type Safety |
| Vite | 6.3.5 | Build Tool |
| D3.js | Latest | Graph Visualization |
| Material-UI | Latest | UI Components |
| Axios | Latest | API Communication |

##  Prerequisites

Before you begin, ensure you have:

-  Node.js (Latest LTS version)
-  npm (comes with Node.js)

## Getting Started

###  Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajat-Jamblekar/KnwoledgeGraphAppFrontEnd
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

###  Running the Application

Start the development server:
```bash
npm run dev
```

>  Access the application at `http://localhost:5173`

