// Schema definitions for Spartan NG Angular components

/**
 * Angular-specific file types in Spartan NG components
 */
export type AngularFileType = 'component' | 'token' | 'index' | 'spec' | 'stories';

/**
 * Component categories for Spartan NG organization
 */
export type ComponentCategory = 'form' | 'layout' | 'navigation' | 'feedback' | 'overlay' | 'display' | 'other';

/**
 * Angular component types
 */
export type AngularComponentType = 'component' | 'directive' | 'pipe';

/**
 * Component file structure in Spartan NG
 */
export interface ComponentFile {
  fileName: string;
  filePath: string;
  fileType: AngularFileType;
}

/**
 * Spartan NG component metadata structure
 */
export interface SpartanComponent {
  name: string;
  displayName: string;
  description: string;
  type: 'spartan:helm';
  componentType: AngularComponentType;
  framework: 'angular';
  library: 'spartan-ng';
  repositoryPath: string;
  angularModule: string;
  exports: string[];
  dependencies: string[];
  files: ComponentFile[];
  category: ComponentCategory;
}

/**
 * Legacy component info interface (maintained for compatibility)
 */
export interface ComponentInfo {
  name: string;
  description: string;
  url?: string;
  inputs?: ComponentInput[];
  outputs?: ComponentOutput[];
  examples?: ComponentExample[];
  source?: string;
  installation?: string;
  directive?: string;
  selector?: string;
}

export interface ComponentExample {
  title: string;
  code: string;
  url?: string;
}

export interface ComponentInput {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

export interface Theme {
  name: string;
  description: string;
  url?: string;
}

/**
 * MCP Tool Response schema for component listing
 */
export interface ComponentListResponse {
  components: Array<{
    name: string;
    category: ComponentCategory;
    displayName: string;
  }>;
  categories: string[];
  total: number;
  filteredBy?: string;
}

/**
 * MCP Tool Response schema for simplified component listing (names only)
 */
export interface SimpleComponentListResponse {
  components: string[];
  total: number;
}

/**
 * MCP Tool Response schema for component metadata
 */
export interface ComponentMetadataResponse {
  metadata: SpartanComponent;
}

/**
 * MCP Tool Response schema for component metadata without files
 */
export interface LightComponentMetadataResponse {
  metadata: Omit<SpartanComponent, 'files'> & {
    fileCount: number;
  };
}

/**
 * MCP Tool Response schema for component source code retrieval
 */
export interface ComponentFileResponse {
  component: SpartanComponent;
  files: EnhancedComponentFile[];
  exports: string[];
  dependencies: string[];
}

/**
 * Angular component dependency information
 */
export interface AngularDependency {
  name: string;
  type: 'internal' | 'external' | 'angular';
  version?: string;
  importPath: string;
}

/**
 * Enhanced component file with content and size information for source retrieval
 */
export interface EnhancedComponentFile extends ComponentFile {
  content: string;
  size: number;
  lastModified: Date;
  sha?: string;
  downloadUrl?: string;
}

/**
 * Component validation result for MCP tool responses
 */
export interface ComponentValidationResult {
  isValid: boolean;
  componentName: string;
  errors: string[];
  warnings: string[];
  structure: {
    hasIndex: boolean;
    hasMainComponent: boolean;
    hasTokenFile: boolean;
    hasSpecFile: boolean;
    hasStoriesFile: boolean;
  };
}

/**
 * Repository information for components
 */
export interface ComponentRepositoryInfo {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  lastModified?: string;
  sha?: string;
}

/**
 * Validation function for Spartan NG component names
 * @param componentName The component name to validate
 * @returns True if valid, false otherwise
 */
export function isValidComponentName(componentName: string): boolean {
  // Spartan NG components follow kebab-case naming pattern
  const validComponentPattern = /^[a-z]+(-[a-z]+)*$/;
  return validComponentPattern.test(componentName);
}

/**
 * Validation function for Angular file types
 * @param fileType The file type to validate
 * @returns True if valid Angular file type, false otherwise
 */
export function isValidAngularFileType(fileType: string): fileType is AngularFileType {
  const validTypes: AngularFileType[] = ['component', 'token', 'index', 'spec', 'stories'];
  return validTypes.includes(fileType as AngularFileType);
}

/**
 * Validation function for component categories
 * @param category The category to validate
 * @returns True if valid category, false otherwise
 */
export function isValidComponentCategory(category: string): category is ComponentCategory {
  const validCategories: ComponentCategory[] = ['form', 'layout', 'navigation', 'feedback', 'overlay', 'display', 'other'];
  return validCategories.includes(category as ComponentCategory);
}

/**
 * Type guard for SpartanComponent interface
 * @param obj Object to check
 * @returns True if object matches SpartanComponent interface
 */
export function isSpartanComponent(obj: any): obj is SpartanComponent {
  return obj &&
    typeof obj.name === 'string' &&
    typeof obj.displayName === 'string' &&
    typeof obj.description === 'string' &&
    obj.type === 'spartan:helm' &&
    typeof obj.componentType === 'string' &&
    obj.framework === 'angular' &&
    obj.library === 'spartan-ng' &&
    typeof obj.repositoryPath === 'string' &&
    typeof obj.angularModule === 'string' &&
    Array.isArray(obj.exports) &&
    Array.isArray(obj.dependencies) &&
    Array.isArray(obj.files) &&
    isValidComponentCategory(obj.category);
}

/**
 * Validation function for Angular file content structure
 * @param content File content to validate
 * @param fileType Angular file type to validate against
 * @returns True if content matches expected structure for file type
 */
export function isValidAngularFileContent(content: string, fileType: AngularFileType): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }

  switch (fileType) {
    case 'component':
      // Component files should contain class declaration and @Component decorator
      return /class\s+\w+.*Component/i.test(content) || content.includes('@Component') || content.includes('export');
    case 'token':
      // Token files contain design token definitions
      return content.includes('export') && (content.includes('token') || content.includes('Token'));
    case 'index':
      // Index files contain exports
      return content.includes('export');
    case 'spec':
      // Spec files contain test definitions
      return content.includes('describe') || content.includes('it(') || content.includes('test(');
    case 'stories':
      // Stories files contain Storybook story definitions
      return content.includes('export') && (content.includes('Story') || content.includes('story'));
    default:
      return true; // Allow unknown file types for extensibility
  }
}

/**
 * Type guard for EnhancedComponentFile interface
 * @param obj Object to check
 * @returns True if object matches EnhancedComponentFile interface
 */
export function isValidEnhancedComponentFile(obj: any): obj is EnhancedComponentFile {
  return obj &&
    typeof obj.fileName === 'string' &&
    typeof obj.filePath === 'string' &&
    isValidAngularFileType(obj.fileType) &&
    typeof obj.content === 'string' &&
    typeof obj.size === 'number' &&
    obj.lastModified instanceof Date;
}

/**
 * Type guard for ComponentFileResponse interface
 * @param obj Object to check
 * @returns True if object matches ComponentFileResponse interface
 */
export function isValidComponentFileResponse(obj: any): obj is ComponentFileResponse {
  return obj &&
    isSpartanComponent(obj.component) &&
    Array.isArray(obj.files) &&
    obj.files.every((file: any) => isValidEnhancedComponentFile(file)) &&
    Array.isArray(obj.exports) &&
    obj.exports.every((exp: any) => typeof exp === 'string') &&
    Array.isArray(obj.dependencies) &&
    obj.dependencies.every((dep: any) => typeof dep === 'string');
}

/**
 * Identify Angular file type from filename and path
 * @param fileName Name of the file
 * @param filePath Full path to the file
 * @returns AngularFileType or 'component' as default
 */
export function identifyAngularFileType(fileName: string, filePath: string): AngularFileType {
  if (fileName.includes('.token.')) {
    return 'token';
  }
  if (fileName === 'index.ts' || fileName.endsWith('index.ts')) {
    return 'index';
  }
  if (fileName.includes('.spec.') || fileName.includes('.test.')) {
    return 'spec';
  }
  if (fileName.includes('.stories.')) {
    return 'stories';
  }
  // Default to component for .ts files
  return 'component';
}

/**
 * Format file type for tool responses with proper identification
 * @param file Enhanced component file
 * @returns Formatted file information with type identification
 */
export function formatFileTypeForResponse(file: EnhancedComponentFile): {
  fileName: string;
  fileType: AngularFileType;
  fileTypeDescription: string;
  size: number;
  lastModified: string;
} {
  const typeDescriptions: Record<AngularFileType, string> = {
    component: 'Angular Component/Directive',
    token: 'Angular Design Token',
    index: 'Module Export Index',
    spec: 'Unit Test Specification',
    stories: 'Storybook Story Definition'
  };

  return {
    fileName: file.fileName,
    fileType: file.fileType,
    fileTypeDescription: typeDescriptions[file.fileType] || 'Angular Source File',
    size: file.size,
    lastModified: file.lastModified.toISOString()
  };
}

/**
 * Create a valid ComponentListResponse from component data
 * @param components Array of component data
 * @param categories Available categories
 * @param filteredBy Optional filter applied
 * @returns Validated ComponentListResponse
 */
export function createComponentListResponse(
  components: Array<{ name: string; category: string; displayName: string }>,
  categories: string[],
  filteredBy?: string
): ComponentListResponse {
  return {
    components: components.map(comp => ({
      name: comp.name,
      category: isValidComponentCategory(comp.category) ? comp.category : 'other',
      displayName: comp.displayName
    })),
    categories: categories.filter(cat => isValidComponentCategory(cat)),
    total: components.length,
    ...(filteredBy && { filteredBy })
  };
}

/**
 * Enhanced SpartanComponent with additional metadata for MCP responses
 */
export interface SpartanComponentEnhanced extends Omit<SpartanComponent, 'dependencies' | 'files'> {
  repositoryInfo: ComponentRepositoryInfo;
  validation: ComponentValidationResult;
  enhancedFiles: EnhancedComponentFile[];
  enhancedDependencies: AngularDependency[];
  dependencies: string[]; // Keep original string array for compatibility
}

