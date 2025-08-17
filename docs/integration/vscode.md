# VS Code Integration

Integrate the Spartan NG MCP Server with VS Code for seamless Angular component access.

## 🚀 Quick Setup

### Method 1: Using Continue Extension (Recommended)

1. **Install Continue Extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Continue" and install it

2. **Configure MCP Server**:
   - Open Command Palette (Ctrl+Shift+P)
   - Type "Continue: Configure" and select it
   - Add this configuration to your settings:

```json
{
  "continue.server": {
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
}
```

### Method 2: Using Claude Extension

1. **Install Claude Extension**:
   - Search for "Claude" in VS Code extensions
   - Install the official Claude extension

2. **Configure MCP Server**:
   - Add to your VS Code settings.json:

```json
{
  "claude.mcpServers": {
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

### With Continue Extension

1. **Open Continue Chat** (Ctrl+Shift+L)
2. **Ask for components**:
   ```
   "Show me the Spartan NG button component"
   "Get the card component implementation"
   "List all available Spartan NG components"
   ```

### With Claude Extension

1. **Open Claude Chat** (Ctrl+Shift+L)
2. **Request components**:
   ```
   "Show me the Spartan NG button component source code"
   "Get the dialog component with TypeScript"
   "Show me the card component demo"
   ```

## 🔍 Environment Variable Setup

Instead of hardcoding your token, use environment variables:

```json
{
  "continue.server": {
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
}
```

## 🐛 Troubleshooting

### Extension Not Working

1. **Check if server runs standalone**:
   ```bash
   npx spartan-ng-mcp-server --help
   ```

2. **Verify configuration syntax**:
   - Use a JSON validator
   - Check for missing commas or brackets

3. **Restart VS Code** after configuration changes

4. **Check extension logs**:
   - Open Output panel (View → Output)
   - Select "Continue" or "Claude" from dropdown

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

**"Extension not recognizing MCP server"**:
- Restart VS Code
- Check configuration file location
- Verify JSON syntax

## 🔗 Next Steps

- [Usage Examples](../usage/) - How to use after integration
- [Troubleshooting](../troubleshooting/) - Common issues and solutions
- [API Reference](../api/) - Complete tool reference
- [Other Integrations](README.md) - Connect to other tools 