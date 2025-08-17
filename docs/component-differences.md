Blocks
- Spartan-ng does not have the concept of "blocks" like shadcn
- Focus on the MCP functionality
- Focus on HLM components: these are styled components

Use github mcp to retrieve information from these URLs linking to GitHub

Shadcn Repository Examples:
https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/examples

Spartan NG Repository Examples:
https://github.com/spartan-ng/spartan/tree/main/apps/ui-storybook/stories

The main difference is going to be that spartan-ng doesn't have the "block" concept, just components and component demos (stories).
So we'll need to remove the block functionality and stick to the
component functionality.

Component List
Current location: src/resources/index.ts

Shadcn component repository location:
https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/ui

New Components Available:
- accordion
- alert-dialog
- alert
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- carousel
- checkbox
- command
- date-picker
- dialog
- form-field
- hover-card
- icon
- input-otp
- input
- label
- menu
- pagination
- popover
- progress
- radio-group
- scroll-area
- select
- separator
- sheet
- skeleton
- slider
- sonner
- spinner
- switch
- table
- tabs
- toggle-group
- toggle
- tooltip
- typography

Location of Spartan components:
https://github.com/spartan-ng/spartan/tree/main/libs/helm
