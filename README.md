# Spartan NG MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **🚀 The fastest way to integrate Spartan NG Angular components into your AI workflow**

A Model Context Protocol (MCP) server that provides AI assistants with comprehensive access to [Spartan NG](https://www.spartan.ng/) Angular components, demos, and metadata. Seamlessly retrieve TypeScript implementations for your AI-powered Angular development workflow.

## ✨ Key Features

- **🎯 Angular-First Design** - Built specifically for Angular and Spartan NG components
- **📦 Component Source Code** - Latest Spartan NG TypeScript source from `libs/helm/`
- **🎨 Component Demos** - Angular component implementations and usage patterns  
- **📋 Metadata Access** - Dependencies, descriptions, and Angular-specific configuration
- **🔍 Directory Browsing** - Explore Spartan NG repository structure
- **⚡ Smart Caching** - Efficient GitHub API integration with rate limit handling
- **🅰️ Angular Optimized** - Designed for Angular projects with TypeScript

## 🚀 Quick Start

```bash
# Basic usage (60 requests/hour)
npx spartan-ng-mcp-server

# With GitHub token (5000 requests/hour) - Recommended
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here

# Angular development mode
npx spartan-ng-mcp-server --dev
```

**🎯 Get your GitHub token in 2 minutes**: Create a GitHub Personal Access Token with no scopes needed at [https://github.com/settings/tokens](https://github.com/settings/tokens)

## 📚 Available Tools

| Tool                          | Description                                          |
|-------------------------------|------------------------------------------------------|
| `spartan_list_components`     | List all available Spartan NG components            |
| `spartan_get_component`       | Get component source code and implementation        |
| `spartan_get_component_demo`  | Get component demo and usage examples               |
| `spartan_get_component_metadata` | Get component metadata and dependencies          |
| `spartan_get_directory_structure` | Browse Spartan NG repository structure          |

## 🅰️ Angular Integration

This MCP server is designed specifically for Angular development with Spartan NG:

| Feature                    | Description                                                    |
|----------------------------|----------------------------------------------------------------|
| **Component Library**      | [Spartan NG](https://www.spartan.ng/) - Angular UI primitives |
| **Repository**             | [goetzrobin/spartan](https://github.com/goetzrobin/spartan)   |
| **Component Path**         | `libs/helm/` directory structure                               |
| **File Format**            | TypeScript (.ts) with Angular decorators                      |
| **Styling**                | CSS/SCSS with Angular-specific patterns                       |

## 🛠️ Essential Setup

### 1. Get GitHub Token (Recommended)
```bash
# Visit: https://github.com/settings/tokens
# Generate token with no scopes needed for public repository access
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

### 2. Run Server
```bash
# Basic server start
npx spartan-ng-mcp-server

# With GitHub token for higher rate limits
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here

# Development mode with verbose logging
npx spartan-ng-mcp-server --dev --verbose
```

### 3. Integrate with Your AI Assistant
- **Claude Desktop**: Add server configuration to MCP settings
- **VS Code Extensions**: Configure MCP client extensions  
- **AI Development Tools**: Connect via Model Context Protocol
- **Custom Integrations**: Use MCP SDK for custom implementations

## 🎯 Use Cases

- **AI-Powered Angular Development** - Let AI assistants build UIs with Spartan NG components
- **Component Discovery** - Explore available Angular components and their usage patterns
- **Angular Learning** - Study modern Angular component implementations and best practices
- **Rapid Prototyping** - Get complete Angular component implementations for fast development
- **Code Generation** - Generate Angular component code with proper TypeScript types and dependencies
- **Migration Assistance** - Help migrate from other UI libraries to Spartan NG

## 📦 Installation

```bash
# Global installation (optional)
npm install -g spartan-ng-mcp-server

# Or use npx (recommended)
npx spartan-ng-mcp-server

# Development installation
git clone https://github.com/your-org/spartan-ng-mcp-server
cd spartan-ng-mcp-server
npm install
npm run build
npm start
```

## 🔗 Quick Links

- 🅰️ [Spartan NG Documentation](https://www.spartan.ng/)
- 📂 [Spartan NG Repository](https://github.com/goetzrobin/spartan)
- 🔧 [Model Context Protocol](https://spec.modelcontextprotocol.io/)
- 🚀 [Angular Documentation](https://angular.dev/)
- 💬 [Issues & Support](https://github.com/your-org/spartan-ng-mcp-server/issues)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **[Robin Goetz](https://github.com/goetzrobin)** - For the amazing Spartan NG Angular component library
- **[Spartan NG Team](https://github.com/goetzrobin/spartan)** - For the excellent Angular UI primitives
- **[Angular Team](https://angular.dev/)** - For the powerful Angular framework
- **[Anthropic](https://anthropic.com)** - For the Model Context Protocol specification

---

**Built for the Angular community with ❤️**

**Star ⭐ this repo if you find it helpful for your Angular projects!**
