# First Steps

Now that you have the Spartan NG MCP Server installed, let's make your first component request!

## 🚀 Quick Test

### 1. Start the Server

```bash
# Basic start (Angular/Spartan NG)
npx spartan-ng-mcp-server

# With GitHub token (recommended)
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here
```

### 2. Verify Server is Running

You should see output like:
```
INFO: MCP Server starting...
INFO: MCP Server configured for ANGULAR framework
INFO: Repository: goetzrobin/spartan
INFO: File extension: .ts
INFO: MCP Server ready
```

## 🎯 Your First Component Request

Once the server is running, you can ask your AI assistant to:

### Get a Component

```
"Show me the source code for the Spartan NG button component"
```

### List Available Components

```
"List all available Spartan NG components"
```

### Get Component Demo

```
"Show me how to use the Spartan NG card component"
```

### Get Component Metadata

```
"What are the dependencies for the Spartan NG dialog component?"
```

## 🔍 Exploring the Repository

### Browse Directory Structure

```
"Show me the structure of the Spartan NG repository"
```

### Explore Specific Paths

```
"Show me the libs/helm directory structure"
```

## 💡 Example Conversations

### Building a Login Form

**You**: "Help me build a login form using Spartan NG components"

**AI Assistant**: *Can now access all form-related components, their Angular source code, and usage examples*

### Creating a Dashboard

**You**: "Create a dashboard using Spartan NG components"

**AI Assistant**: *Can retrieve complete component implementations and customize them for your Angular needs*

### Angular Component Learning

**You**: "Show me how Spartan NG components work with Angular directives"

**AI Assistant**: *Can demonstrate Angular-specific patterns and directive usage*

## 🔧 Integration Examples

### VS Code with Continue Extension

1. **Install Continue Extension** in VS Code
2. **Configure MCP Server** in settings
3. **Ask questions** directly in your editor

### Claude Desktop

1. **Add MCP Server** to Claude Desktop configuration
2. **Start conversation** with Claude
3. **Request components** naturally

### Cursor

1. **Configure MCP Server** in Cursor settings
2. **Use AI features** with shadcn/ui access
3. **Generate code** with proper components

## 🅰️ Angular-Specific Examples

### Component Source Code

```
"Show me the Angular button component with TypeScript"
"Get the card component with Angular directives"
"List all Spartan NG components with Angular patterns"
```

### Directive Usage

```
"Show me how to use hlmBtn directive"
"Get examples of Spartan NG directive patterns"
"Show me Angular component composition examples"
```

### TypeScript Integration

```
"Show me TypeScript interfaces for Spartan NG components"
"Get strongly-typed component examples"
"Show me Angular dependency injection patterns"
```

## 🔗 Next Steps

- [Integration](../integration/) - Connect to your preferred editor or tool
- [Usage Examples](../usage/) - More detailed examples and tutorials
- [API Reference](../api/) - Complete tool reference
- [Troubleshooting](../troubleshooting/) - Common issues and solutions

## 🎯 Success Indicators

You'll know it's working when:

- ✅ Server starts without errors
- ✅ AI assistant can retrieve component source code
- ✅ Component code includes proper imports and dependencies
- ✅ Angular-specific syntax is correct
- ✅ TypeScript interfaces are included

## 🐛 Common First-Time Issues

### Server Won't Start
```bash
# Check Node.js version
node --version  # Should be 18+

# Check if npx is available
npx --version
```

### Rate Limit Errors
```bash
# Add GitHub token
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here
```

### Component Not Found
```bash
# Check available components first
# Ask AI assistant: "List all available Spartan NG components"
```

### Server Configuration Issues
```bash
# Verify server configuration
npx spartan-ng-mcp-server --help
``` 