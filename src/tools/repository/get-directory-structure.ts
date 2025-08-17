import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';

export async function handleGetDirectoryStructure({ 
  path, 
  owner, 
  repo, 
  branch 
}: { 
  path?: string, 
  owner?: string, 
  repo?: string, 
  branch?: string 
}) {
  try {
    const axios = await getAxiosImplementation();
    // Get the default path for Spartan NG components
    const defaultPath = axios.paths.HELM_PATH;
    
    const directoryTree = await axios.buildDirectoryTree(
      owner || axios.paths.REPO_OWNER,
      repo || axios.paths.REPO_NAME,
      path || defaultPath,
      branch || axios.paths.REPO_BRANCH
    );
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify(directoryTree, null, 2)
      }]
    };
  } catch (error) {
    logError('Failed to get Spartan NG repository directory structure', error);
    throw new Error(`Failed to get Spartan NG repository directory structure: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const schema = {
  path: {
    type: 'string',
    description: 'Path within the Spartan NG repository (default: libs/helm/)'
  },
  owner: {
    type: 'string',
    description: 'Repository owner (default: "goetzrobin")'
  },
  repo: {
    type: 'string',
    description: 'Repository name (default: "spartan")'
  },
  branch: {
    type: 'string',
    description: 'Branch name (default: "main")'
  }
}; 