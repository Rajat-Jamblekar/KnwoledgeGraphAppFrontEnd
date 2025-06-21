# 🌐 Knowledge Graph Application Frontend

> 📊 A modern React application for visualizing and exploring medical knowledge graphs with an intuitive interface.

## ✨ Features

- 🎯 **Interactive Graph Visualization** - Dynamic graph rendering using D3.js
- 🔍 **Smart Query Interface** - Explore medical relationships effortlessly
- 📝 **User-Friendly Forms** - Easy data input and manipulation
- 💅 **Modern UI/UX** - Sleek design with Material-UI components
- 🏥 **Medical Knowledge Graph** - Visualize relationships between symptoms, diseases, treatments, and specialists

## 📊 Data Requirements

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
- 🤒 Symptoms and Diseases
- 💊 Diseases and Treatments
- 👨‍⚕️ Treatments and Medical Specialists

> 📝 **Note:** Make sure the `medical-data.json` file is present in the root directory before running the application.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|----------|
| React | 19.1.0 | UI Framework |
| TypeScript | Latest | Type Safety |
| Vite | 6.3.5 | Build Tool |
| D3.js | Latest | Graph Visualization |
| Material-UI | Latest | UI Components |
| Axios | Latest | API Communication |

## 📋 Prerequisites

Before you begin, ensure you have:

- 📦 Node.js (Latest LTS version)
- 📦 npm (comes with Node.js)

## 🚀 Getting Started

### 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajat-Jamblekar/KnwoledgeGraphAppFrontEnd
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 🏃‍♂️ Running the Application

Start the development server:
```bash
npm run dev
```

> 🌐 Access the application at `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server |
| `npm run build` | 📦 Create production build |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | ✨ Check code quality |

## 📁 Project Structure

```
frontend/
├── medical-data.json    # 📊 Medical knowledge graph data
├── src/                 # Source files
│   ├── components/      # React components
│   │   ├── Graph.tsx   # 📊 Graph visualization
│   │   ├── Header.tsx  # 🎯 App header
│   │   ├── InputForm   # 📝 Data input form
│   │   └── QuerySection# 🔍 Query interface
│   ├── App.tsx         # 🌟 Main component
│   └── main.tsx        # 🚀 Entry point
└── [other files...]    # Configuration files
```

## 👨‍💻 Development Guide

### 🎨 Code Style

We maintain high code quality standards:

```bash
npm run lint  # Run code quality checks
```

### ⚙️ TypeScript Configuration

The project includes three key TypeScript config files:

- `tsconfig.json` - 📝 Base configuration
- `tsconfig.app.json` - 🎯 App-specific settings
- `tsconfig.node.json` - 🔧 Node.js configuration

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

> 📦 Build output will be in the `dist/` directory

## 🤝 Contributing

We welcome contributions! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 Commit your changes
   ```bash
   git commit -m '✨ Add some AmazingFeature'
   ```
4. 📤 Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎯 Open a Pull Request

## 📄 License

[Add your license information here]

---

<div align="center">

🌟 **Found this helpful? Star the repository!** 🌟

Need help? [Open an issue](repository-url/issues)

</div>
