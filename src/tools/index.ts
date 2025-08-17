import { handleGetComponent } from './components/get-component.js';
import { handleGetComponentDemo } from './components/get-component-demo.js';
import { handleListComponents } from './components/list-components.js';
import { handleGetComponentMetadata } from './components/get-component-metadata.js';
import { handleGetDirectoryStructure } from './repository/get-directory-structure.js';

import { schema as getComponentSchema } from './components/get-component.js';
import { schema as getComponentDemoSchema } from './components/get-component-demo.js';
import { schema as listComponentsSchema } from './components/list-components.js';
import { schema as getComponentMetadataSchema } from './components/get-component-metadata.js';
import { schema as getDirectoryStructureSchema } from './repository/get-directory-structure.js';

export const toolHandlers = {
  spartan_get_component: handleGetComponent,
  spartan_get_component_demo: handleGetComponentDemo,
  spartan_list_components: handleListComponents,
  spartan_get_component_metadata: handleGetComponentMetadata,
  spartan_get_directory_structure: handleGetDirectoryStructure,
  // Keep legacy names for backward compatibility
  get_component: handleGetComponent,
  get_component_demo: handleGetComponentDemo,
  list_components: handleListComponents,
  get_component_metadata: handleGetComponentMetadata,
  get_directory_structure: handleGetDirectoryStructure
};

export const toolSchemas = {
  spartan_get_component: getComponentSchema,
  spartan_get_component_demo: getComponentDemoSchema,
  spartan_list_components: listComponentsSchema,
  spartan_get_component_metadata: getComponentMetadataSchema,
  spartan_get_directory_structure: getDirectoryStructureSchema,
  // Keep legacy names for backward compatibility
  get_component: getComponentSchema,
  get_component_demo: getComponentDemoSchema,
  list_components: listComponentsSchema,
  get_component_metadata: getComponentMetadataSchema,
  get_directory_structure: getDirectoryStructureSchema
};

export const tools = {
  'spartan_get_component': {
    name: 'spartan_get_component',
    description: 'Get the source code for a specific Spartan NG Angular component from the goetzrobin/spartan repository',
    inputSchema: {
      type: 'object',
      properties: getComponentSchema,
      required: ['componentName']
    }
  },
  'spartan_get_component_demo': {
    name: 'spartan_get_component_demo',
    description: 'Get demo code and usage examples for a specific Spartan NG Angular component from stories and documentation',
    inputSchema: {
      type: 'object',
      properties: getComponentDemoSchema,
      required: ['componentName']
    }
  },
  'spartan_list_components': {
    name: 'spartan_list_components',
    description: 'Get all available Spartan NG Angular components with optional category filtering and categorization',
    inputSchema: listComponentsSchema
  },
  'spartan_get_component_metadata': {
    name: 'spartan_get_component_metadata',
    description: 'Get comprehensive metadata for a specific Spartan NG Angular component including files, dependencies, and Angular-specific information',
    inputSchema: getComponentMetadataSchema
  },
  'spartan_get_directory_structure': {
    name: 'spartan_get_directory_structure',
    description: 'Get the directory structure of the Spartan NG Angular component library (goetzrobin/spartan repository)',
    inputSchema: {
      type: 'object',
      properties: getDirectoryStructureSchema
    }
  },
  // Keep legacy names for backward compatibility
  'get_component': {
    name: 'get_component',
    description: 'Get the source code for a specific Spartan NG Angular component',
    inputSchema: {
      type: 'object',
      properties: getComponentSchema,
      required: ['componentName']
    }
  },
  'get_component_demo': {
    name: 'get_component_demo',
    description: 'Get demo code illustrating how a Spartan NG Angular component should be used',
    inputSchema: {
      type: 'object',
      properties: getComponentDemoSchema,
      required: ['componentName']
    }
  },
  'list_components': {
    name: 'list_components',
    description: 'Get all available Spartan NG Angular components',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  'get_component_metadata': {
    name: 'get_component_metadata',
    description: 'Get metadata for a specific Spartan NG Angular component',
    inputSchema: {
      type: 'object',
      properties: getComponentMetadataSchema,
      required: ['componentName']
    }
  },
  'get_directory_structure': {
    name: 'get_directory_structure',
    description: 'Get the directory structure of the Spartan NG repository',
    inputSchema: {
      type: 'object',
      properties: getDirectoryStructureSchema
    }
  },
}; 