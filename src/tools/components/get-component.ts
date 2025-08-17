import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';

export async function handleGetComponent({ componentName }: { componentName: string }) {
  try {
    const axios = await getAxiosImplementation();
    const sourceCode = await axios.getComponentSource(componentName);
    return {
      content: [{ type: "text", text: sourceCode }]
    };
  } catch (error) {
    logError(`Failed to get Spartan NG component "${componentName}"`, error);
    throw new Error(`Failed to get Spartan NG component "${componentName}": ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const schema = {
  componentName: {
    type: 'string',
    description: 'Name of the Spartan NG component (e.g., "accordion", "button")'
  }
}; 