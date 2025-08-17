import { Axios } from "axios";
import { logError, logWarning, logInfo } from './logger.js';
import { 
    AngularFileType, 
    EnhancedComponentFile, 
    identifyAngularFileType,
    isValidAngularFileContent 
} from '../schemas/component.js';

// Constants for the spartan repository structure
const REPO_OWNER = 'goetzrobin';
const REPO_NAME = 'spartan';
const REPO_BRANCH = 'main';
const HELM_PATH = 'libs/helm';

// GitHub API for accessing repository structure and metadata
const githubApi = new Axios({
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json",
        "User-Agent": "Mozilla/5.0 (compatible; SpartanNgMcpServer/1.0.0)",
        ...(process.env.GITHUB_PERSONAL_ACCESS_TOKEN && {
            "Authorization": `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        })
    },
    timeout: 30000, // Increased from 15000 to 30000 (30 seconds)
    transformResponse: [(data) => {
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }],
});

// GitHub Raw for directly fetching file contents
const githubRaw = new Axios({
    baseURL: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`,
    headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SpartanNgMcpServer/1.0.0)",
    },
    timeout: 30000, // Increased from 15000 to 30000 (30 seconds)
    transformResponse: [(data) => data], // Return raw data
});

/**
 * Fetch component source code from the spartan helm library
 * @param componentName Name of the component
 * @returns Promise with component source code
 */
async function getComponentSource(componentName: string): Promise<string> {
    // Try to get the main component TypeScript file
    const componentPath = `${HELM_PATH}/${componentName.toLowerCase()}/src/lib/${componentName.toLowerCase()}.directive.ts`;
    
    try {
        const response = await githubRaw.get(`/${componentPath}`);
        return response.data;
    } catch (error) {
        // Fallback: try alternative file patterns for Angular components
        const fallbackPaths = [
            `${HELM_PATH}/${componentName.toLowerCase()}/src/lib/hlm-${componentName.toLowerCase()}.ts`,
            `${HELM_PATH}/${componentName.toLowerCase()}/src/index.ts`,
            `${HELM_PATH}/${componentName.toLowerCase()}/index.ts`
        ];
        
        for (const fallbackPath of fallbackPaths) {
            try {
                const fallbackResponse = await githubRaw.get(`/${fallbackPath}`);
                return fallbackResponse.data;
            } catch {
                // Continue to next fallback
            }
        }
        
        throw new Error(`Component "${componentName}" not found in spartan helm library`);
    }
}

/**
 * Fetch complete component files with content for Angular source code retrieval
 * @param componentName Name of the component
 * @param includeStories Whether to include story files (default: false)
 * @param fileTypes Optional array of specific file types to include
 * @returns Promise with array of enhanced component files with content
 */
async function getComponentFilesWithContent(
    componentName: string, 
    includeStories: boolean = false,
    fileTypes?: AngularFileType[]
): Promise<EnhancedComponentFile[]> {
    const componentPath = `${HELM_PATH}/${componentName.toLowerCase()}`;
    const files: EnhancedComponentFile[] = [];

    try {
        // Get the main component directory structure
        const libResponse = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${componentPath}/src/lib`);
        
        if (!Array.isArray(libResponse.data)) {
            throw new Error(`Invalid response for component ${componentName} lib directory`);
        }

        // Process each file in the lib directory
        for (const file of libResponse.data) {
            if (file.type !== 'file') continue;

            const fileName = file.name;
            const filePath = file.path;
            
            // Identify file type using the schema function
            const fileType = identifyAngularFileType(fileName, filePath);
            
            // Skip if specific file types are requested and this file doesn't match
            if (fileTypes && !fileTypes.includes(fileType)) continue;
            
            // Skip stories files unless specifically requested
            if (fileType === 'stories' && !includeStories) continue;
            
            // Only process TypeScript files for now
            if (!fileName.endsWith('.ts')) continue;

            try {
                // Fetch file content
                const contentResponse = await githubRaw.get(`/${filePath}`);
                const content = contentResponse.data;
                
                // Validate content structure
                if (!isValidAngularFileContent(content, fileType)) {
                    logWarning(`File ${fileName} content validation failed for type ${fileType}`);
                }

                const enhancedFile: EnhancedComponentFile = {
                    fileName,
                    filePath,
                    fileType,
                    content,
                    size: content.length,
                    lastModified: new Date(file.last_modified || Date.now()),
                    sha: file.sha,
                    downloadUrl: file.download_url
                };

                files.push(enhancedFile);
            } catch (contentError) {
                logWarning(`Failed to fetch content for file ${fileName}: ${contentError instanceof Error ? contentError.message : String(contentError)}`);
            }
        }

        // Also try to get the index.ts file from src/
        try {
            const indexResponse = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${componentPath}/src/index.ts`);
            if (indexResponse.data && indexResponse.data.type === 'file') {
                const contentResponse = await githubRaw.get(`/${indexResponse.data.path}`);
                const content = contentResponse.data;
                
                const indexFile: EnhancedComponentFile = {
                    fileName: 'index.ts',
                    filePath: indexResponse.data.path,
                    fileType: 'index',
                    content,
                    size: content.length,
                    lastModified: new Date(indexResponse.data.last_modified || Date.now()),
                    sha: indexResponse.data.sha,
                    downloadUrl: indexResponse.data.download_url
                };

                files.push(indexFile);
            }
        } catch (indexError) {
            logWarning(`Could not fetch index.ts for ${componentName}: ${indexError instanceof Error ? indexError.message : String(indexError)}`);
        }

        return files;
    } catch (error) {
        logError(`Error fetching component files for ${componentName}`, error);
        throw new Error(`Failed to fetch component files for "${componentName}": ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Fetch component stories/examples from the spartan repository
 * @param componentName Name of the component
 * @returns Promise with component story code
 */
async function getComponentDemo(componentName: string): Promise<string> {
    // Try to get Storybook stories for the component
    const storyPaths = [
        `apps/ui-storybook/src/stories/${componentName.toLowerCase()}.stories.ts`,
        `apps/storybook/stories/${componentName.toLowerCase()}.stories.ts`,
        `${HELM_PATH}/${componentName.toLowerCase()}/src/lib/${componentName.toLowerCase()}.stories.ts`
    ];
    
    for (const storyPath of storyPaths) {
        try {
            const response = await githubRaw.get(`/${storyPath}`);
            return response.data;
        } catch {
            // Continue to next path
        }
    }
    
    throw new Error(`Stories for component "${componentName}" not found in spartan repository`);
}

/**
 * Organize component files according to Angular component patterns
 * @param files Array of enhanced component files
 * @returns Organized file structure following Angular patterns
 */
function organizeAngularComponentFiles(files: EnhancedComponentFile[]): {
    core: EnhancedComponentFile[];
    tokens: EnhancedComponentFile[];
    tests: EnhancedComponentFile[];
    stories: EnhancedComponentFile[];
    exports: EnhancedComponentFile[];
} {
    const organized = {
        core: [] as EnhancedComponentFile[],
        tokens: [] as EnhancedComponentFile[],
        tests: [] as EnhancedComponentFile[],
        stories: [] as EnhancedComponentFile[],
        exports: [] as EnhancedComponentFile[]
    };

    for (const file of files) {
        switch (file.fileType) {
            case 'component':
                organized.core.push(file);
                break;
            case 'token':
                organized.tokens.push(file);
                break;
            case 'spec':
                organized.tests.push(file);
                break;
            case 'stories':
                organized.stories.push(file);
                break;
            case 'index':
                organized.exports.push(file);
                break;
            default:
                // Default to core for unknown types
                organized.core.push(file);
        }
    }

    // Sort each category by file name for consistency
    Object.keys(organized).forEach(key => {
        organized[key as keyof typeof organized].sort((a, b) => a.fileName.localeCompare(b.fileName));
    });

    return organized;
}

/**
 * Get Angular file patterns for a component
 * @param componentName Name of the component
 * @returns Expected file patterns for the component
 */
function getAngularComponentFilePatterns(componentName: string): {
    expectedFiles: Array<{pattern: string, type: AngularFileType, required: boolean}>;
    possiblePaths: string[];
} {
    const baseFileName = `hlm-${componentName.toLowerCase()}`;
    const componentPath = `${HELM_PATH}/${componentName.toLowerCase()}/src/lib`;
    
    return {
        expectedFiles: [
            { pattern: `${baseFileName}.ts`, type: 'component', required: true },
            { pattern: `${baseFileName}.token.ts`, type: 'token', required: false },
            { pattern: `${baseFileName}.spec.ts`, type: 'spec', required: false },
            { pattern: `${baseFileName}.stories.ts`, type: 'stories', required: false },
            { pattern: 'index.ts', type: 'index', required: true }
        ],
        possiblePaths: [
            `${componentPath}/${baseFileName}.ts`,
            `${componentPath}/${baseFileName}.token.ts`,
            `${componentPath}/${baseFileName}.spec.ts`,
            `${componentPath}/${baseFileName}.stories.ts`,
            `${HELM_PATH}/${componentName.toLowerCase()}/src/index.ts`
        ]
    };
}

/**
 * Analyze Angular file dependencies and exports
 * @param content File content to analyze
 * @returns Dependency analysis result
 */
function analyzeAngularFileDependencies(content: string): {
    dependencies: string[];
    exports: string[];
    componentType?: 'component' | 'directive' | 'pipe';
    imports: Array<{module: string, items: string[]}>;
} {
    const result = {
        dependencies: [] as string[],
        exports: [] as string[],
        componentType: undefined as 'component' | 'directive' | 'pipe' | undefined,
        imports: [] as Array<{module: string, items: string[]}>
    };

    // Extract import statements with detailed parsing
    const importMatches = content.match(/import\s*{[^}]*}\s*from\s*['"`]([^'"`]+)['"`]/g) || [];
    const simpleImportMatches = content.match(/import\s*['"`]([^'"`]+)['"`]/g) || [];
    const starImportMatches = content.match(/import\s*\*\s*as\s*\w+\s*from\s*['"`]([^'"`]+)['"`]/g) || [];

    // Process detailed imports
    importMatches.forEach(importStatement => {
        const moduleMatch = importStatement.match(/from\s*['"`]([^'"`]+)['"`]/);
        const itemsMatch = importStatement.match(/{\s*([^}]+)\s*}/);
        
        if (moduleMatch) {
            const module = moduleMatch[1];
            const items = itemsMatch 
                ? itemsMatch[1].split(',').map(item => item.trim()).filter(Boolean)
                : [];
            
            result.imports.push({ module, items });
            
            // Add to dependencies if it's an external module
            if (module.startsWith('@') || module.startsWith('libs/') || !module.startsWith('.')) {
                result.dependencies.push(module);
            }
        }
    });

    // Process simple imports
    simpleImportMatches.forEach(importStatement => {
        const match = importStatement.match(/import\s*['"`]([^'"`]+)['"`]/);
        if (match) {
            const module = match[1];
            result.imports.push({ module, items: [] });
            
            if (module.startsWith('@') || module.startsWith('libs/') || !module.startsWith('.')) {
                result.dependencies.push(module);
            }
        }
    });

    // Process star imports
    starImportMatches.forEach(importStatement => {
        const match = importStatement.match(/from\s*['"`]([^'"`]+)['"`]/);
        if (match) {
            const module = match[1];
            result.imports.push({ module, items: ['*'] });
            
            if (module.startsWith('@') || module.startsWith('libs/') || !module.startsWith('.')) {
                result.dependencies.push(module);
            }
        }
    });

    // Extract exports
    const exportMatches = content.match(/export\s*{[^}]*}/g) || [];
    const exportFromMatches = content.match(/export\s*\*\s*from\s*['"`]([^'"`]+)['"`]/g) || [];
    const exportClassMatches = content.match(/export\s*(class|interface|function|const|let|var)\s+(\w+)/g) || [];

    exportMatches.forEach(exportStatement => {
        const itemsMatch = exportStatement.match(/{\s*([^}]+)\s*}/);
        if (itemsMatch) {
            const items = itemsMatch[1].split(',').map(item => item.trim()).filter(Boolean);
            result.exports.push(...items);
        }
    });

    exportFromMatches.forEach(exportStatement => {
        const match = exportStatement.match(/from\s*['"`]([^'"`]+)['"`]/);
        if (match) {
            result.exports.push(`* from ${match[1]}`);
        }
    });

    exportClassMatches.forEach(exportStatement => {
        const match = exportStatement.match(/export\s*(?:class|interface|function|const|let|var)\s+(\w+)/);
        if (match) {
            result.exports.push(match[1]);
        }
    });

    // Determine component type
    if (content.includes('@Component')) {
        result.componentType = 'component';
    } else if (content.includes('@Directive')) {
        result.componentType = 'directive';
    } else if (content.includes('@Pipe')) {
        result.componentType = 'pipe';
    }

    // Remove duplicates and filter
    result.dependencies = [...new Set(result.dependencies)].filter(Boolean);
    result.exports = [...new Set(result.exports)].filter(Boolean);

    return result;
}

/**
 * Extract exports from index.ts file
 * @param indexContent Content of the index.ts file
 * @returns Array of exported items
 */
function extractExportsFromIndex(indexContent: string): string[] {
    const exports: string[] = [];
    
    // Match export * from patterns
    const exportStarMatches = indexContent.match(/export\s*\*\s*from\s*['"`]([^'"`]+)['"`]/g) || [];
    exportStarMatches.forEach(match => {
        const moduleMatch = match.match(/from\s*['"`]([^'"`]+)['"`]/);
        if (moduleMatch) {
            exports.push(`* from ${moduleMatch[1]}`);
        }
    });
    
    // Match export { ... } from patterns
    const exportNamedMatches = indexContent.match(/export\s*{[^}]*}\s*from\s*['"`]([^'"`]+)['"`]/g) || [];
    exportNamedMatches.forEach(match => {
        const itemsMatch = match.match(/{\s*([^}]+)\s*}/);
        const moduleMatch = match.match(/from\s*['"`]([^'"`]+)['"`]/);
        if (itemsMatch && moduleMatch) {
            const items = itemsMatch[1].split(',').map(item => item.trim()).filter(Boolean);
            exports.push(...items);
        }
    });
    
    // Match direct exports
    const directExportMatches = indexContent.match(/export\s*{[^}]*}/g) || [];
    directExportMatches.forEach(match => {
        const itemsMatch = match.match(/{\s*([^}]+)\s*}/);
        if (itemsMatch) {
            const items = itemsMatch[1].split(',').map(item => item.trim()).filter(Boolean);
            exports.push(...items);
        }
    });
    
    return [...new Set(exports)].filter(Boolean);
}

/**
 * Fetch all available components from the spartan helm library
 * @returns Promise with list of component names
 */
async function getAvailableComponents(): Promise<string[]> {
    try {
        // Get components from the libs/helm directory
        const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${HELM_PATH}`);
        
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Invalid response from GitHub API');
        }
        
        const components = response.data
            .filter((item: any) => {
                // Only include directories that are actual components
                if (item.type !== 'dir') return false;
                
                // Exclude hidden directories and system directories
                if (item.name.startsWith('.')) return false;
                
                // Exclude Spartan NG library infrastructure directories/files
                const excludedNames = [
                    'src', // Library source root
                    'node_modules', // Dependencies
                    'dist', // Build output
                    '.git' // Version control
                ];
                
                if (excludedNames.includes(item.name)) return false;
                
                // Spartan NG components follow kebab-case naming pattern
                // Valid component names: accordion, alert-dialog, button, etc.
                const validComponentPattern = /^[a-z]+(-[a-z]+)*$/;
                return validComponentPattern.test(item.name);
            })
            .map((item: any) => item.name);
            
        if (components.length === 0) {
            throw new Error('No components found in the spartan helm library');
        }
        
        return components;
    } catch (error: any) {
        logError('Error fetching components from GitHub API', error);
        
        // Check for specific error types
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Unknown error';
            
            if (status === 403 && message.includes('rate limit')) {
                throw new Error(`GitHub API rate limit exceeded. Please set GITHUB_PERSONAL_ACCESS_TOKEN environment variable for higher limits. Error: ${message}`);
            } else if (status === 404) {
                throw new Error(`Components directory not found. The path ${HELM_PATH} may not exist in the repository.`);
            } else if (status === 401) {
                throw new Error(`Authentication failed. Please check your GITHUB_PERSONAL_ACCESS_TOKEN if provided.`);
            } else {
                throw new Error(`GitHub API error (${status}): ${message}`);
            }
        }
        
        // If it's a network error or other issue, provide a fallback
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
            throw new Error(`Network error: ${error.message}. Please check your internet connection.`);
        }
        
        // If all else fails, provide a fallback list of known components
        logWarning('Using fallback component list due to API issues');
        return getFallbackComponents();
    }
}

/**
 * Fallback list of known Spartan NG helm components
 * This is used when the GitHub API is unavailable
 */
function getFallbackComponents(): string[] {
    return [
        'accordion',
        'alert',
        'alert-dialog',
        'aspect-ratio',
        'avatar',
        'badge',
        'breadcrumb',
        'button',
        'calendar',
        'card',
        'carousel',
        'checkbox',
        'command',
        'date-picker',
        'dialog',
        'form-field',
        'hover-card',
        'icon',
        'input',
        'input-otp',
        'label',
        'menu',
        'pagination',
        'popover',
        'progress',
        'radio-group',
        'scroll-area',
        'select',
        'separator',
        'sheet',
        'skeleton',
        'slider',
        'sonner',
        'spinner',
        'switch',
        'table',
        'tabs',
        'toggle',
        'toggle-group',
        'tooltip',
        'typography'
    ];
}

/**
 * Fetch component metadata from the spartan helm library with Angular-specific information
 * @param componentName Name of the component
 * @returns Promise with component metadata
 */
async function getComponentMetadata(componentName: string): Promise<any> {
    try {
        const componentPath = `${HELM_PATH}/${componentName.toLowerCase()}`;
        
        // Fetch index.ts to extract exports and module information
        const indexPath = `${componentPath}/src/index.ts`;
        let indexContent = '';
        let exports: string[] = [];
        let angularModuleName = '';
        
        try {
            const indexResponse = await githubRaw.get(`/${indexPath}`);
            indexContent = indexResponse.data;
            
            // Extract exports from index.ts
            const exportMatches = indexContent.match(/export \* from ['"`]([^'"`]+)['"`]/g) || [];
            const namedExports = indexContent.match(/export \{([^}]+)\}/g) || [];
            
            // Parse exports
            exports = [
                ...exportMatches.map(match => {
                    const moduleMatch = match.match(/from ['"`]([^'"`]+)['"`]/);
                    return moduleMatch ? moduleMatch[1] : '';
                }).filter(Boolean),
                ...namedExports.map(match => {
                    const namedMatch = match.match(/\{([^}]+)\}/);
                    return namedMatch ? namedMatch[1].split(',').map(exp => exp.trim()) : [];
                }).flat()
            ];
            
            // Extract Angular module name
            const moduleMatch = indexContent.match(/export class (\w+Module)/);
            if (moduleMatch) {
                angularModuleName = moduleMatch[1];
            }
        } catch (indexError) {
            logWarning(`Could not fetch index.ts for ${componentName}: ${indexError instanceof Error ? indexError.message : String(indexError)}`);
        }
        
        // Fetch component files to get component information
        const componentFiles: Array<{fileName: string, filePath: string, fileType: AngularFileType}> = [];
        try {
            const libResponse = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${componentPath}/src/lib`);
            if (Array.isArray(libResponse.data)) {
                for (const file of libResponse.data) {
                    if (file.type === 'file' && file.name.endsWith('.ts')) {
                        // Use the schema function for proper file type identification
                        const fileType = identifyAngularFileType(file.name, file.path);
                        
                        componentFiles.push({
                            fileName: file.name,
                            filePath: file.path,
                            fileType
                        });
                    }
                }
            }
        } catch (libError) {
            logWarning(`Could not fetch lib directory for ${componentName}: ${libError instanceof Error ? libError.message : String(libError)}`);
        }
        
        // Extract dependencies from the main component file with enhanced analysis
        let dependencies: string[] = [];
        let componentType = 'directive'; // Default for Spartan NG helm components
        
        if (componentFiles.length > 0) {
            const mainComponentFile = componentFiles.find(f => f.fileType === 'component' && !f.fileName.includes('.token.'));
            if (mainComponentFile) {
                try {
                    const componentResponse = await githubRaw.get(`/${mainComponentFile.filePath}`);
                    const componentContent = componentResponse.data;
                    
                    // Enhanced dependency analysis
                    const analysisResult = analyzeAngularFileDependencies(componentContent);
                    dependencies = analysisResult.dependencies;
                    componentType = analysisResult.componentType || componentType;
                } catch (componentError) {
                    logWarning(`Could not fetch main component file for ${componentName}: ${componentError instanceof Error ? componentError.message : String(componentError)}`);
                }
            }
        }
        
        return {
            name: componentName,
            displayName: componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            description: `Spartan NG ${componentName} component`,
            type: 'spartan:helm',
            componentType,
            framework: 'angular',
            library: 'spartan-ng',
            repositoryPath: componentPath,
            angularModule: angularModuleName,
            exports,
            dependencies: [...new Set(dependencies)], // Remove duplicates
            files: componentFiles,
            category: getCategoryFromComponentName(componentName)
        };
    } catch (error) {
        // Fallback metadata if fetching fails
        logWarning(`Could not get metadata for ${componentName}, using fallback metadata: ${error instanceof Error ? error.message : String(error)}`);
        return {
            name: componentName,
            displayName: componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            description: `Spartan NG ${componentName} component`,
            type: 'spartan:helm',
            componentType: 'directive',
            framework: 'angular',
            library: 'spartan-ng',
            repositoryPath: `${HELM_PATH}/${componentName.toLowerCase()}`,
            angularModule: '',
            exports: [],
            dependencies: ['@angular/core'],
            files: [],
            category: 'other'
        };
    }
}

/**
 * Component categorization mapping for Spartan NG structure
 * Based on actual repository structure and UI/UX patterns
 */
const COMPONENT_CATEGORIES: Record<string, string[]> = {
    form: [
        'input', 'input-otp', 'checkbox', 'radio-group', 'select', 
        'switch', 'slider', 'form-field', 'label', 'date-picker'
    ],
    layout: [
        'card', 'sheet', 'separator', 'aspect-ratio', 'scroll-area'
    ],
    navigation: [
        'breadcrumb', 'pagination', 'tabs', 'menu', 'command'
    ],
    feedback: [
        'alert', 'progress', 'spinner', 'skeleton', 'sonner', 'tooltip'
    ],
    overlay: [
        'dialog', 'alert-dialog', 'popover', 'hover-card'
    ],
    display: [
        'avatar', 'badge', 'button', 'typography', 'table', 'calendar', 
        'carousel', 'accordion', 'icon', 'toggle', 'toggle-group'
    ]
};

/**
 * Get all available component categories
 * @returns Array of available categories
 */
function getAvailableCategories(): string[] {
    return Object.keys(COMPONENT_CATEGORIES);
}

/**
 * Get components for a specific category
 * @param category Category name
 * @returns Array of component names in the category
 */
function getComponentsByCategory(category: string): string[] {
    return COMPONENT_CATEGORIES[category] || [];
}

/**
 * Determine component category based on component name
 * @param componentName Name of the component
 * @returns Component category
 */
function getCategoryFromComponentName(componentName: string): string {
    for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
        if (components.includes(componentName)) {
            return category;
        }
    }
    return 'other';
}

/**
 * Fetch all available components with categorization information
 * @param categoryFilter Optional category to filter by
 * @returns Promise with categorized component list
 */
async function getAvailableComponentsWithCategories(categoryFilter?: string): Promise<{
    components: Array<{ name: string; category: string; displayName: string }>;
    categories: string[];
    totalCount: number;
}> {
    try {
        const allComponents = await getAvailableComponents();
        const categories = getAvailableCategories();
        
        // Map components with their categories
        const componentsWithCategories = allComponents.map(componentName => ({
            name: componentName,
            category: getCategoryFromComponentName(componentName),
            displayName: componentName.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        }));
        
        // Filter by category if specified
        const filteredComponents = categoryFilter 
            ? componentsWithCategories.filter(comp => comp.category === categoryFilter)
            : componentsWithCategories;
        
        // Sort components by category, then by name
        const sortedComponents = filteredComponents.sort((a, b) => {
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            return a.name.localeCompare(b.name);
        });
        
        return {
            components: sortedComponents,
            categories,
            totalCount: sortedComponents.length
        };
    } catch (error) {
        logError('Error fetching categorized components', error);
        throw error;
    }
}

/**
 * Recursively builds a directory tree structure from a GitHub repository
 * @param owner Repository owner
 * @param repo Repository name  
 * @param path Path within the repository to start building the tree from
 * @param branch Branch name
 * @returns Promise resolving to the directory tree structure
 */
async function buildDirectoryTree(
    owner: string = REPO_OWNER,
    repo: string = REPO_NAME,
    path: string = HELM_PATH,
    branch: string = REPO_BRANCH
): Promise<any> {
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}?ref=${branch}`);
        
        if (!response.data) {
            throw new Error('No data received from GitHub API');
        }

        const contents = response.data;
        
        // Handle different response types from GitHub API
        if (!Array.isArray(contents)) {
                    // Check if it's an error response (like rate limit)
        if (contents.message) {
            const message: string = contents.message;
            if (message.includes('rate limit exceeded')) {
                throw new Error(`GitHub API rate limit exceeded. ${message} Consider setting GITHUB_PERSONAL_ACCESS_TOKEN environment variable for higher rate limits.`);
            } else if (message.includes('Not Found')) {
                throw new Error(`Path not found: ${path}. The path may not exist in the repository.`);
            } else {
                throw new Error(`GitHub API error: ${message}`);
            }
        }
            
            // If contents is not an array, it might be a single file
            if (contents.type === 'file') {
                return {
                    path: contents.path,
                    type: 'file',
                    name: contents.name,
                    url: contents.download_url,
                    sha: contents.sha,
                };
            } else {
                throw new Error(`Unexpected response type from GitHub API: ${JSON.stringify(contents)}`);
            }
        }
        
        // Build tree node for this level (directory with multiple items)
        const result: Record<string, any> = {
            path,
            type: 'directory',
            children: {},
        };

        // Process each item
        for (const item of contents) {
            if (item.type === 'file') {
                // Add file to this directory's children
                result.children[item.name] = {
                    path: item.path,
                    type: 'file',
                    name: item.name,
                    url: item.download_url,
                    sha: item.sha,
                };
            } else if (item.type === 'dir') {
                // Recursively process subdirectory (limit depth to avoid infinite recursion)
                if (path.split('/').length < 8) {
                    try {
                        const subTree = await buildDirectoryTree(owner, repo, item.path, branch);
                        result.children[item.name] = subTree;
                    } catch (error) {
                        logWarning(`Failed to fetch subdirectory ${item.path}: ${error instanceof Error ? error.message : String(error)}`);
                        result.children[item.name] = {
                            path: item.path,
                            type: 'directory',
                            error: 'Failed to fetch contents'
                        };
                    }
                }
            }
        }

        return result;
    } catch (error: any) {
        logError(`Error building directory tree for ${path}`, error);
        
        // Check if it's already a well-formatted error from above
        if (error.message && (error.message.includes('rate limit') || error.message.includes('GitHub API error'))) {
            throw error;
        }
        
        // Provide more specific error messages for HTTP errors
        if (error.response) {
            const status: number = error.response.status;
            const responseData: any = error.response.data;
            const message: string = responseData?.message || 'Unknown error';
            
            if (status === 404) {
                throw new Error(`Path not found: ${path}. The path may not exist in the repository.`);
            } else if (status === 403) {
                if (message.includes('rate limit')) {
                    throw new Error(`GitHub API rate limit exceeded: ${message} Consider setting GITHUB_PERSONAL_ACCESS_TOKEN environment variable for higher rate limits.`);
                } else {
                    throw new Error(`Access forbidden: ${message}`);
                }
            } else if (status === 401) {
                throw new Error(`Authentication failed. Please check your GITHUB_PERSONAL_ACCESS_TOKEN if provided.`);
            } else {
                throw new Error(`GitHub API error (${status}): ${message}`);
            }
        }
        
        throw error;
    }
}

/**
 * Provides a basic directory structure for spartan helm library without API calls
 * This is used as a fallback when API rate limits are hit
 */
function getBasicHelmStructure(): any {
    return {
        path: HELM_PATH,
        type: 'directory',
        note: 'Basic structure provided due to API limitations',
        description: 'Spartan NG Helm component library',
        children: {
            'accordion': {
                path: `${HELM_PATH}/accordion`,
                type: 'directory',
                description: 'Accordion component for collapsible content'
            },
            'alert': {
                path: `${HELM_PATH}/alert`,
                type: 'directory',
                description: 'Alert component for notifications'
            },
            'button': {
                path: `${HELM_PATH}/button`,
                type: 'directory',
                description: 'Button component for user interactions'
            },
            'card': {
                path: `${HELM_PATH}/card`,
                type: 'directory',
                description: 'Card component for content containers'
            },
            'dialog': {
                path: `${HELM_PATH}/dialog`,
                type: 'directory',
                description: 'Dialog component for modal interactions'
            },
            'input': {
                path: `${HELM_PATH}/input`,
                type: 'directory',
                description: 'Input component for form fields'
            }
        }
    };
}





/**
 * Enhanced buildDirectoryTree with fallback for rate limits
 */
async function buildDirectoryTreeWithFallback(
    owner: string = REPO_OWNER,
    repo: string = REPO_NAME,
    path: string = HELM_PATH,
    branch: string = REPO_BRANCH
): Promise<any> {
    try {
        return await buildDirectoryTree(owner, repo, path, branch);
    } catch (error: any) {
        // If it's a rate limit error and we're asking for the default helm path, provide fallback
        if (error.message && error.message.includes('rate limit') && path === HELM_PATH) {
            logWarning('Using fallback directory structure due to rate limit');
            return getBasicHelmStructure();
        }
        // Re-throw other errors
        throw error;
    }
}



/**
 * Set or update GitHub API key for higher rate limits
 * @param apiKey GitHub Personal Access Token
 */
function setGitHubApiKey(apiKey: string): void {
    // Update the Authorization header for the GitHub API instance
    if (apiKey && apiKey.trim()) {
        (githubApi.defaults.headers as any)['Authorization'] = `Bearer ${apiKey.trim()}`;
        logInfo('GitHub API key updated successfully');
        console.error('GitHub API key updated successfully');
    } else {
        // Remove authorization header if empty key provided
        delete (githubApi.defaults.headers as any)['Authorization'];
        console.error('GitHub API key removed - using unauthenticated requests');
        console.error('For higher rate limits and reliability, provide a GitHub API token. See setup instructions for Spartan NG MCP Server.');
    }
}

/**
 * Get current GitHub API rate limit status
 * @returns Promise with rate limit information
 */
async function getGitHubRateLimit(): Promise<any> {
    try {
        const response = await githubApi.get('/rate_limit');
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to get rate limit info: ${error.message}`);
    }
}

export const axios = {
    githubRaw,
    githubApi,
    buildDirectoryTree: buildDirectoryTreeWithFallback, // Use fallback version by default
    buildDirectoryTreeWithFallback,
    getComponentSource,
    getComponentDemo,
    getAvailableComponents,
    getAvailableComponentsWithCategories,
    getComponentMetadata,
    getAvailableCategories,
    getComponentsByCategory,
    getCategoryFromComponentName,
    setGitHubApiKey,
    getGitHubRateLimit,
    // Enhanced Angular-specific functions for source code retrieval
    getComponentFilesWithContent,
    organizeAngularComponentFiles,
    getAngularComponentFilePatterns,
    analyzeAngularFileDependencies,
    extractExportsFromIndex,
    // Path constants for easy access
    paths: {
        REPO_OWNER,
        REPO_NAME,
        REPO_BRANCH,
        HELM_PATH
    }
}