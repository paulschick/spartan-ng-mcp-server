import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';

export async function handleGetComponentMetadata({ 
  componentName, 
  includeFiles = true 
}: { 
  componentName: string; 
  includeFiles?: boolean; 
}) {
  try {
    const axios = await getAxiosImplementation();
    const metadata = await axios.getComponentMetadata(componentName);
    if (!metadata) {
      throw new Error(`Spartan NG component metadata not found: ${componentName}`);
    }
    
    // Optionally exclude file details for lighter responses
    if (!includeFiles) {
      const { files, ...metadataWithoutFiles } = metadata;
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({
            ...metadataWithoutFiles,
            fileCount: files?.length || 0
          }, null, 2) 
        }]
      };
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify(metadata, null, 2) }]
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