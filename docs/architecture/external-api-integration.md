# External API Integration

## GitHub API Integration (Updated)

- **Purpose:** Access Spartan NG component source code, metadata, and repository structure
- **Documentation:** https://docs.github.com/en/rest
- **Base URL:** `https://api.github.com/repos/spartan-ng/spartan`
- **Authentication:** GitHub Personal Access Token (existing pattern maintained)
- **Integration Method:** Axios HTTP client with existing caching and circuit breaker patterns

**Key Endpoints Used:**
- `GET /contents/libs/helm` - List all available components
- `GET /contents/libs/helm/{component-name}` - Get component directory structure  
- `GET /contents/libs/helm/{component-name}/src/lib/{file-name}` - Get component source files
- `GET /contents/apps/ui-storybook/stories/{component-name}.stories.ts` - Get component stories
- `GET /git/trees/{sha}?recursive=1` - Get complete directory tree for efficient discovery

**Error Handling:** 
- Rate limit handling with exponential backoff (existing pattern)
- 404 handling for missing components or stories
- Network timeout and retry logic (existing CircuitBreaker pattern)
- Invalid repository access token handling

## Removed External Integrations

The following external API integrations will be **REMOVED**:

- **shadcn-ui/ui Repository API** - No longer needed for React components
- **huntabyte/shadcn-svelte Repository API** - Svelte framework support removed  
- **unovue/shadcn-vue Repository API** - Vue framework support removed
- **Multiple repository endpoint management** - Simplified to single repository

**Integration Benefits:**
- **Simplified Architecture:** Single repository integration reduces complexity
- **Improved Performance:** Fewer API endpoints to monitor and cache
- **Reduced Rate Limiting:** Consolidated API calls to single GitHub repository
- **Enhanced Reliability:** Single point of failure vs. multiple repository dependencies
