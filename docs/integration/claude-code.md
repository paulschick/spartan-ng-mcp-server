# Claude Code Integration

Integrate the Spartan NG MCP Server with Claude Code terminal for command-line AI development.

## 🚀 Quick Setup

### Method 1: Direct Command

For Claude Code terminal users, you can add the MCP server directly:

```bash
# Add the Spartan NG MCP server with GitHub token
claude mcp add spartan-ng -- bunx -y spartan-ng-mcp-server --github-api-key YOUR_API_KEY
```

### Method 2: Configuration File

Add to your Claude Code configuration:

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

## 🎯 Usage Examples

### Component Requests

```
"Show me the Spartan NG button component source code"
"Get the card component with usage examples"
"List all available Spartan NG components"
```

### Angular Development

```
"Show me the Angular button component implementation"
"Get the dialog component with TypeScript"
"Show me how to use the card component in Angular"
```

## 🔧 Environment Variable Setup

Use environment variables for better security:

```bash
# Set environment variable
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here

# Add MCP server without hardcoding token
claude mcp add spartan-ng -- bunx -y spartan-ng-mcp-server
```

## 🐛 Troubleshooting

### Claude Code Not Recognizing MCP Server

1. **Verify server runs standalone**:
   ```bash
   npx spartan-ng-mcp-server --help
   ```

2. **Check command syntax**:
   - Ensure proper spacing and quotes
   - Verify GitHub token is valid

3. **Restart Claude Code** after adding MCP server

4. **Check Claude Code logs** for error messages

### Common Issues

**"Command not found"**:
```bash
# Ensure npx is available
npx --version
```

**"Rate limit exceeded"**:
```bash
# Add GitHub token to command
```

**"MCP server not recognized"**:
- Restart Claude Code
- Check command syntax
- Verify token is valid

## 🔗 Next Steps

- [Usage Examples](../usage/) - How to use after integration
- [Troubleshooting](../troubleshooting/) - Common issues and solutions
- [API Reference](../api/) - Complete tool reference
- [Other Integrations](README.md) - Connect to other tools 