# Coding Standards and Conventions

## Existing Standards Compliance

**Code Style:** TypeScript strict mode with ESLint configuration (inherited from existing setup)  
**Linting Rules:** Existing ESLint rules maintained, extended with Angular-specific conventions  
**Testing Patterns:** Shell script validation (`test-package.sh`) maintained for build verification  
**Documentation Style:** JSDoc comments for public APIs, inline comments for complex logic

## Enhancement-Specific Standards

### Angular Component Naming Conventions
- **Component Files:** Follow discovered Spartan NG pattern - `hlm-{component-name}.ts`
- **Interface Naming:** `SpartanComponent`, `ComponentFile`, `AngularFileType` (PascalCase)
- **Function Naming:** `discoverComponents()`, `getComponentMetadata()` (camelCase)
- **Constant Naming:** `SPARTAN_REPOSITORY_PATH`, `DEFAULT_COMPONENT_CATEGORY` (SCREAMING_SNAKE_CASE)

### File Organization Standards
- **Barrel Exports:** Maintain existing `index.ts` pattern for module exports
- **Service Classes:** Suffix service classes with `Service` - `StoryIntegrationService`
- **Client Classes:** Suffix API clients with `Client` - `SpartanRepositoryClient`
- **Schema Files:** Prefix validation schemas with schema purpose - `spartan-component.ts`

## Critical Integration Rules

- **Existing API Compatibility:** Maintain MCP tool response structure while updating content schemas
- **Database Integration:** Preserve file-based caching patterns with updated cache keys for Angular components
- **Error Handling:** Use existing Winston logging patterns with Angular-specific error context
- **Logging Consistency:** Maintain existing log levels and formatting while adding Angular component context
