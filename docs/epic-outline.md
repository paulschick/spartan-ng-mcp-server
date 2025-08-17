Epic 1: Spartan NG MCP Server Conversion

  Epic Goal: Convert the existing multi-framework shadcn-ui MCP server
  to a specialized Angular-only Spartan NG MCP server, removing blocks
  functionality while preserving core component discovery and retrieval
   capabilities.

  Integration Requirements: All changes must maintain MCP protocol
  compliance while updating GitHub repository integration from
  shadcn-ui to spartan-ng/spartan. The conversion must ensure existing
  functionality (component listing, source retrieval, metadata access)
  works seamlessly with Spartan NG's component structure.

  Story 1.1: Update Repository Integration Infrastructure

  As a developer using the MCP server,I want the server to integrate
  with the spartan-ng/spartan repository,so that I can discover and
  access Spartan NG Angular components instead of shadcn-ui components.

  Acceptance Criteria

  1. GitHub API integration points to spartan-ng/spartan repository
  2. Component discovery targets libs/helm/ directory structure
  3. Repository authentication and rate limiting mechanisms work with
  new target
  4. Server configuration updated to reflect new repository defaults
  5. All environment variables and configuration files updated for new
  repository URLs

  Integration Verification

  IV1: Existing GitHub API caching mechanisms continue to function with
   spartan-ng repository endpoints
  IV2: Repository access permissions and authentication work without
  regression
  IV3: Server startup and repository connection performance remains
  within acceptable bounds

  Story 1.2: Remove Blocks Functionality

  As a developer using the MCP server,I want all blocks-related
  functionality removed from the server,so that the server focuses only
   on component functionality matching Spartan NG's architecture.

  Acceptance Criteria

  1. All blocks-related tools and endpoints removed from MCP interface
  2. Blocks-related code paths removed from codebase
  3. Configuration options for blocks functionality removed
  4. Documentation and examples updated to remove blocks references
  5. Error handling updated to remove blocks-related error cases

  Integration Verification

  IV1: MCP tool listing no longer includes any blocks-related tools
  IV2: Server resource usage decreases due to removed functionality
  IV3: Configuration validation prevents blocks-related configuration
  attempts

  Story 1.3: Update Component Discovery and Listing

  As a Angular developer,I want to discover available Spartan NG
  components,so that I can see what Angular components are available
  for use in my projects.

  Acceptance Criteria

  1. Component listing tool returns all components from libs/helm/
  directory
  2. Component names follow Spartan NG naming conventions (accordion,
  alert-dialog, etc.)
  3. Component metadata reflects Angular-specific information
  4. Tool responses use TypeScript interfaces appropriate for Angular
  development
  5. Component categorization and organization matches Spartan NG
  structure

  Integration Verification

  IV1: Component discovery performance is comparable to previous
  shadcn-ui implementation
  IV2: All available Spartan NG components are discoverable through the
   tool
  IV3: Component metadata accuracy verified against actual repository
  content

  Story 1.4: Update Component Source Code Retrieval

  As a Angular developer,I want to retrieve Spartan NG component source
   code,so that I can examine and use Angular component implementations
   in my projects.

  Acceptance Criteria

  1. Source retrieval tool fetches TypeScript (.ts), HTML (.html), CSS
  (.css), and SCSS (.scss) files
  2. File content retrieval works for all component file types in
  Spartan NG structure
  3. Component file organization reflects Angular component patterns
  4. Source code responses include proper file type identification
  5. Error handling for missing or inaccessible component files

  Integration Verification

  IV1: Source retrieval maintains existing performance characteristics
  IV2: File type detection and handling works correctly for all Angular
   file patterns
  IV3: GitHub API rate limiting is not exceeded during source retrieval
   operations

  Story 1.5: Update Framework Configuration and Remove Multi-Framework
  Support

  As a system administrator,I want the server to support only
  Angular/Spartan NG framework,so that the system is simplified and
  optimized for Angular development workflows.

  Acceptance Criteria

  1. Framework detection and selection code removed from codebase
  2. All React, Svelte, and Vue specific code paths removed
  3. Configuration simplified to Angular-only settings
  4. Package dependencies updated to remove unused framework-specific
  libraries
  5. Server capabilities updated to reflect Angular-only support

  Integration Verification

  IV1: Server startup time improves due to reduced framework detection
  overhead
  IV2: Memory usage is reduced by removing unused framework support
  code
  IV3: Configuration validation prevents invalid framework selection
  attempts

  Story 1.6: Update Documentation and Examples

  As a developer using the MCP server,I want comprehensive
  documentation for Spartan NG integration,so that I can effectively
  use the server for Angular development.

  Acceptance Criteria

  1. README.md completely rewritten for Spartan NG focus
  2. All examples updated to show Angular component usage
  3. API documentation reflects new tool interfaces and capabilities
  4. Installation and setup instructions updated for Angular
  development
  5. Migration guide provided for users of the original shadcn-ui
  server

  Integration Verification

  IV1: Documentation examples work correctly with the converted server
  IV2: Setup instructions result in functional server installation
  IV3: API documentation accurately reflects actual server capabilities

  Story 1.7: Update Package Configuration and Metadata

  As a maintainer of the MCP server,I want package configuration to
  reflect the Spartan NG focus,so that the package is properly
  identified and distributed as a Spartan NG tool.

  Acceptance Criteria

  1. package.json updated with Spartan NG name, description, and
  keywords
  2. Repository URLs updated to point to the new Spartan NG server
  repository
  3. Dependencies updated to remove unused multi-framework libraries
  4. Build scripts and commands updated for Angular-focused development
  5. License and authorship information updated appropriately

  Integration Verification

  IV1: Package installation and dependency resolution works correctly
  IV2: Build and development scripts function without errors
  IV3: Package metadata accurately represents the converted
  functionality

  ---
  This story sequence is designed to minimize risk to your existing
  system by:
  1. Starting with infrastructure - Repository integration changes
  first to establish the foundation
  2. Removing complexity - Eliminating blocks functionality early to
  simplify subsequent changes
  3. Building core functionality - Component discovery and retrieval in
   logical sequence
  4. Cleaning up architecture - Framework simplification once core
  functionality is working
  5. Completing user experience - Documentation and packaging last to
  ensure accuracy

