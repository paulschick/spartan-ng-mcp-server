# API Reference

Complete reference for the Spartan NG MCP Server tools and capabilities.

## 🛠️ Available Tools

### Component Tools

- [spartan_get_component](get-component.md) - Get component source code
- [spartan_get_component_demo](get-component-demo.md) - Get component usage examples
- [spartan_list_components](list-components.md) - List all available components
- [spartan_get_component_metadata](get-component-metadata.md) - Get component dependencies and info

### Repository Tools

- [spartan_get_directory_structure](get-directory-structure.md) - Explore repository structure

## 🔧 Tool Usage Examples

### Component Tools

```typescript
// Get button component source
{
  "tool": "spartan_get_component",
  "arguments": { "componentName": "button" }
}

// List all components
{
  "tool": "spartan_list_components",
  "arguments": {}
}

// Get component demo
{
  "tool": "spartan_get_component_demo",
  "arguments": { "componentName": "card" }
}

// Get component metadata
{
  "tool": "spartan_get_component_metadata",
  "arguments": { "componentName": "badge" }
}
```

### Repository Tools

```typescript
// Get directory structure
{
  "tool": "spartan_get_directory_structure",
  "arguments": { "path": "libs/helm" }
}
```

## 🅰️ Angular Support

This server provides Angular-specific tooling for:
- **Spartan NG** - Angular UI primitives from [goetzrobin/spartan](https://github.com/goetzrobin/spartan)
- **TypeScript** - Fully typed component interfaces and implementations
- **Directive-based Components** - Modern Angular component patterns
- **Standalone Components** - Angular standalone component support

## 📋 Component Response Format

All component tools return Angular-specific TypeScript code:
- **File Extension**: `.ts` files with Angular decorators
- **Import Patterns**: Spartan NG import structures
- **Component Structure**: Angular directive and component patterns
- **Styling**: CSS/SCSS with Angular-specific patterns

## 🔗 Next Steps

- [spartan_get_component](get-component.md) - Component source code tool
- [spartan_get_component_demo](get-component-demo.md) - Component demo tool
- [spartan_list_components](list-components.md) - Component listing tool
- [spartan_get_component_metadata](get-component-metadata.md) - Component metadata tool
- [spartan_get_directory_structure](get-directory-structure.md) - Repository structure tool