# Angular Framework

The Spartan NG MCP Server is designed exclusively for Angular development with Spartan NG components.

## 🅰️ Angular Framework

| Framework | Repository | Maintainer | File Extension | Description |
|-----------|------------|------------|----------------|-------------|
| **Angular** | [goetzrobin/spartan](https://www.spartan.ng/) | [goetzrobin](https://github.com/goetzrobin) | `.ts` | Angular components from Spartan NG |

## 🚀 Getting Started with Angular

### Basic Angular Setup

```bash
# Angular with Spartan NG (default and only option)
npx spartan-ng-mcp-server
```

### With GitHub Token (Recommended)

```bash
# Angular with GitHub token for better performance
npx spartan-ng-mcp-server --github-api-key ghp_your_token_here
```

### Environment Variable Setup

```bash
# Set GitHub token via environment variable
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
npx spartan-ng-mcp-server
```

## 🔍 Server Status

The server automatically configures for Angular:

```bash
INFO: MCP Server starting...
INFO: MCP Server configured for ANGULAR framework
INFO: Repository: goetzrobin/spartan
INFO: File extension: .ts
INFO: MCP Server ready
```

## 💡 Angular Use Cases

### Angular Applications
- **Angular 16+ applications**
- **TypeScript projects with strict mode**
- **Modern Angular patterns with standalone components**
- **Enterprise Angular applications**

### Component Development
- **Angular component libraries**
- **Design system implementation**
- **UI component learning and exploration**

### Integration Patterns
- **Angular CLI integration**
- **Angular workspace development**
- **Nx monorepo projects**

## 🔧 Why Angular-Only?

This server focuses exclusively on Angular to provide:

- **Optimized Performance** - No framework switching overhead
- **Angular-Specific Features** - Directive patterns, dependency injection
- **TypeScript Integration** - Full type safety with Angular patterns
- **Simplified Configuration** - No framework selection needed

## ⚠️ Important Notes

### Environment Variable Setup

When using environment variables:

- ✅ Correct: `export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_token && npx spartan-ng-mcp-server`
- ✅ Correct: `GITHUB_PERSONAL_ACCESS_TOKEN=ghp_token npx spartan-ng-mcp-server`

### Angular-Specific Features

Angular components include:
- Directive-based patterns
- TypeScript interfaces
- Dependency injection
- Standalone component support

## 🔗 Next Steps

- [First Steps](first-steps.md) - Make your first component request
- [Angular Framework Guide](../frameworks/) - Detailed Angular documentation
- [Usage Examples](../usage/) - See Angular-specific examples
- [Integration](../integration/) - Connect to your editor or tool 