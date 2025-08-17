/**
 * Helper function to get page type specific instructions
 */
export function getPageTypeSpecificInstructions(pageType: string): string {
  const instructions = {
    dashboard: `
   - Use Spartan NG components for dashboard foundation (card, table, chart)
   - Include metrics cards using card and badge components
   - Implement sidebar navigation with menu and button components
   - Add header with avatar and notification components
   - Create responsive grid layout using Angular Flex Layout or CSS Grid`,

    login: `
   - Use Spartan NG form components (input, button, form-field)
   - Implement form validation with Angular reactive forms
   - Add social authentication using button variants
   - Include navigation links with proper routing
   - Ensure mobile-responsive design with responsive utilities`,

    calendar: `
   - Use Spartan NG calendar component as foundation
   - Implement different views using tabs and button-group components
   - Add event creation using dialog and form components
   - Include date navigation with pagination component
   - Support event categories using badge and color schemes`,

    sidebar: `
   - Use Spartan NG menu and sheet components for navigation
   - Implement collapsible behavior with toggle components
   - Add proper menu hierarchy using nested menu items
   - Include search functionality with input and command components
   - Support theme switching with toggle and select components`,

    products: `
   - Use Spartan NG card components for product display
   - Create grid/list views using responsive layout utilities
   - Implement filtering with select and checkbox components
   - Add product details using dialog or sheet components
   - Include shopping cart with badge and button components`,

    custom: `
   - Analyze requirements and choose appropriate Spartan NG components
   - Combine multiple component patterns as needed
   - Focus on component reusability and composition
   - Ensure consistent design patterns following Spartan NG conventions`,
  }

  return (
    instructions[pageType as keyof typeof instructions] || instructions.custom
  )
}

/**
 * Helper function to get optimization specific instructions
 */
export function getOptimizationInstructions(
  optimization: string,
  framework: string
): string {
  const getPerformanceInstructions = (framework: string) => {
    // Angular-only performance instructions for Spartan NG
    return `
   - Use OnPush change detection strategy for better performance
   - Implement trackBy functions for *ngFor loops with large datasets
   - Use Angular signals for reactive state management
   - Lazy load modules and components with Angular Router
   - Minimize change detection cycles by using immutable data patterns
   - Use async pipe for reactive data streams
   - Implement virtual scrolling for large lists using Angular CDK
   - Use Angular's built-in optimizations like standalone components`
  }

  const instructions = {
    performance: getPerformanceInstructions(framework),

    accessibility: `
   - Add proper ARIA labels and roles
   - Ensure keyboard navigation support
   - Implement focus management
   - Add screen reader compatibility
   - Ensure color contrast compliance
   - Support high contrast mode
   - Use semantic HTML elements`,

    responsive: `
   - Implement mobile-first design approach
   - Use CSS Grid and Flexbox effectively
   - Add proper breakpoints for all screen sizes
   - Optimize touch interactions for mobile
   - Ensure readable text sizes on all devices
   - Implement responsive navigation patterns
   - Use container queries where appropriate`,

    animations: `
   - Add smooth transitions between states
   - Implement loading animations and skeletons
   - Use CSS transforms for better performance
   - Add hover and focus animations
   - Implement page transition animations
   - Ensure animations respect reduced motion preferences
   - Use hardware acceleration with transform3d when needed`,
  }

  return (
    instructions[optimization as keyof typeof instructions] ||
    `Focus on general code quality improvements and ${framework}-specific best practices implementation.`
  )
}
