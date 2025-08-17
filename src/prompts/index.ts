// Framework utilities no longer needed as we focus on Angular only
import {
  getOptimizationInstructions,
  getPageTypeSpecificInstructions,
} from "./helpers.js"

/**
 * List of prompts metadata available in this MCP server
 * Each prompt must have a name, description, and arguments if parameters are needed
 */
export const prompts = {
  "build-spartan-page": {
    name: "build-spartan-page",
    description:
      "Generate a complete Angular page using Spartan NG components",
    arguments: [
      {
        name: "pageType",
        description:
          "Type of page to build (dashboard, login, calendar, sidebar, products, custom)",
        required: true,
      },
      {
        name: "features",
        description: "Specific features or components needed (comma-separated)",
      },
      {
        name: "layout",
        description:
          "Layout preference (sidebar, header, full-width, centered)",
      },
      {
        name: "style",
        description: "Design style (minimal, modern, enterprise, creative)",
      },
    ],
  },
  "create-dashboard": {
    name: "create-dashboard",
    description:
      "Create a comprehensive Angular dashboard using Spartan NG components",
    arguments: [
      {
        name: "dashboardType",
        description:
          "Type of dashboard (analytics, admin, user, project, sales)",
        required: true,
      },
      {
        name: "widgets",
        description:
          "Dashboard widgets needed (charts, tables, cards, metrics)",
      },
      {
        name: "navigation",
        description: "Navigation style (sidebar, top-nav, breadcrumbs)",
      },
    ],
  },
  "create-auth-flow": {
    name: "create-auth-flow",
    description:
      "Generate Angular authentication pages using Spartan NG components",
    arguments: [
      {
        name: "authType",
        description:
          "Authentication type (login, register, forgot-password, two-factor)",
        required: true,
      },
      {
        name: "providers",
        description: "Auth providers (email, google, github, apple)",
      },
      {
        name: "features",
        description:
          "Additional features (remember-me, social-login, validation)",
      },
    ],
  },
  "optimize-spartan-component": {
    name: "optimize-spartan-component",
    description:
      "Optimize or enhance existing Spartan NG Angular components with best practices",
    arguments: [
      {
        name: "component",
        description: "Component name to optimize",
        required: true,
      },
      {
        name: "optimization",
        description:
          "Type of optimization (performance, accessibility, responsive, animations)",
      },
      {
        name: "useCase",
        description: "Specific use case or context for the component",
      },
    ],
  },
  "create-data-table": {
    name: "create-data-table",
    description: "Create advanced data tables with Spartan NG Angular components",
    arguments: [
      {
        name: "dataType",
        description:
          "Type of data to display (users, products, orders, analytics)",
        required: true,
      },
      {
        name: "features",
        description:
          "Table features (sorting, filtering, pagination, search, selection)",
      },
      {
        name: "actions",
        description: "Row actions (edit, delete, view, custom)",
      },
    ],
  },
}

/**
 * Map of prompt names to their handler functions
 * Each handler generates the actual prompt content with the provided parameters
 */
export const promptHandlers = {
  "build-spartan-page": ({
    pageType,
    features = "",
    layout = "sidebar",
    style = "modern",
  }: {
    pageType: string
    features?: string
    layout?: string
    style?: string
  }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a complete ${pageType} page using Spartan NG Angular components. 

REQUIREMENTS:
- Framework: Angular
- Page Type: ${pageType}
- Features: ${features || "Standard features for this page type"}
- Layout: ${layout}
- Design Style: ${style}

INSTRUCTIONS:
1. Use the MCP tools to explore available Spartan NG components:
   - Use 'list_components' to see available components
   - Use 'get_component' to fetch specific component implementations

2. Build the page following these principles:
   - Use Spartan NG Angular components as building blocks
   - Ensure responsive design with Tailwind CSS classes
   - Implement proper TypeScript types and interfaces
   - Follow Angular best practices and conventions
   - Include proper accessibility attributes
   - Use Angular standalone components where appropriate

3. For ${pageType} pages specifically:
   ${getPageTypeSpecificInstructions(pageType)}

4. Code Structure:
   - Create a main page component using Angular patterns
   - Use child components for complex sections
   - Include proper imports from @spartan-ng/ui-*-helm packages
   - Add necessary state management with Angular signals or services
   - Include proper error handling with Angular error boundaries

5. Styling Guidelines:
   - Use consistent spacing and typography
   - Implement ${style} design principles
   - Ensure dark/light mode compatibility
   - Use Tailwind CSS design tokens
   - Follow Spartan NG design system

Please provide complete, production-ready Angular code with proper imports, TypeScript types, and component architecture.`,
          },
        },
      ],
    }
  },

  "create-dashboard": ({
    dashboardType,
    widgets = "charts,tables,cards",
    navigation = "sidebar",
  }: {
    dashboardType: string
    widgets?: string
    navigation?: string
  }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a comprehensive ${dashboardType} dashboard using Spartan NG Angular components.

REQUIREMENTS:
- Framework: Angular
- Dashboard Type: ${dashboardType}
- Widgets: ${widgets}
- Navigation: ${navigation}

INSTRUCTIONS:
1. First, explore available Spartan NG components:
   - Use 'list_components' to see available components
   - Use 'get_component' to examine specific component implementations
   - Study the structure and usage patterns

2. Dashboard Structure:
   - Implement ${navigation} navigation using appropriate Spartan NG components
   - Create a responsive grid layout for widgets using Angular Flex Layout or CSS Grid
   - Include proper header with user menu and notifications
   - Add breadcrumb navigation using Angular Router

3. Widgets to Include:
   ${widgets
     .split(",")
     .map((widget) => `- ${widget.trim()} with real-time data simulation using Angular services`)
     .join("\n   ")}

4. Key Features:
   - Responsive design that works on mobile, tablet, and desktop
   - Interactive charts using a charting library compatible with Angular
   - Data tables with sorting, filtering, and pagination using Angular CDK Table
   - Modal dialogs for detailed views using Spartan NG dialog components
   - Toast notifications for user feedback

5. Data Management:
   - Create mock data structures for ${dashboardType}
   - Implement state management with Angular signals or NgRx
   - Add loading states and error handling
   - Include data refresh functionality with Angular HttpClient

6. Accessibility:
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast compliance
   - Angular CDK a11y utilities

Provide complete Angular code with all necessary imports, types, and implementations using Spartan NG components.`,
          },
        },
      ],
    }
  },

  "create-auth-flow": ({
    authType,
    providers = "email",
    features = "validation",
  }: {
    authType: string
    providers?: string
    features?: string
  }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a complete ${authType} authentication flow using Spartan NG Angular components.

REQUIREMENTS:
- Framework: Angular
- Auth Type: ${authType}
- Providers: ${providers}
- Features: ${features}

INSTRUCTIONS:
1. Explore available Spartan NG components:
   - Use 'list_components' to see available components
   - Use 'get_component' to examine form and input components
   - Study authentication patterns suitable for Angular

2. Authentication Components:
   - Form validation using Angular reactive forms
   - Input components with proper error states using Spartan NG form controls
   - Loading states during authentication with Angular signals
   - Success/error feedback with toast notifications

3. Providers Implementation:
   ${providers
     .split(",")
     .map(
       (provider) =>
         `- ${provider.trim()}: Implement ${provider.trim()} authentication UI with Angular services`
     )
     .join("\n   ")}

4. Security Features:
   - Form validation with proper error messages using Angular validators
   - Password strength indicator using Angular custom validators
   - CSRF protection with Angular HttpInterceptors
   - Secure form submission patterns with Angular HttpClient

5. UX Considerations:
   - Smooth transitions between auth states using Angular animations
   - Clear error messaging with Spartan NG alert components
   - Progressive enhancement with Angular Universal compatibility
   - Mobile-friendly design with responsive Tailwind CSS
   - Remember me functionality with Angular local storage services

6. Form Features:
   ${features
     .split(",")
     .map(
       (feature) =>
         `- ${feature.trim()}: Implement ${feature.trim()} functionality with Angular forms`
     )
     .join("\n   ")}

7. Layout Options:
   - Use Spartan NG layout components for proper spacing
   - Center-aligned forms with responsive design
   - Background images or gradients using Tailwind CSS
   - Responsive design for all screen sizes with Angular Flex Layout

8. Angular-Specific Implementation:
   - Use standalone components for better tree-shaking
   - Implement proper TypeScript interfaces for auth data
   - Use Angular Guards for route protection
   - Implement proper error handling with try-catch patterns
   - Use Angular services for authentication state management

Provide complete Angular authentication flow code with proper TypeScript types, validation, and error handling using Spartan NG components.`,
          },
        },
      ],
    }
  },

  "optimize-spartan-component": ({
    component,
    optimization = "performance",
    useCase = "general",
  }: {
    component: string
    optimization?: string
    useCase?: string
  }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Optimize the ${component} Spartan NG Angular component for ${optimization} and ${useCase} use case.

REQUIREMENTS:
- Framework: Angular
- Component: ${component}
- Optimization Focus: ${optimization}
- Use Case: ${useCase}

INSTRUCTIONS:
1. First, analyze the current component:
   - Use 'get_component' to fetch the ${component} source code
   - Use 'get_component_demo' to see current usage examples
   - Use 'get_component_metadata' to understand dependencies

2. Optimization Strategy for ${optimization}:
   ${getOptimizationInstructions(optimization, "angular")}

3. Use Case Specific Enhancements for ${useCase}:
   - Analyze how ${component} is typically used in ${useCase} scenarios
   - Identify common patterns and pain points
   - Suggest improvements for better developer experience

4. Implementation:
   - Provide optimized Angular component code
   - Include performance benchmarks or considerations
   - Add proper TypeScript types and interfaces
   - Include usage examples demonstrating improvements
   - Use Angular OnPush change detection strategy where appropriate

5. Best Practices:
   - Follow Angular performance best practices
   - Implement Angular optimization patterns (OnPush, trackBy, etc.)
   - Ensure backward compatibility
   - Add comprehensive input validation
   - Use Angular signals where appropriate

6. Testing Considerations:
   - Suggest test cases for the optimized component using Angular Testing utilities
   - Include accessibility testing recommendations with Angular CDK
   - Performance testing guidelines with Angular DevTools

Provide the optimized Angular component code with detailed explanations of improvements made using Spartan NG patterns.`,
          },
        },
      ],
    }
  },

  "create-data-table": ({
    dataType,
    features = "sorting,filtering,pagination",
    actions = "edit,delete",
  }: {
    dataType: string
    features?: string
    actions?: string
  }) => {
    const framework = getFramework()

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create an advanced data table for ${dataType} using Spartan NG Angular components.

REQUIREMENTS:
- Framework: Angular
- Data Type: ${dataType}
- Features: ${features}
- Actions: ${actions}

INSTRUCTIONS:
1. Explore table components:
   - Use 'get_component' for 'table' to see the base table implementation
   - Use 'get_component_demo' for 'table' to see usage examples
   - Use Angular CDK Table for advanced functionality

2. Table Structure:
   - Create a reusable DataTable component using Angular patterns
   - Define proper TypeScript interfaces for ${dataType} data
   - Implement column definitions with proper typing
   - Add responsive table design with Angular Flex Layout
   - Use standalone components where appropriate

3. Features Implementation:
   ${features
     .split(",")
     .map((feature) => {
       const featureInstructions: Record<string, string> = {
         sorting:
           "- Column sorting (ascending/descending) with visual indicators using Angular CDK",
         filtering: "- Global search and column-specific filters with Angular reactive forms",
         pagination: "- Page-based navigation with configurable page sizes using Angular CDK Paginator",
         search: "- Real-time search across all columns with debouncing",
         selection: "- Row selection with bulk actions support using Angular CDK Selection",
       }
       return (
         featureInstructions[feature.trim()] ||
         `- ${feature.trim()}: Implement ${feature.trim()} functionality`
       )
     })
     .join("\n   ")}

4. Row Actions:
   ${actions
     .split(",")
     .map(
       (action) =>
         `- ${action.trim()}: Implement ${action.trim()} action with proper confirmation dialogs using Spartan NG dialog components`
     )
     .join("\n   ")}

5. Data Management:
   - Create mock data for ${dataType}
   - Implement data fetching patterns using Angular HttpClient
   - Add loading states and error handling
   - Add optimistic updates for actions
   - Include data validation with Angular reactive forms
   - Use Angular signals for reactive state management

6. UI/UX Features:
   - Loading skeletons during data fetch
   - Empty states when no data is available
   - Error states with retry functionality
   - Responsive design for mobile devices
   - Keyboard navigation support with Angular CDK a11y
   - Virtual scrolling for large datasets using Angular CDK

7. Advanced Features:
   - Column resizing and reordering with Angular CDK Drag & Drop
   - Export functionality (CSV, JSON) using Angular services
   - Bulk operations with confirmation dialogs
   - Accessibility features with ARIA labels and screen reader support

Provide complete Angular data table implementation with proper TypeScript types, mock data, and usage examples using Spartan NG components.`,
          },
        },
      ],
    }
  },
}
