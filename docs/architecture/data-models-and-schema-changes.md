# Data Models and Schema Changes

## New Data Models

### SpartanComponent

**Purpose:** Represents a single Spartan NG Angular component with its metadata and file structure  
**Integration:** Replaces existing multi-framework component model with Angular-specific structure

**Key Attributes:**
- `name: string` - Component name (e.g., "button", "accordion", "alert-dialog")
- `displayName: string` - Human-readable name (e.g., "Button", "Accordion", "Alert Dialog")
- `description: string` - Component description and usage information
- `category: ComponentCategory` - UI category (form, layout, navigation, etc.)
- `files: ComponentFile[]` - Array of component files (.ts, .token.ts)
- `dependencies: string[]` - Angular dependencies and peer dependencies
- `exports: string[]` - Public API exports from index.ts
- `storyPath?: string` - Optional path to Storybook story file
- `repositoryPath: string` - GitHub path (libs/helm/{component-name})

**Relationships:**
- **With Existing:** Replaces `ComponentMetadata` interface from current schema
- **With New:** Has one-to-many relationship with `ComponentFile` model

### ComponentFile

**Purpose:** Represents individual files within a Spartan NG component directory  
**Integration:** Handles Angular-specific file patterns (TypeScript, token files, etc.)

**Key Attributes:**
- `fileName: string` - File name (e.g., "hlm-button.ts", "hlm-button.token.ts")
- `filePath: string` - Full repository path
- `fileType: AngularFileType` - Enum: 'component' | 'token' | 'index' | 'spec' | 'stories'
- `content: string` - File content from GitHub API
- `size: number` - File size in bytes
- `lastModified: Date` - Last modification timestamp

**Relationships:**
- **With Existing:** Replaces generic file handling with Angular-specific file type awareness
- **With New:** Belongs to `SpartanComponent`

### ComponentStory

**Purpose:** Represents Storybook stories for Spartan NG components  
**Integration:** Links component definitions with their usage examples and demos

**Key Attributes:**
- `componentName: string` - Associated component name
- `storyFile: string` - Story file name (.stories.ts)
- `stories: StoryVariant[]` - Individual story variations within the file
- `storyPath: string` - GitHub path (apps/ui-storybook/stories/{component}.stories.ts)

**Relationships:**
- **With Existing:** Replaces blocks functionality with story-based examples
- **With New:** Linked to `SpartanComponent` by componentName

## Schema Integration Strategy

**Database Changes Required:**
- **New Tables:** No persistent database - file-based caching continues with updated schemas
- **Modified Schemas:** Update Zod validation schemas for Angular component structure
- **New Indexes:** GitHub API response caching keys updated for Spartan NG repository paths
- **Migration Strategy:** Runtime schema transformation during server startup (no data migration needed)

**Backward Compatibility:**
- Remove all React/Vue/Svelte schema references
- Implement new Angular-specific validation rules
- Update MCP tool response schemas for Angular component patterns
- Maintain caching mechanism structure while updating content schemas
