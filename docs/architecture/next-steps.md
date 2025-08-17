# Next Steps

## Story Manager Handoff

**For Story Manager to work with this brownfield enhancement:**

Reference this architecture document as the technical foundation for implementing the PRD epic structure. The key integration requirements validated with the Spartan NG repository analysis include:

- **Component Discovery:** Target `libs/helm/` directory with 41 confirmed Angular components
- **Repository Integration:** Switch from `shadcn-ui/*` to `spartan-ng/spartan` with validated GitHub API access patterns
- **File Structure:** Angular components follow `hlm-{component}.ts` and `hlm-{component}.token.ts` patterns
- **Story Integration:** Stories available at `apps/ui-storybook/stories/{component}.stories.ts`

**Existing System Constraints (validated from actual project analysis):**
- TypeScript/Node.js runtime environment with MCP protocol compliance
- GitHub API rate limiting requires existing caching and circuit breaker patterns
- Package distribution through npm with CLI binary approach
- Shell script testing validation rather than formal testing frameworks

**First Story Implementation Priority:** 
Start with Story 1.1 (Update Repository Integration Infrastructure) as it provides the foundation for all subsequent component discovery and retrieval functionality. Include integration checkpoints for GitHub API connectivity and component listing validation.

**Integration Integrity:** Maintain existing MCP server functionality throughout implementation - each story should be independently deployable without breaking current operations.

## Developer Handoff

**For developers starting implementation:**

Reference this architecture and the existing coding standards identified in the project analysis. The integration requirements with the existing codebase include:

- **Framework Removal:** Remove `src/utils/framework.ts`, `axios-svelte.ts`, `axios-vue.ts`, and entire `src/tools/blocks/` directory
- **GitHub API Updates:** Update `src/utils/api.ts` and `axios.ts` for `spartan-ng/spartan` repository endpoints  
- **Schema Evolution:** Update `src/schemas/component.ts` for Angular component validation patterns
- **Tool Implementation:** Modify `src/tools/components/*.ts` for Angular-specific component discovery and parsing

**Key Technical Decisions (based on real project constraints):**
- Maintain existing Winston logging, Axios HTTP client, and Zod validation infrastructure
- Preserve MCP protocol compatibility while updating tool response schemas for Angular components
- Use existing caching mechanisms with updated cache keys for Spartan NG repository structure
- Keep existing CircuitBreaker and error handling patterns for GitHub API integration

**Implementation Sequence for Risk Minimization:**
1. **Repository Client Updates** - Update GitHub API integration first to establish connectivity
2. **Schema Updates** - Modify validation schemas for Angular component structure
3. **Tool Implementation** - Update MCP tools one at a time with fallback capability
4. **Framework Cleanup** - Remove multi-framework code after Angular implementation is validated
5. **Package Updates** - Update metadata and binary names as final step

**Existing System Compatibility Verification:**
- Test MCP client integration (Claude Desktop, VS Code) after each major change
- Validate GitHub token authentication continues working with new repository access
- Ensure existing caching and logging infrastructure functions with updated endpoints
- Verify package build and distribution process works with updated metadata

The architecture provides a clear implementation roadmap that preserves existing system integrity while systematically converting to Angular-only Spartan NG support. The validation with actual repository structure ensures implementation accuracy and reduces integration risks.

---