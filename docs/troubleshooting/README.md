# Troubleshooting

Common issues and solutions for the Spartan NG MCP Server.

## 🐛 Common Issues

- [Installation Issues](installation-issues.md) - Problems with installation and setup
- [Rate Limit Issues](rate-limit-issues.md) - GitHub API rate limiting problems
- [Angular Issues](angular-issues.md) - Angular-specific problems
- [Integration Issues](integration-issues.md) - Editor and tool integration problems
- [Network Issues](network-issues.md) - Connection and proxy problems

## 🚨 Quick Fixes

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

### Angular Configuration Issues

```bash
# Verify server configuration
npx spartan-ng-mcp-server --help
```

## 🔧 Debug Mode

Enable verbose logging:

```bash
# Set debug environment variable
DEBUG=* npx spartan-ng-mcp-server --github-api-key ghp_your_token
```

## 📞 Getting Help

- 🐛 [Report Issues](https://github.com/paulschick/spartan-ng-mcp-server/issues)
- 💬 [Discussions](https://github.com/paulschick/spartan-ng-mcp-server/discussions)
- 📖 [Documentation](https://github.com/paulschick/spartan-ng-mcp-server#readme)

## 🔗 Next Steps

- [Installation Issues](installation-issues.md) - Detailed installation troubleshooting
- [Rate Limit Issues](rate-limit-issues.md) - GitHub API problems
- [Angular Issues](angular-issues.md) - Angular-specific problems
- [Integration Issues](integration-issues.md) - Editor integration problems 