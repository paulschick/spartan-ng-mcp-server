import { Axios } from "axios";
import { logError, logWarning, logInfo } from './logger.js';

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
 * Fetch component metadata from the spartan helm library
 * @param componentName Name of the component
 * @returns Promise with component metadata
 */
async function getComponentMetadata(componentName: string): Promise<any> {
    try {
        // Try to get package.json from the component directory
        const packageJsonPath = `${HELM_PATH}/${componentName.toLowerCase()}/package.json`;
        const response = await githubRaw.get(`/${packageJsonPath}`);
        const packageData = JSON.parse(response.data);
        
        return {
            name: packageData.name || componentName,
            version: packageData.version || '0.0.0',
            description: packageData.description || `Spartan NG ${componentName} component`,
            type: 'spartan:helm',
            dependencies: packageData.dependencies ? Object.keys(packageData.dependencies) : [],
            peerDependencies: packageData.peerDependencies ? Object.keys(packageData.peerDependencies) : [],
            framework: 'angular',
            library: 'spartan-ng'
        };
    } catch (error) {
        // Fallback metadata if package.json is not available
        logWarning(`Could not get package.json for ${componentName}, using fallback metadata`);
        return {
            name: componentName,
            version: 'unknown',
            description: `Spartan NG ${componentName} component`,
            type: 'spartan:helm',
            dependencies: [],
            peerDependencies: ['@angular/core', '@angular/common'],
            framework: 'angular',
            library: 'spartan-ng'
        };
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
    getComponentMetadata,
    setGitHubApiKey,
    getGitHubRateLimit,
    // Path constants for easy access
    paths: {
        REPO_OWNER,
        REPO_NAME,
        REPO_BRANCH,
        HELM_PATH
    }
}