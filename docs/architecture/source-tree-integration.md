# Source Tree Integration

## Existing Project Structure

```plaintext
spartan-ng-mcp-server/
├── src/
│   ├── cli/
│   │   └── args.ts                 # Command line argument handling
│   ├── index.ts                    # Main entry point
│   ├── prompts/
│   │   ├── helpers.ts              # Prompt utility functions
│   │   └── index.ts                # MCP prompt definitions
│   ├── resource-templates/
│   │   └── index.ts                # Resource template handling
│   ├── resources/
│   │   └── index.ts                # MCP resource definitions
│   ├── schemas/
│   │   └── component.ts            # Component validation schemas
│   ├── server/
│   │   ├── capabilities.ts         # MCP server capabilities
│   │   ├── createServer.ts         # Server initialization
│   │   ├── handler.ts              # Request handlers
│   │   ├── index.ts                # Server exports
│   │   └── version.ts              # Version management
│   ├── tools/
│   │   ├── blocks/                 # TO BE REMOVED
│   │   │   ├── get-block.ts
│   │   │   └── list-blocks.ts
│   │   ├── components/
│   │   │   ├── get-component-demo.ts
│   │   │   ├── get-component-metadata.ts
│   │   │   ├── get-component.ts
│   │   │   └── list-components.ts
│   │   ├── repository/
│   │   │   └── get-directory-structure.ts
│   │   └── index.ts                # Tool exports
│   └── utils/
│       ├── api.ts                  # GitHub API utilities
│       ├── axios-svelte.ts         # TO BE REMOVED
│       ├── axios-vue.ts            # TO BE REMOVED
│       ├── axios.ts                # GitHub HTTP client
│       ├── cache.ts                # Caching mechanisms
│       ├── circuit-breaker.ts      # Circuit breaker pattern
│       ├── framework.ts            # TO BE REMOVED/UPDATED
│       ├── logger.ts               # Winston logging
│       └── validation.ts           # Input validation
```

## New File Organization

```plaintext
spartan-ng-mcp-server/
├── src/
│   ├── cli/                        # Existing - no changes
│   ├── index.ts                    # Existing - no changes
│   ├── prompts/                    # Existing - content updates for Angular
│   ├── resource-templates/         # Existing - content updates for Angular
│   ├── resources/                  # Existing - content updates for Angular
│   ├── schemas/
│   │   ├── component.ts            # UPDATED - Angular component schemas
│   │   ├── spartan-component.ts    # NEW - Spartan NG specific schemas
│   │   └── story.ts                # NEW - Storybook story schemas
│   ├── server/                     # Existing - capability descriptions updated
│   ├── tools/
│   │   ├── components/
│   │   │   ├── get-component.ts               # UPDATED - Angular implementation
│   │   │   ├── get-component-metadata.ts     # UPDATED - Angular metadata
│   │   │   ├── get-component-stories.ts      # NEW - Replaces demo functionality
│   │   │   └── list-components.ts            # UPDATED - Angular discovery
│   │   ├── repository/
│   │   │   └── get-directory-structure.ts    # UPDATED - spartan-ng repository
│   │   ├── spartan/                          # NEW - Spartan NG specific tools
│   │   │   ├── spartan-discovery.ts          # NEW - Component discovery service
│   │   │   ├── spartan-repository.ts         # NEW - Repository client
│   │   │   └── story-integration.ts          # NEW - Story handling service
│   │   └── index.ts                          # UPDATED - Remove blocks, add spartan tools
│   └── utils/
│       ├── api.ts                            # UPDATED - spartan-ng endpoints
│       ├── axios.ts                          # UPDATED - single repository client
│       ├── cache.ts                          # Existing - cache key updates
│       ├── circuit-breaker.ts                # Existing - no changes
│       ├── logger.ts                         # Existing - no changes
│       ├── spartan-client.ts                 # NEW - Spartan NG API client
│       └── validation.ts                     # UPDATED - Angular validation rules
```

## Integration Guidelines

- **File Naming:** Maintain kebab-case for new files, `spartan-` prefix for Angular-specific modules
- **Folder Organization:** Follow existing `tools/`, `utils/`, `schemas/` pattern with new `spartan/` subdirectory for specialized functionality
- **Import/Export Patterns:** Maintain existing barrel export pattern through `index.ts` files
