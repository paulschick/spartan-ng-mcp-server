# Configuration

Detailed configuration options for the Spartan NG MCP Server.

## ⚙️ Configuration Options

- [GitHub Token Setup](github-token-setup.md) - Setting up GitHub API access
- [Environment Variables](environment-variables.md) - Using environment variables
- [Command Line Options](command-line-options.md) - All available CLI options
- [Advanced Configuration](advanced-configuration.md) - Advanced setup options

## 🚀 Quick Configuration

### Basic Setup

```bash
# Angular/Spartan NG
npx spartan-ng-mcp-server
```

### With GitHub Token

```bash
# With GitHub token (recommended)
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here
```

## 🔧 Command Line Options

```bash
spartan-ng-mcp-server [options]

Options:
  --github-api-key, -g <token>    GitHub Personal Access Token
  --help, -h                      Show help message
  --version, -v                   Show version information
```

## 🌍 Environment Variables

```bash
# GitHub token
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here

# Run server
npx spartan-ng-mcp-server
```

## 🅰️ Angular Configuration

The server is configured specifically for Angular development with Spartan NG:

```bash
# Default Angular/Spartan NG setup
npx spartan-ng-mcp-server

# With environment variables
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
npx spartan-ng-mcp-server
```

## 🔗 Next Steps

- [GitHub Token Setup](github-token-setup.md) - Setting up optimal performance
- [Environment Variables](environment-variables.md) - Using environment variables
- [Command Line Options](command-line-options.md) - Complete CLI reference
- [Advanced Configuration](advanced-configuration.md) - Advanced setup options 