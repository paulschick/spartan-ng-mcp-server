import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';

export async function handleListComponents(args?: { category?: string; includeCategories?: boolean }) {
  try {
    const axios = await getAxiosImplementation();
    
    // Use new categorized listing function
    const result = await axios.getAvailableComponentsWithCategories(args?.category);
    
    // Format response based on whether categories are requested
    const response = args?.includeCategories === false 
      ? {
          components: result.components.map(comp => comp.name).sort(),
          total: result.totalCount
        }
      : {
          components: result.components,
          categories: result.categories,
          total: result.totalCount,
          ...(args?.category && { filteredBy: args.category })
        };
    
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify(response, null, 2) 
      }]
    };
  } catch (error) {
    logError('Failed to list Spartan NG components', error);
    throw new Error(`Failed to list Spartan NG components: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const schema = {
  type: "object",
  properties: {
    category: {
      type: "string",
      description: "Filter components by category (form, layout, navigation, feedback, overlay, display)",
      enum: ["form", "layout", "navigation", "feedback", "overlay", "display"]
    },
    includeCategories: {
      type: "boolean", 
      description: "Include category information in response (default: true)",
      default: true
    }
  },
  additionalProperties: false
}; 