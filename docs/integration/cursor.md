# Cursor Integration

Integrate the Spartan NG MCP Server with Cursor for AI-powered Angular component development.

## 🚀 Quick Setup

### Method 1: Global Configuration

1. **Open Cursor Settings**:
   - Go to Settings (Cmd/Ctrl + ,)
   - Search for "MCP" or "Model Context Protocol"

2. **Add MCP Server Configuration**:

```json
{
  "mcpServers": {
    "spartan-ng": {
      "command": "npx",
      "args": [
        "spartan-ng-mcp-server",
        "--github-api-key",
        "ghp_your_token_here"
      ]
    }
  }
}
```

### Method 2: Workspace Configuration

Create a `.cursorrules` file in your project root:

```json
{
  "mcpServers": {
    "spartan-ng": {
      "command": "npx",
      "args": ["spartan-ng-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

## 🎯 Usage Examples

### Chat with AI

1. **Open Cursor Chat** (Cmd/Ctrl + L)
2. **Ask for components**:
   ```
   "Show me the Spartan NG button component"
   "Get the card component implementation"
   "List all available Spartan NG components"
   ```

### Code Generation

1. **Use Cursor's AI features**:
   ```
   "Generate a login form using Spartan NG components"
   "Create an Angular dashboard with Spartan NG"
   "Show me how to use the dialog component in Angular"
   ```

### Angular Development

```
"Show me the Angular button component with TypeScript"
"Get the card component demo for Angular"
"Generate an Angular form using Spartan NG components"
```

## 🔍 Environment Variable Setup

Use environment variables for better security:

```json
{
  "mcpServers": {
    "spartan-ng": {
      "command": "npx",
      "args": ["spartan-ng-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

## 🐛 Troubleshooting

### MCP Server Not Working

1. **Verify server runs standalone**:
   ```bash
   npx spartan-ng-mcp-server --help
   ```

2. **Check configuration syntax**:
   - Validate JSON format
   - Check for missing commas or brackets

3. **Restart Cursor** after configuration changes

4. **Check Cursor logs** for error messages

### Common Issues

**"Command not found"**:
```bash
# Ensure npx is available
npx --version
```

**"Rate limit exceeded"**:
```bash
# Add GitHub token to configuration
```

**"MCP server not recognized"**:
- Restart Cursor
- Check configuration file location
- Verify JSON syntax

## 🔗 Next Steps

- [Usage Examples](../usage/) - How to use after integration
- [Troubleshooting](../troubleshooting/) - Common issues and solutions
- [API Reference](../api/) - Complete tool reference
- [Other Integrations](README.md) - Connect to other tools 