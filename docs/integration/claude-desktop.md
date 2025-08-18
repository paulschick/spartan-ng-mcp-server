# Claude Desktop Integration

Integrate the Spartan NG MCP Server with Claude Desktop for seamless component access.

## 🚀 Quick Setup

### Method 1: Configuration File

Add to your Claude Desktop configuration (`~/.config/Claude/claude_desktop_config.json`):

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

### Method 2: Environment Variable

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

## ✅ Restart Claude Desktop

After editing your configuration file, restart Claude Desktop to load the MCP server.

## 🎯 Usage Examples

### Component Requests

```
"Show me the Spartan NG button component source code"
"Get the card component with usage examples"
"List all available Spartan NG components"
```

### Component Metadata

```
"Get metadata for the button component"
"Show me the dependencies for the card component"
"Get the directory structure for Spartan NG"
```

## 🔍 Configuration File Location

### macOS
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Linux
```
~/.config/Claude/claude_desktop_config.json
```

### Windows
```
%APPDATA%\Claude\claude_desktop_config.json
```

## 🐛 Troubleshooting

### Claude Desktop Not Recognizing MCP Server

1. **Verify server runs standalone**:
   ```bash
   npx spartan-ng-mcp-server --help
   ```

2. **Check configuration file location**:
   - Ensure file is in the correct directory
   - Verify file permissions

3. **Restart Claude Desktop** after configuration changes

4. **Check configuration syntax**:
   - Validate JSON format
   - Check for missing commas or brackets

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

**"Configuration not loaded"**:
- Check file path and permissions
- Restart Claude Desktop
- Verify JSON syntax

## 🔗 Next Steps

- [Usage Examples](../usage/) - How to use after integration
- [Troubleshooting](../troubleshooting/) - Common issues and solutions
- [API Reference](../api/) - Complete tool reference
- [Other Integrations](README.md) - Connect to other tools 