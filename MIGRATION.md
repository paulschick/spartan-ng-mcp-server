# Migration Guide: From shadcn/ui MCP Server to Spartan NG MCP Server

This guide helps you migrate from the multi-framework shadcn/ui MCP server to the Angular-focused Spartan NG MCP server.

## 🎯 What Changed

### Framework Focus
- **Before**: Multi-framework support (React, Vue, Svelte)
- **After**: Angular-only with Spartan NG components

### Repository Source
- **Before**: Multiple repositories (shadcn/ui, shadcn-svelte, shadcn-vue)
- **After**: Single repository (goetzrobin/spartan)

### Component Structure
- **Before**: Various file formats (.tsx, .vue, .svelte)
- **After**: TypeScript files (.ts) with Angular decorators

## 🚀 Quick Migration Steps

### 1. Update Package Installation

```bash
# Remove old server
npm uninstall -g @jpisnice/shadcn-ui-mcp-server

# Install new server
npm install -g spartan-ng-mcp-server
```

### 2. Update Commands

```bash
# Old commands
npx @jpisnice/shadcn-ui-mcp-server --framework react
npx @jpisnice/shadcn-ui-mcp-server --framework vue
npx @jpisnice/shadcn-ui-mcp-server --framework svelte

# New command (Angular only)
npx spartan-ng-mcp-server
```

### 3. Update MCP Configuration

If you have MCP client configurations, update the server name:

```json
{
  "servers": {
    "spartan-ng": {
      "command": "npx",
      "args": ["spartan-ng-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

## 🔄 Tool Name Changes

| Old Tool Name | New Tool Name |
|---------------|---------------|
| `shadcn_list_components` | `spartan_list_components` |
| `shadcn_get_component` | `spartan_get_component` |
| `shadcn_get_component_demo` | `spartan_get_component_demo` |
| `shadcn_get_component_metadata` | `spartan_get_component_metadata` |
| `shadcn_get_directory_structure` | `spartan_get_directory_structure` |

## 📁 Component Path Changes

### Old Structure (React/Vue/Svelte)
```
apps/v4/registry/new-york-v4/ui/button/
├── button.tsx         (React)
├── button.vue         (Vue)
└── button.svelte      (Svelte)
```

### New Structure (Angular)
```
libs/helm/ui-button/
├── src/lib/
│   ├── hlm-button.ts
│   └── hlm-button-variants.ts
└── README.md
```

## 🎨 Component Usage Changes

### Before: React Example
```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button variant="outline">Button</Button>
  )
}
```

### After: Angular Example
```typescript
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [HlmButtonDirective],
  template: `
    <button hlmBtn variant="outline">Button</button>
  `,
})
export class ButtonDemoComponent {}
```

## 🔧 Environment Variables

Environment variables remain the same:

```bash
# Still works
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

## ⚠️ Breaking Changes

### Removed Features
- ❌ Multi-framework support
- ❌ Block support (no Angular equivalent in Spartan NG)
- ❌ Framework selection arguments (`--framework`)

### Added Features
- ✅ Angular-specific component metadata
- ✅ TypeScript-first approach
- ✅ Spartan NG component patterns
- ✅ Angular CLI integration patterns

## 🆘 Troubleshooting

### "Tool not found" errors
If you get tool not found errors, update your MCP client configuration to use the new tool names.

### Components not loading
Ensure you're targeting the correct repository structure. Spartan NG components are in `libs/helm/` directory.

### Rate limiting issues
Continue using your GitHub Personal Access Token for optimal performance.

## 🔗 Additional Resources

- [Spartan NG Documentation](https://www.spartan.ng/)
- [Angular Components Guide](https://angular.dev/guide/components)
- [Spartan NG Repository](https://github.com/goetzrobin/spartan)

## 💡 Tips for Angular Developers

1. **Component Structure**: Spartan NG uses directive-based components
2. **Styling**: Uses CSS variables and utility classes
3. **TypeScript**: Fully typed component interfaces
4. **Standalone Components**: Modern Angular standalone component patterns
5. **Accessibility**: Built-in ARIA support and keyboard navigation

---

**Need help?** Open an issue in the [Spartan NG MCP Server repository](https://github.com/your-org/spartan-ng-mcp-server/issues).