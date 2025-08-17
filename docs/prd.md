# Spartan NG MCP Server Brownfield Enhancement PRD

## Intro Project Analysis and Context

### Existing Project Overview

#### Analysis Source
IDE-based fresh analysis (project files available in current working directory)

#### Current Project State
Based on my analysis of the Spartan NG MCP Server project, I can see this is currently a Model Context Protocol (MCP) server originally designed for shadcn/ui components that is being converted to support Spartan NG (Angular components). 

The project currently:
- Provides MCP server functionality for component discovery and retrieval
- Uses GitHub API integration to fetch component information
- Supports multiple frameworks (React/shadcn-ui, Svelte, Vue) - **to be converted to Angular-only**
- Implements caching mechanisms for GitHub API efficiency
- Provides component metadata, source code access, and directory structure browsing

### Available Documentation Analysis

#### Available Documentation
✓ **Tech Stack Documentation** - Partial (TypeScript, npm mentioned in CLAUDE.md)  
✓ **Source Tree/Architecture** - Basic (project structure described in CLAUDE.md)  
❌ **Coding Standards** - Missing  
❌ **API Documentation** - Missing  
❌ **External API Documentation** - Partial (GitHub API integration mentioned)  
❌ **UX/UI Guidelines** - Missing  
❌ **Technical Debt Documentation** - Missing  

**Analysis Result**: Critical documentation gaps exist. The CLAUDE.md file provides good conversion guidance but lacks comprehensive technical documentation.

### Enhancement Scope Definition

#### Enhancement Type
✓ **Technology Stack Upgrade** - Converting from multi-framework to Angular-only  
✓ **Major Feature Modification** - Removing blocks functionality, updating component mapping  
✓ **Integration with New Systems** - Switching from shadcn-ui to Spartan NG repository integration  

#### Enhancement Description
Converting the existing multi-framework MCP server (supporting shadcn-ui React, Svelte, Vue) to a single-framework server exclusively supporting Spartan NG Angular components. This includes updating GitHub repository targets, removing block functionality, updating component mapping, and maintaining core MCP protocol functionality.

#### Impact Assessment
✓ **Major Impact** - Architectural changes required including:
- Complete framework mapping system overhaul
- Repository URL and API endpoint changes
- Component schema modifications
- Tool implementation updates
- Documentation and examples rewrite

### Goals and Background Context

#### Goals
• Migrate from multi-framework support to Angular-only (Spartan NG) support
• Remove blocks functionality while preserving component discovery and retrieval
• Update GitHub integration to target spartan-ng/spartan repository
• Maintain MCP protocol compatibility and existing caching mechanisms
• Update all user-facing documentation and examples
• Preserve core functionality: component listing, metadata access, source code retrieval

#### Background Context
The original shadcn/ui MCP server was designed to serve multiple UI frameworks (React, Svelte, Vue) but is being specialized for Angular development using Spartan NG. Spartan NG is the Angular ecosystem's equivalent to shadcn/ui, providing high-quality, accessible components. The conversion eliminates complexity from multi-framework support while focusing on Angular developers' needs.

Key differences identified: Spartan NG uses `libs/helm/` for components vs shadcn's `apps/v4/registry/new-york-v4/ui/`, and Spartan NG has no "blocks" concept, only components and stories.

#### Change Log
| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial PRD Creation | 2025-08-17 | v1.0 | Created brownfield enhancement PRD for Spartan NG conversion | John (PM Agent) |

## Requirements

### Functional Requirements

**FR1**: The MCP server shall support only Angular (Spartan NG) framework, removing all React, Svelte, and Vue framework support from the existing codebase.

**FR2**: The server shall integrate with the spartan-ng/spartan GitHub repository, specifically targeting the `libs/helm/` directory for component discovery instead of the current shadcn-ui repository paths.

**FR3**: The component listing functionality shall enumerate all available Spartan NG components from the `libs/helm/` directory structure (accordion, alert-dialog, alert, aspect-ratio, avatar, badge, etc.).

**FR4**: The server shall completely remove all "blocks" functionality, tools, and related code paths since Spartan NG uses only components and stories.

**FR5**: Component source code retrieval shall fetch TypeScript (.ts), HTML (.html), CSS (.css), and SCSS (.scss) files from the Spartan NG component directories.

**FR6**: The existing MCP protocol interface shall remain compatible while allowing for optimizations specific to Angular development workflows.

**FR7**: GitHub API caching mechanisms shall be preserved and updated to work with the new spartan-ng/spartan repository endpoints.

**FR8**: Component metadata and directory structure browsing shall work with Spartan NG's component organization pattern.

**FR9**: The server shall implement new MCP tools and interfaces specifically designed for Angular component discovery, removing any React/Vue/Svelte-specific tooling.

**FR10**: Documentation and examples shall be completely rewritten to reflect the new Angular-focused API and removed functionality.

### Non-Functional Requirements

**NFR1**: The conversion shall maintain existing performance characteristics and not exceed current memory usage by more than 10%.

**NFR2**: All GitHub API rate limiting and caching strategies shall be preserved to maintain efficiency.

**NFR3**: The server startup time shall not exceed the current baseline by more than 500ms.

**NFR4**: Logging and error handling mechanisms shall be maintained at current levels of detail and clarity.

**NFR5**: The conversion may require breaking changes to the existing MCP protocol specification to properly support Angular-only functionality and remove blocks-related interfaces.

### Compatibility Requirements

**CR1**: MCP Protocol Evolution - The server shall implement a new MCP protocol interface optimized for Spartan NG, which may include breaking changes from the original shadcn-ui server interface.

**CR2**: GitHub API Compatibility - The server shall maintain compatibility with GitHub API v4 and existing authentication mechanisms.

**CR3**: TypeScript/Node.js Compatibility - The server shall maintain compatibility with the existing TypeScript and Node.js version requirements.

**CR4**: Configuration Compatibility - Existing server configuration patterns and environment variable usage shall be preserved where applicable.

## User Interface Enhancement Goals

### Integration with Existing UI

The new MCP interface will integrate with Angular development workflows by:
- Providing TypeScript-first component discovery that aligns with Angular CLI patterns
- Supporting Angular component file structure (.ts, .html, .css/.scss) in tool responses
- Implementing component metadata that reflects Angular-specific concepts (directives, services, modules)
- Designing tool interfaces that complement Angular development tooling (ng CLI, Angular Language Service)

### Modified/New Screens and Views

**MCP Tool Interfaces to be Modified/Created:**
- Component listing tool (updated from multi-framework to Angular-only)
- Component source retrieval tool (updated for Angular file patterns)
- Component metadata tool (redesigned for Angular component structure)
- Repository browsing tool (updated for spartan-ng/spartan structure)

**Removed Interfaces:**
- All blocks-related tools and endpoints
- Framework selection/detection interfaces
- React/Vue/Svelte-specific tooling

### UI Consistency Requirements

**UIC1**: All MCP tool responses shall follow consistent TypeScript interface patterns matching Angular conventions

**UIC2**: Component file organization in tool responses shall mirror Angular workspace structure patterns

**UIC3**: Error messages and status responses shall use Angular-familiar terminology and concepts

**UIC4**: Tool naming conventions shall follow Angular CLI command patterns where applicable

## Technical Constraints and Integration Requirements

### Existing Technology Stack

**Languages**: TypeScript, JavaScript  
**Frameworks**: Node.js (MCP server), Angular (target component framework)  
**Database**: File-based caching (no persistent database)  
**Infrastructure**: GitHub API integration, MCP protocol compliance  
**External Dependencies**: GitHub API v4, MCP SDK, TypeScript compiler

### Integration Approach

**Database Integration Strategy**: No database changes required - maintain file-based caching with updated repository targets

**API Integration Strategy**: 
- Replace shadcn-ui GitHub API endpoints with spartan-ng/spartan endpoints
- Update API response parsing for Spartan NG repository structure
- Maintain GitHub API rate limiting and authentication patterns

**Frontend Integration Strategy**: 
- Design MCP tools to integrate seamlessly with Angular CLI workflows
- Provide component information in formats useful for Angular development
- Support Angular-specific file patterns and component organization

**Testing Integration Strategy**: 
- Update existing test suites for new repository structure
- Add Angular-specific component validation tests
- Maintain integration tests for GitHub API functionality

### Code Organization and Standards

**File Structure Approach**: 
- Maintain existing MCP server structure in `/src`
- Update `/src/utils` for Spartan NG-specific operations
- Reorganize `/src/tools` to remove blocks and update component tools
- Keep `/src/server` with updated capability descriptions

**Naming Conventions**: 
- Use Angular component naming patterns in tool responses
- Maintain TypeScript naming conventions throughout codebase
- Use kebab-case for component identifiers matching Spartan NG patterns

**Coding Standards**: 
- Maintain existing TypeScript strict mode configuration
- Follow Angular style guide conventions for component-related code
- Preserve existing ESLint and Prettier configurations

**Documentation Standards**: 
- Update all documentation to focus on Angular development
- Provide Angular-specific examples and use cases
- Remove all references to React/Vue/Svelte frameworks

### Deployment and Operations

**Build Process Integration**: 
- Maintain existing npm build scripts
- Update package.json metadata for Spartan NG focus
- Preserve TypeScript compilation and bundling processes

**Deployment Strategy**: 
- No changes to deployment infrastructure required
- Update environment configuration for new repository targets
- Maintain existing CI/CD pipeline compatibility

**Monitoring and Logging**: 
- Preserve existing logging infrastructure
- Update log messages to reflect Angular-focused operations
- Maintain GitHub API rate limit monitoring

**Configuration Management**: 
- Update default configuration for spartan-ng/spartan repository
- Remove framework selection configuration options
- Maintain environment variable patterns for deployment flexibility

### Risk Assessment and Mitigation

**Technical Risks**: 
- Spartan NG repository structure changes could break component discovery
- GitHub API rate limits may be impacted by different access patterns
- Component file patterns in Spartan NG may not be consistent across all components

**Integration Risks**: 
- Angular component complexity may exceed current metadata handling capabilities
- TypeScript compilation patterns in Spartan NG may differ from shadcn-ui assumptions
- MCP protocol changes may affect client integration complexity

**Deployment Risks**: 
- Repository URL changes require careful configuration management
- Removal of blocks functionality may affect existing configuration files
- Angular-specific dependencies may introduce new runtime requirements

**Mitigation Strategies**: 
- Implement comprehensive integration tests with actual Spartan NG repository
- Add fallback mechanisms for inconsistent component file patterns
- Create configuration validation to catch repository access issues early
- Implement gradual rollout strategy for testing with real Angular projects

## Epic and Story Structure

### Epic Approach
**Epic Structure Decision**: Single epic approach with rationale: The conversion from multi-framework shadcn-ui to Angular-only Spartan NG involves interdependent changes across GitHub integration, component mapping, tool interfaces, and documentation. These changes must be coordinated together to maintain system integrity throughout the conversion process.

## Epic 1: Spartan NG MCP Server Conversion

**Epic Goal**: Convert the existing multi-framework shadcn-ui MCP server to a specialized Angular-only Spartan NG MCP server, removing blocks functionality while preserving core component discovery and retrieval capabilities.

**Integration Requirements**: All changes must maintain MCP protocol compliance while updating GitHub repository integration from shadcn-ui to spartan-ng/spartan. The conversion must ensure existing functionality (component listing, source retrieval, metadata access) works seamlessly with Spartan NG's component structure.

### Story 1.1: Update Repository Integration Infrastructure

As a **developer using the MCP server**,  
I want **the server to integrate with the spartan-ng/spartan repository**,  
so that **I can discover and access Spartan NG Angular components instead of shadcn-ui components**.

#### Acceptance Criteria
1. GitHub API integration points to spartan-ng/spartan repository
2. Component discovery targets `libs/helm/` directory structure
3. Repository authentication and rate limiting mechanisms work with new target
4. Server configuration updated to reflect new repository defaults
5. All environment variables and configuration files updated for new repository URLs

#### Integration Verification
**IV1**: Existing GitHub API caching mechanisms continue to function with spartan-ng repository endpoints
**IV2**: Repository access permissions and authentication work without regression
**IV3**: Server startup and repository connection performance remains within acceptable bounds

### Story 1.2: Remove Blocks Functionality

As a **developer using the MCP server**,  
I want **all blocks-related functionality removed from the server**,  
so that **the server focuses only on component functionality matching Spartan NG's architecture**.

#### Acceptance Criteria
1. All blocks-related tools and endpoints removed from MCP interface
2. Blocks-related code paths removed from codebase
3. Configuration options for blocks functionality removed
4. Documentation and examples updated to remove blocks references
5. Error handling updated to remove blocks-related error cases

#### Integration Verification
**IV1**: MCP tool listing no longer includes any blocks-related tools
**IV2**: Server resource usage decreases due to removed functionality
**IV3**: Configuration validation prevents blocks-related configuration attempts

### Story 1.3: Update Component Discovery and Listing

As a **Angular developer**,  
I want **to discover available Spartan NG components**,  
so that **I can see what Angular components are available for use in my projects**.

#### Acceptance Criteria
1. Component listing tool returns all components from `libs/helm/` directory
2. Component names follow Spartan NG naming conventions (accordion, alert-dialog, etc.)
3. Component metadata reflects Angular-specific information
4. Tool responses use TypeScript interfaces appropriate for Angular development
5. Component categorization and organization matches Spartan NG structure

#### Integration Verification
**IV1**: Component discovery performance is comparable to previous shadcn-ui implementation
**IV2**: All available Spartan NG components are discoverable through the tool
**IV3**: Component metadata accuracy verified against actual repository content

### Story 1.4: Update Component Source Code Retrieval

As a **Angular developer**,  
I want **to retrieve Spartan NG component source code**,  
so that **I can examine and use Angular component implementations in my projects**.

#### Acceptance Criteria
1. Source retrieval tool fetches TypeScript (.ts), HTML (.html), CSS (.css), and SCSS (.scss) files
2. File content retrieval works for all component file types in Spartan NG structure
3. Component file organization reflects Angular component patterns
4. Source code responses include proper file type identification
5. Error handling for missing or inaccessible component files

#### Integration Verification
**IV1**: Source retrieval maintains existing performance characteristics
**IV2**: File type detection and handling works correctly for all Angular file patterns
**IV3**: GitHub API rate limiting is not exceeded during source retrieval operations

### Story 1.5: Update Framework Configuration and Remove Multi-Framework Support

As a **system administrator**,  
I want **the server to support only Angular/Spartan NG framework**,  
so that **the system is simplified and optimized for Angular development workflows**.

#### Acceptance Criteria
1. Framework detection and selection code removed from codebase
2. All React, Svelte, and Vue specific code paths removed
3. Configuration simplified to Angular-only settings
4. Package dependencies updated to remove unused framework-specific libraries
5. Server capabilities updated to reflect Angular-only support

#### Integration Verification
**IV1**: Server startup time improves due to reduced framework detection overhead
**IV2**: Memory usage is reduced by removing unused framework support code
**IV3**: Configuration validation prevents invalid framework selection attempts

### Story 1.6: Update Documentation and Examples

As a **developer using the MCP server**,  
I want **comprehensive documentation for Spartan NG integration**,  
so that **I can effectively use the server for Angular development**.

#### Acceptance Criteria
1. README.md completely rewritten for Spartan NG focus
2. All examples updated to show Angular component usage
3. API documentation reflects new tool interfaces and capabilities
4. Installation and setup instructions updated for Angular development
5. Migration guide provided for users of the original shadcn-ui server

#### Integration Verification
**IV1**: Documentation examples work correctly with the converted server
**IV2**: Setup instructions result in functional server installation
**IV3**: API documentation accurately reflects actual server capabilities

### Story 1.7: Update Package Configuration and Metadata

As a **maintainer of the MCP server**,  
I want **package configuration to reflect the Spartan NG focus**,  
so that **the package is properly identified and distributed as a Spartan NG tool**.

#### Acceptance Criteria
1. package.json updated with Spartan NG name, description, and keywords
2. Repository URLs updated to point to the new Spartan NG server repository
3. Dependencies updated to remove unused multi-framework libraries
4. Build scripts and commands updated for Angular-focused development
5. License and authorship information updated appropriately

#### Integration Verification
**IV1**: Package installation and dependency resolution works correctly
**IV2**: Build and development scripts function without errors
**IV3**: Package metadata accurately represents the converted functionality

---
