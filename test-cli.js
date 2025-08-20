#!/usr/bin/env node

// Simple test script to demonstrate the interactive prompts functionality
// This simulates what the CLI would do with prompts installed

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing interactive prompts functionality...\n');

// Simulate the prompts functionality for testing
const mockPrompts = async (questions) => {
  console.log('📝 Interactive mode would ask:');
  
  if (Array.isArray(questions)) {
    const results = {};
    for (const q of questions) {
      console.log(`   ${q.message} ${q.initial ? `(default: ${q.initial})` : ''}`);
      if (q.name === 'projectId') results.projectId = 'test-project-123';
      if (q.name === 'dataset') results.dataset = 'production';
      if (q.name === 'apiVersion') results.apiVersion = '2025-08-20';
      if (q.name === 'createEnvFile') results.createEnvFile = true;
    }
    return results;
  } else {
    console.log(`   ${questions.message}`);
    return { setupNow: true };
  }
};

// Test the interactive flow
async function testInteractiveSetup() {
  console.log('🔧 Let\'s configure your Sanity project...');
  console.log('📝 You can find these details in your Sanity dashboard: https://sanity.io/manage\n');

  const setupChoice = await mockPrompts({
    type: 'confirm',
    name: 'setupNow',
    message: 'Would you like to configure your Sanity project now?',
    initial: true
  });

  if (setupChoice.setupNow) {
    const sanityConfig = await mockPrompts([
      {
        type: 'text',
        name: 'projectId',
        message: 'Enter your Sanity Project ID:',
      },
      {
        type: 'text',
        name: 'dataset',
        message: 'Enter your Sanity Dataset name:',
        initial: 'production',
      },
      {
        type: 'text',
        name: 'apiVersion',
        message: 'Enter API version (YYYY-MM-DD):',
        initial: new Date().toISOString().split('T')[0],
      },
      {
        type: 'confirm',
        name: 'createEnvFile',
        message: 'Create .env.local file with these settings?',
        initial: true
      }
    ]);

    if (sanityConfig.createEnvFile) {
      const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${sanityConfig.projectId}
NEXT_PUBLIC_SANITY_DATASET=${sanityConfig.dataset}
NEXT_PUBLIC_SANITY_API_VERSION=${sanityConfig.apiVersion}

# Optional: Add token for authenticated requests (preview mode, etc.)
# SANITY_API_READ_TOKEN=your_read_token_here
`;

      console.log('\n📄 Would create .env.local with contents:');
      console.log('---');
      console.log(envContent);
      console.log('---');
      console.log('✅ .env.local file would be created with your Sanity configuration');
    }

    console.log(`
✅ Successfully would create test-project!

📋 Project Status:
  ✅ Template files copied
  ✅ Dependencies configured  
  ✅ Configured Sanity connection
  ✅ Git repository ready

🚀 Next steps:
  cd test-project
  You're all set! Just run: npm run dev

🌐 Your app will be available at:
  - Frontend: http://localhost:3000
  - Sanity Studio: http://localhost:3000/studio

📖 Resources:
  - Documentation: README.md
  - Sanity Dashboard: https://sanity.io/manage

Happy coding! 🎉
    `);
  }
}

testInteractiveSetup();
