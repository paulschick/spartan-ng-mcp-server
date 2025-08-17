# Installation

This guide covers how to install and run the Spartan NG MCP Server.

## 🚀 Quick Installation

### Using npx (Recommended)

The fastest way to get started - no installation required!

```bash
# Basic usage (rate limited to 60 requests/hour)
npx spartan-ng-mcp-server

# With GitHub token for better rate limits (5000 requests/hour)
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here

# Short form
npx spartan-ng-mcp-server -g ghp_your_token_here
```

### Global Installation (Optional)

If you plan to use the server frequently, you can install it globally:

```bash
# Install globally
npm install -g spartan-ng-mcp-server

# Run from anywhere
spartan-ng-mcp-server --github-api-key ghp_your_token_here
```

## 🔧 Command Line Options

```bash
spartan-ng-mcp-server [options]

Options:
  --github-api-key, -g <token>    GitHub Personal Access Token
  --help, -h                      Show help message
  --version, -v                   Show version information
  --dev                           Development mode with verbose logging

Environment Variables:
  GITHUB_PERSONAL_ACCESS_TOKEN    Alternative way to provide GitHub token

Examples:
  npx spartan-ng-mcp-server --help
  npx spartan-ng-mcp-server --version
  npx spartan-ng-mcp-server -g ghp_1234567890abcdef
  GITHUB_PERSONAL_ACCESS_TOKEN=ghp_token npx spartan-ng-mcp-server
  npx spartan-ng-mcp-server --dev
```

## 🅰️ Angular Integration

This server is designed specifically for Angular projects using Spartan NG components:

```bash
# Start server for Angular development
npx spartan-ng-mcp-server

# Development mode with detailed logging
npx spartan-ng-mcp-server --dev
```

## 🔑 GitHub Token Setup

For optimal performance, set up a GitHub Personal Access Token:

1. **Get your token**: [GitHub Token Setup](github-token.md)
2. **Use it**: 
   ```bash
   # Method 1: Command line
   npx spartan-ng-mcp-server --github-api-key ghp_your_token_here
   
   # Method 2: Environment variable
   export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
   npx spartan-ng-mcp-server
   ```

## ✅ Verification

Test that the server is working:

```bash
# Check version
npx spartan-ng-mcp-server --version

# Check help
npx spartan-ng-mcp-server --help

# Run server (should start without errors)
npx spartan-ng-mcp-server
```

## 🔗 Next Steps

- [GitHub Token Setup](github-token.md) - Set up optimal performance
- [Angular Integration](angular-integration.md) - Connect to your Angular project
- [First Steps](first-steps.md) - Make your first component request
- [Integration](../integration/) - Connect to your editor or tool 