import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';
import { 
  createComponentListResponse, 
  isValidComponentCategory,
  type ComponentListResponse,
  type SimpleComponentListResponse 
} from '../../schemas/component.js';

export async function handleListComponents(args?: { category?: string; includeCategories?: boolean }) {
  try {
    const axios = await getAxiosImplementation();
    
    // Validate category filter if provided
    if (args?.category && !isValidComponentCategory(args.category)) {
      throw new Error(`Invalid category: ${args.category}. Valid categories are: form, layout, navigation, feedback, overlay, display`);
    }
    
    // Use new categorized listing function
    const result = await axios.getAvailableComponentsWithCategories(args?.category);
    
    // Format response based on whether categories are requested
    let response: ComponentListResponse | SimpleComponentListResponse;
    
    if (args?.includeCategories === false) {
      response = {
        components: result.components.map(comp => comp.name).sort(),
        total: result.totalCount
      };
    } else {
      response = createComponentListResponse(
        result.components,
        result.categories,
        args?.category
      );
    }
    
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