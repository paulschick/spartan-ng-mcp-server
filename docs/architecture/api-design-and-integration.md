# API Design and Integration

## API Integration Strategy

**API Integration Strategy:** Replace multi-framework tool endpoints with Angular-focused MCP tools  
**Authentication:** Maintain existing GitHub token authentication patterns  
**Versioning:** Update tool names and schemas while preserving MCP protocol compatibility

## New API Endpoints

### spartan_list_components

- **Method:** MCP Tool Call
- **Endpoint:** `spartan_list_components`
- **Purpose:** List all available Spartan NG components from libs/helm/ directory
- **Integration:** Replaces `list_components` with Angular-specific implementation

**Request:**
```json
{
  "category": "optional string - filter by component category (form, layout, navigation)",
  "includeStories": "optional boolean - include story availability info"
}
```

**Response:**
```json
{
  "components": [
    {
      "name": "button",
      "displayName": "Button", 
      "description": "Displays a button or a component that looks like a button",
      "category": "form",
      "hasStories": true,
      "repositoryPath": "libs/helm/button",
      "lastUpdated": "2024-01-15T10:30:00Z"
    }
  ],
  "totalCount": 41,
  "categories": ["form", "layout", "navigation", "feedback"]
}
```

### spartan_get_component

- **Method:** MCP Tool Call  
- **Endpoint:** `spartan_get_component`
- **Purpose:** Get complete source code and metadata for a specific Spartan NG component
- **Integration:** Replaces `get_component` with Angular file structure support

**Request:**
```json
{
  "componentName": "button",
  "includeStories": "optional boolean - include associated stories",
  "fileTypes": "optional array - specific file types to retrieve"
}
```

**Response:**
```json
{
  "component": {
    "name": "button",
    "displayName": "Button",
    "description": "Displays a button or a component that looks like a button",
    "files": [
      {
        "fileName": "hlm-button.ts",
        "fileType": "component", 
        "content": "import { Component } from '@angular/core'...",
        "size": 2521
      },
      {
        "fileName": "hlm-button.token.ts",
        "fileType": "token",
        "content": "import { InjectionToken } from '@angular/core'...", 
        "size": 715
      }
    ],
    "exports": ["HlmButtonDirective", "hlmButtonVariants"],
    "dependencies": ["@angular/core", "class-variance-authority"]
  }
}
```

### spartan_get_component_stories

- **Method:** MCP Tool Call
- **Endpoint:** `spartan_get_component_stories` 
- **Purpose:** Get Storybook stories and usage examples for a component
- **Integration:** Replaces blocks functionality with story-based examples

**Request:**
```json
{
  "componentName": "button",
  "storyName": "optional string - specific story variant"
}
```

**Response:**
```json
{
  "componentName": "button",
  "stories": [
    {
      "name": "Default",
      "description": "Default button appearance",
      "code": "@Component({\n  template: `<button hlmBtn>Click me</button>`\n})"
    },
    {
      "name": "Variants", 
      "description": "Different button variants",
      "code": "@Component({\n  template: `<button hlmBtn variant=\"destructive\">Delete</button>`\n})"
    }
  ],
  "storyFile": "apps/ui-storybook/stories/button.stories.ts"
}
```

### spartan_get_directory_structure

- **Method:** MCP Tool Call
- **Endpoint:** `spartan_get_directory_structure`
- **Purpose:** Browse Spartan NG repository structure for development context
- **Integration:** Updates existing directory browsing for spartan-ng/spartan repository

**Request:**
```json
{
  "path": "optional string - specific path to browse (defaults to libs/helm/)",
  "depth": "optional number - directory traversal depth"
}
```

**Response:**
```json
{
  "path": "libs/helm/",
  "directories": [
    {
      "name": "button",
      "type": "component",
      "hasStories": true,
      "lastModified": "2024-01-15T10:30:00Z"
    }
  ],
  "files": [
    {
      "name": "README.md",
      "size": 132,
      "type": "documentation"
    }
  ]
}
```

## Removed API Endpoints

The following endpoints will be **REMOVED** as part of the Angular-only conversion:

- `get_block` - No blocks concept in Spartan NG
- `list_blocks` - No blocks functionality
- Framework-specific variants of existing endpoints
