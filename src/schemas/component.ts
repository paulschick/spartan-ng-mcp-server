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

