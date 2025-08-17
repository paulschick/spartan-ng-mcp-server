import { getAxiosImplementation } from '../../utils/framework.js';
import { logError, logInfo } from '../../utils/logger.js';
import { 
  ComponentFileResponse, 
  isValidComponentName, 
  formatFileTypeForResponse,
  AngularFileType 
} from '../../schemas/component.js';

export async function handleGetComponent({ 
  componentName, 
  includeStories = false, 
  fileTypes 
}: { 
  componentName: string;
  includeStories?: boolean;
  fileTypes?: string[];
}) {
  try {
    // Validate component name
    if (!isValidComponentName(componentName)) {
      throw new Error(`Invalid component name "${componentName}". Component names must follow kebab-case pattern (e.g., "alert-dialog", "button").`);
    }

    logInfo(`Retrieving source code for Spartan NG component: ${componentName}`);

    const axios = await getAxiosImplementation();
    
    // Parse and validate file types if provided
    let parsedFileTypes: AngularFileType[] | undefined;
    if (fileTypes && fileTypes.length > 0) {
      parsedFileTypes = fileTypes.filter((type): type is AngularFileType => 
        ['component', 'token', 'index', 'spec', 'stories'].includes(type)
      );
      
      if (parsedFileTypes.length === 0) {
        throw new Error(`Invalid file types specified. Valid types are: component, token, index, spec, stories.`);
      }
    }

    // Get component metadata
    const componentMetadata = await axios.getComponentMetadata(componentName);
    
    // Get component files with content using the enhanced function
    const files = await axios.getComponentFilesWithContent(
      componentName, 
      includeStories, 
      parsedFileTypes
    );

    if (files.length === 0) {
      throw new Error(`No source files found for component "${componentName}". Component may not exist or may have no TypeScript files.`);
    }

    // Extract exports from index files
    const indexFile = files.find(f => f.fileType === 'index');
    const exports = indexFile ? axios.extractExportsFromIndex(indexFile.content) : [];

    // Analyze dependencies from all files
    const allDependencies = new Set<string>();
    for (const file of files) {
      const analysis = axios.analyzeAngularFileDependencies(file.content);
      analysis.dependencies.forEach(dep => allDependencies.add(dep));
    }

    // Create the response using the ComponentFileResponse schema
    const response: ComponentFileResponse = {
      component: componentMetadata,
      files,
      exports,
      dependencies: Array.from(allDependencies)
    };

    // Format response for MCP tool output
    const formattedFiles = files.map(file => {
      const typeInfo = formatFileTypeForResponse(file);
      return {
        fileName: file.fileName,
        fileType: typeInfo.fileType,
        fileTypeDescription: typeInfo.fileTypeDescription,
        size: file.size,
        sizeFormatted: `${(file.size / 1024).toFixed(1)} KB`,
        lastModified: typeInfo.lastModified,
        content: file.content
      };
    });

    const summary = {
      componentName: componentMetadata.name,
      displayName: componentMetadata.displayName,
      category: componentMetadata.category,
      framework: componentMetadata.framework,
      library: componentMetadata.library,
      totalFiles: files.length,
      fileTypes: [...new Set(files.map(f => f.fileType))],
      exports: exports.length,
      dependencies: Array.from(allDependencies).length
    };

    logInfo(`Successfully retrieved ${files.length} source files for component ${componentName}`);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            summary,
            files: formattedFiles,
            exports,
            dependencies: Array.from(allDependencies)
          }, null, 2)
        }
      ]
    };

  } catch (error) {
    logError(`Failed to get Spartan NG component source code for "${componentName}"`, error);
    
    // Provide helpful error messages based on error type
    let errorMessage = `Failed to get Spartan NG component "${componentName}"`;
    
    if (error instanceof Error) {
      if (error.message.includes('not found') || error.message.includes('404')) {
        errorMessage += `. Component "${componentName}" does not exist in the Spartan NG repository. Use the list components tool to see available components.`;
      } else if (error.message.includes('rate limit')) {
        errorMessage += '. GitHub API rate limit exceeded. Consider setting GITHUB_PERSONAL_ACCESS_TOKEN environment variable for higher limits.';
      } else if (error.message.includes('timeout')) {
        errorMessage += '. Request timed out. The GitHub API may be experiencing issues or the component may have many files.';
      } else {
        errorMessage += `: ${error.message}`;
      }
    } else {
      errorMessage += `: ${String(error)}`;
    }
    
    throw new Error(errorMessage);
  }
}

export const schema = {
  componentName: {
    type: 'string',
    description: 'Name of the Spartan NG component (e.g., "accordion", "button")'
  },
  includeStories: {
    type: 'boolean',
    description: 'Include Storybook story files in the response (default: false)',
    optional: true
  },
  fileTypes: {
    type: 'array',
    description: 'Specific file types to include: component, token, index, spec, stories (default: all available)',
    items: {
      type: 'string'
    },
    optional: true
  }
}; 