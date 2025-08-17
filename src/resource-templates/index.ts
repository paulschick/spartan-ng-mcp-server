/**
 * Resource templates implementation for the Model Context Protocol (MCP) server.
 *
 * This file defines resource templates that can be used to dynamically generate
 * resources based on parameters in the URI.
 */

/**
 * Resource template definitions exported to the MCP handler
 * Each template has a name, description, uriTemplate and contentType
 */
export const resourceTemplates = [
  {
    name: "get_install_script_for_component",
    description:
      "Generate installation script for a specific Spartan NG Angular component based on package manager",
    uriTemplate:
      "resource-template:get_install_script_for_component?packageManager={packageManager}&component={component}",
    contentType: "text/plain",
  },
  {
    name: "get_installation_guide",
    description:
      "Get the installation guide for Spartan NG based on build tool and package manager",
    uriTemplate:
      "resource-template:get_installation_guide?buildTool={buildTool}&packageManager={packageManager}",
    contentType: "text/plain",
  },
]

// Create a map for easier access in getResourceTemplate
const resourceTemplateMap = {
  get_install_script_for_component: resourceTemplates[0],
  get_installation_guide: resourceTemplates[1],
}

/**
 * Extract parameters from URI
 * @param uri URI to extract from
 * @param paramName Name of parameter to extract
 * @returns Parameter value or undefined
 */
function extractParam(uri: string, paramName: string): string | undefined {
  const match = uri.match(new RegExp(`${paramName}=([^&]+)`))
  return match?.[1]
}

/**
 * Gets a resource template handler for a given URI
 * @param uri The URI of the resource template
 * @returns A function that generates the resource
 */
export const getResourceTemplate = (uri: string) => {
  // Component installation script template
  if (uri.startsWith("resource-template:get_install_script_for_component")) {
    return async () => {
      try {
        const packageManager = extractParam(uri, "packageManager")
        const component = extractParam(uri, "component")

        if (!packageManager) {
          return {
            content:
              "Missing packageManager parameter. Please specify npm, pnpm, or yarn.",
            contentType: "text/plain",
          }
        }

        if (!component) {
          return {
            content:
              "Missing component parameter. Please specify the component name.",
            contentType: "text/plain",
          }
        }

        // Spartan NG uses ng add for component installation
        const packageName = "@spartan-ng/ui-" + component + "-helm"
        
        // Generate installation script based on package manager for Angular
        let installCommand: string

        switch (packageManager.toLowerCase()) {
          case "npm":
            installCommand = `ng add ${packageName}`
            break
          case "pnpm":
            installCommand = `ng add ${packageName}`
            break
          case "yarn":
            installCommand = `ng add ${packageName}`
            break
          case "bun":
            installCommand = `ng add ${packageName}`
            break
          default:
            installCommand = `ng add ${packageName}`
        }

        return {
          content: installCommand,
          contentType: "text/plain",
        }
      } catch (error) {
        return {
          content: `Error generating installation script: ${
            error instanceof Error ? error.message : String(error)
          }`,
          contentType: "text/plain",
        }
      }
    }
  }

  // Installation guide template
  if (uri.startsWith("resource-template:get_installation_guide")) {
    return async () => {
      try {
        const buildTool = extractParam(uri, "buildTool")
        const packageManager = extractParam(uri, "packageManager")

        if (!buildTool) {
          return {
            content:
              "Missing buildTool parameter. Please specify angular-cli or nx.",
            contentType: "text/plain",
          }
        }

        // Validate build tool for Angular
        if (
          buildTool.toLowerCase() !== "angular-cli" &&
          buildTool.toLowerCase() !== "nx"
        ) {
          return {
            content: 'Invalid build tool for Angular. Only "angular-cli" and "nx" are supported.',
            contentType: "text/plain",
          }
        }

        if (!packageManager) {
          return {
            content:
              "Missing packageManager parameter. Please specify npm, pnpm, or yarn.",
            contentType: "text/plain",
          }
        }

        // Spartan NG package name
        const packageName = "@spartan-ng/ui"
        // Generate installation guide based on build tool and package manager
        let guides: any
        // Angular-specific guides
        guides = {
          "angular-cli": {
            description: "Installation guide for Angular CLI project",
            steps: [
              "1. Create a new Angular project if you don't have one:",
              packageManager === "npm"
                ? `npx @angular/cli@latest new my-angular-app`
                : packageManager === "pnpm"
                ? `pnpm dlx @angular/cli@latest new my-angular-app`
                : packageManager === "yarn"
                ? `yarn dlx @angular/cli@latest new my-angular-app`
                : packageManager === "bun"
                ? `bunx @angular/cli@latest new my-angular-app`
                : `npx @angular/cli@latest new my-angular-app`,
              "",
              "Navigate to your project directory:",
              "cd my-angular-app",
              "",
              "2. Install Tailwind CSS:",
              packageManager === "npm"
                ? `npm install -D tailwindcss postcss autoprefixer`
                : packageManager === "pnpm"
                ? `pnpm install -D tailwindcss postcss autoprefixer`
                : packageManager === "yarn"
                ? `yarn add -D tailwindcss postcss autoprefixer`
                : packageManager === "bun"
                ? `bun add -D tailwindcss postcss autoprefixer`
                : `npm install -D tailwindcss postcss autoprefixer`,
              "",
              "3. Initialize Tailwind CSS:",
              "npx tailwindcss init",
              "",
              "4. Configure Tailwind in tailwind.config.js:",
              "content: ['./src/**/*.{html,ts}']",
              "",
              "5. Add Tailwind directives to src/styles.css:",
              "@tailwind base;",
              "@tailwind components;", 
              "@tailwind utilities;",
              "",
              "6. Install Spartan NG:",
              packageManager === "npm"
                ? `npm install @spartan-ng/ui-core`
                : packageManager === "pnpm"
                ? `pnpm install @spartan-ng/ui-core`
                : packageManager === "yarn"
                ? `yarn add @spartan-ng/ui-core`
                : packageManager === "bun"
                ? `bun add @spartan-ng/ui-core`
                : `npm install @spartan-ng/ui-core`,
              "",
              "7. Add components using ng add:",
              `ng add @spartan-ng/ui-button-helm`,
              "",
              "8. Import components in your modules or standalone components:",
              "import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';",
              "",
              "9. Use components in your templates:",
              "<button hlmBtn>Click me</button>",
              "",
              "You're ready to use Spartan NG components!",
            ],
          },
          nx: {
            description: "Installation guide for Nx Angular workspace",
            steps: [
              "1. Create a new Nx workspace if you don't have one:",
              packageManager === "npm"
                ? `npx create-nx-workspace@latest my-nx-workspace --preset=angular`
                : packageManager === "pnpm"
                ? `pnpm dlx create-nx-workspace@latest my-nx-workspace --preset=angular`
                : packageManager === "yarn"
                ? `yarn dlx create-nx-workspace@latest my-nx-workspace --preset=angular`
                : packageManager === "bun"
                ? `bunx create-nx-workspace@latest my-nx-workspace --preset=angular`
                : `npx create-nx-workspace@latest my-nx-workspace --preset=angular`,
              "",
              "Navigate to your workspace directory:",
              "cd my-nx-workspace",
              "",
              "2. Install Tailwind CSS:",
              packageManager === "npm"
                ? `npm install -D tailwindcss postcss autoprefixer`
                : packageManager === "pnpm"
                ? `pnpm install -D tailwindcss postcss autoprefixer`
                : packageManager === "yarn"
                ? `yarn add -D tailwindcss postcss autoprefixer`
                : packageManager === "bun"
                ? `bun add -D tailwindcss postcss autoprefixer`
                : `npm install -D tailwindcss postcss autoprefixer`,
              "",
              "3. Initialize Tailwind CSS:",
              "npx tailwindcss init",
              "",
              "4. Configure Tailwind in tailwind.config.js:",
              "content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']",
              "",
              "5. Add Tailwind directives to your app's styles file:",
              "@tailwind base;",
              "@tailwind components;",
              "@tailwind utilities;",
              "",
              "6. Install Spartan NG:",
              packageManager === "npm"
                ? `npm install @spartan-ng/ui-core`
                : packageManager === "pnpm"
                ? `pnpm install @spartan-ng/ui-core`
                : packageManager === "yarn"
                ? `yarn add @spartan-ng/ui-core`
                : packageManager === "bun"
                ? `bun add @spartan-ng/ui-core`
                : `npm install @spartan-ng/ui-core`,
              "",
              "7. Add components using ng add:",
              `ng add @spartan-ng/ui-button-helm`,
              "",
              "8. Import components in your modules or standalone components:",
              "import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';",
              "",
              "9. Use components in your templates:",
              "<button hlmBtn>Click me</button>",
              "",
              "Your Nx workspace is ready for Spartan NG components!",
            ],
          },
          default: {
            description: "Generic installation guide for Angular",
            steps: [
              "Make sure you have an Angular project set up",
              "",
              "1. Install Tailwind CSS:",
              packageManager === "npm"
                ? `npm install -D tailwindcss postcss autoprefixer`
                : packageManager === "pnpm"
                ? `pnpm install -D tailwindcss postcss autoprefixer`
                : packageManager === "yarn"
                ? `yarn add -D tailwindcss postcss autoprefixer`
                : packageManager === "bun"
                ? `bun add -D tailwindcss postcss autoprefixer`
                : `npm install -D tailwindcss postcss autoprefixer`,
              "",
              "2. Install Spartan NG:",
              packageManager === "npm"
                ? `npm install @spartan-ng/ui-core`
                : packageManager === "pnpm"
                ? `pnpm install @spartan-ng/ui-core`
                : packageManager === "yarn"
                ? `yarn add @spartan-ng/ui-core`
                : packageManager === "bun"
                ? `bun add @spartan-ng/ui-core`
                : `npm install @spartan-ng/ui-core`,
              "",
              "3. Add components using ng add:",
              `ng add @spartan-ng/ui-button-helm`,
              "",
              "4. Import and use components in your Angular application",
              "",
              "Now you can use Spartan NG components in your Angular project!",
            ],
          },
        }
        // Select appropriate guide based on build tool
        const guide =
          guides[buildTool.toLowerCase() as keyof typeof guides] ||
          guides.default

        return {
          content: `# ${
            guide.description
          } with ${packageManager}\n\n${guide.steps.join("\n")}`,
          contentType: "text/plain",
        }
      } catch (error) {
        return {
          content: `Error generating installation guide: ${
            error instanceof Error ? error.message : String(error)
          }`,
          contentType: "text/plain",
        }
      }
    }
  }

  return undefined
}
