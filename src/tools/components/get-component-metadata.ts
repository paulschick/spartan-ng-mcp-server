import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';
import { 
  isValidComponentName,
  isSpartanComponent,
  type ComponentMetadataResponse,
  type LightComponentMetadataResponse 
} from '../../schemas/component.js';

export async function handleGetComponentMetadata({ 
  componentName, 
  includeFiles = true 
}: { 
  componentName: string; 
  includeFiles?: boolean; 
}) {
  try {
    // Validate component name format
    if (!isValidComponentName(componentName)) {
      throw new Error(`Invalid component name format: ${componentName}. Component names must use kebab-case (e.g., "alert-dialog", "button")`);
    }
    
    const axios = await getAxiosImplementation();
    const metadata = await axios.getComponentMetadata(componentName);
    
    if (!metadata) {
      throw new Error(`Spartan NG component metadata not found: ${componentName}`);
    }
    
    // Validate metadata structure
    if (!isSpartanComponent(metadata)) {
      logError(`Invalid component metadata structure for ${componentName}`, metadata);
      throw new Error(`Invalid component metadata structure for ${componentName}`);
    }
    
    // Format response based on includeFiles parameter
    let response: ComponentMetadataResponse | LightComponentMetadataResponse;
    
    if (!includeFiles) {
      const { files, ...metadataWithoutFiles } = metadata;
      response = {
        metadata: {
          ...metadataWithoutFiles,
          fileCount: files?.length || 0
        }
      };
    } else {
      response = {
        metadata
      };
    }
    
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify(response, null, 2) 
      }]
    };
  } catch (error) {
    logError(`Failed to get metadata for Spartan NG component "${componentName}"`, error);
    throw new Error(`Failed to get metadata for Spartan NG component "${componentName}": ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const schema = {
  type: "object",
  properties: {
    componentName: {
      type: 'string',
      description: 'Name of the Spartan NG component (e.g., "accordion", "button")'
    },
    includeFiles: {
      type: 'boolean',
      description: 'Include detailed file information in response (default: true)',
      default: true
    }
  },
  required: ['componentName'],
  additionalProperties: false
}; 