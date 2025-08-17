#!/bin/bash

# Example usage script for spartan-ng-mcp-server
# This demonstrates different ways to use the package

echo "🚀 Spartan NG MCP Server - Usage Examples"
echo "========================================"
echo ""

# Basic usage
echo "1️⃣  Basic Usage (no GitHub token - rate limited):"
echo "   npx spartan-ng-mcp-server"
echo ""

# With GitHub token via argument
echo "2️⃣  With GitHub Token (command line):"
echo "   npx spartan-ng-mcp-server --github-api-key ghp_your_token_here"
echo "   npx spartan-ng-mcp-server -g ghp_your_token_here"
echo ""

# With environment variable
echo "3️⃣  With GitHub Token (environment variable):"
echo "   export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here"
echo "   npx spartan-ng-mcp-server"
echo ""

# Claude Desktop integration
echo "4️⃣  Claude Desktop Integration:"
echo "   Add to ~/.config/Claude/claude_desktop_config.json:"
echo '   {'
echo '     "mcpServers": {'
echo '       "spartan-ng": {'
echo '         "command": "npx",'
echo '         "args": ["spartan-ng-mcp-server", "--github-api-key", "ghp_your_token"]'
echo '       }'
echo '     }'
echo '   }'
echo ""

# Continue.dev integration
echo "5️⃣  Continue.dev Integration:"
echo "   Add to .continue/config.json:"
echo '   {'
echo '     "tools": [{'
echo '       "name": "spartan-ng",'
echo '       "type": "mcp",'
echo '       "command": "npx",'
echo '       "args": ["spartan-ng-mcp-server"],'
echo '       "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"}'
echo '     }]'
echo '   }'
echo ""

# Available tools
echo "🛠️  Available Tools:"
echo "   • spartan_get_component         - Get Angular component source code"
echo "   • spartan_get_component_demo    - Get Angular component usage examples"
echo "   • spartan_list_components       - List all available Spartan NG components"
echo "   • spartan_get_component_metadata - Get component dependencies"
echo "   • spartan_get_directory_structure - Explore Spartan NG repository structure"
echo ""

echo "📚 For more information:"
echo "   npx spartan-ng-mcp-server --help"
echo "   https://github.com/your-org/spartan-ng-mcp-server"
