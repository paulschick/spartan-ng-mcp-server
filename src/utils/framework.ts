/**
 * Framework utility for Spartan NG MCP server
 *
 * This module provides Angular-specific implementation for Spartan NG components.
 * The framework is set to Angular only, as this server focuses exclusively on Spartan NG.
 */

import { logInfo } from "./logger.js"

// Framework type - Angular only
export type Framework = "angular"

// Default and only framework
const FRAMEWORK: Framework = "angular"

/**
 * Get the current framework - always returns 'angular' for Spartan NG
 * @returns The framework ('angular')
 */
export function getFramework(): Framework {
  return FRAMEWORK
}

/**
 * Get the axios implementation - always returns the main implementation
 * @returns The Spartan NG axios implementation
 */
export async function getAxiosImplementation() {
  // Always use the main axios implementation for Spartan NG
  return import("./axios.js").then((module) => module.axios)
}

/**
 * Get framework-specific information for help text
 * @returns Framework information object
 */
export function getFrameworkInfo() {
  return {
    current: FRAMEWORK,
    repository: "goetzrobin/spartan",
    fileExtension: ".ts",
    description: "Angular components from Spartan NG",
  }
}

/**
 * Validate framework selection and provide helpful feedback
 */
export function validateFrameworkSelection() {
  const info = getFrameworkInfo()

  logInfo(`MCP Server configured for ANGULAR framework (Spartan NG)`)
  logInfo(`Repository: ${info.repository}`)
  logInfo(`File extension: ${info.fileExtension}`)
  logInfo(`Description: ${info.description}`)
}
