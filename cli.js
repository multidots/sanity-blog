#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to import prompts, fallback to simple input if not available
let prompts = null;
try {
  const promptsModule = await import("prompts");
  prompts = promptsModule.default;
} catch (error) {
  console.log("📝 Interactive mode unavailable, using manual setup mode.");
}

// Get project name from args
const projectName = process.argv[2];

if (!projectName) {
  console.log("Please provide a project name:");
  console.log("npx sanity-blog-theme my-blog");
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);

// Check if directory already exists
if (fs.existsSync(targetDir)) {
  console.log(`❌ Directory "${projectName}" already exists!`);
  process.exit(1);
}

console.log(`🚀 Creating ${projectName}...`);

// Files and directories to exclude from template
const excludeItems = [
  'node_modules',
  '.next',
  '.git',
  '.gitignore',
  'package-lock.json',
  '.vercel',
  '.env.local',
  '.env',
  '.env.example',
  'dist',
  'build',
  'next-env.d.ts',
  'production.tar'
];

// Copy template files (current directory is the template)
const sourceDir = __dirname;

function copyRecursive(src, dest) {
  const stat = fs.lstatSync(src);
  
  if (stat.isDirectory()) {
    const items = fs.readdirSync(src);
    fs.mkdirSync(dest, { recursive: true });
    
    for (const item of items) {
      if (excludeItems.includes(item)) continue;
      
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      copyRecursive(srcPath, destPath);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy all files except excluded ones
copyRecursive(sourceDir, targetDir);

// Sanity project setup
let sanityConfig = { createEnvFile: false };

if (prompts) {
  // Interactive mode with prompts
  console.log('\n🔧 Let\'s configure your Sanity project...');
  console.log('📝 You can find these details in your Sanity dashboard: https://sanity.io/manage\n');

  const setupChoice = await prompts({
    type: 'confirm',
    name: 'setupNow',
    message: 'Would you like to configure your Sanity project now?',
    initial: true
  });

  if (setupChoice.setupNow) {
    sanityConfig = await prompts([
      {
        type: 'text',
        name: 'projectId',
        message: 'Enter your Sanity Project ID:',
        validate: value => value.length > 0 ? true : 'Project ID is required'
      },
      {
        type: 'text',
        name: 'dataset',
        message: 'Enter your Sanity Dataset name:',
        initial: 'production',
        validate: value => value.length > 0 ? true : 'Dataset name is required'
      },
      {
        type: 'text',
        name: 'apiVersion',
        message: 'Enter API version (YYYY-MM-DD):',
        initial: new Date().toISOString().split('T')[0],
        validate: value => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          return dateRegex.test(value) ? true : 'Please enter a valid date in YYYY-MM-DD format';
        }
      },
      {
        type: 'confirm',
        name: 'createEnvFile',
        message: 'Create .env.local file with these settings?',
        initial: true
      }
    ]);
  }
} else {
  // Fallback mode - create example .env file
  console.log('\n🔧 Creating example environment configuration...');
  
  const envExampleContent = `# Sanity Configuration
# Get these values from your Sanity dashboard: https://sanity.io/manage

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=${new Date().toISOString().split('T')[0]}

# Optional: Add token for authenticated requests (preview mode, etc.)
# SANITY_API_READ_TOKEN=your_read_token_here
`;

  fs.writeFileSync(path.join(targetDir, '.env.example'), envExampleContent);
  console.log('✅ Created .env.example with template configuration');
  sanityConfig.createEnvFile = 'example';
}

// Handle Sanity configuration
if (prompts && sanityConfig.projectId && sanityConfig.createEnvFile === true) {
  // Create .env.local file
  const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${sanityConfig.projectId}
NEXT_PUBLIC_SANITY_DATASET=${sanityConfig.dataset}
NEXT_PUBLIC_SANITY_API_VERSION=${sanityConfig.apiVersion}

# Optional: Add token for authenticated requests (preview mode, etc.)
# SANITY_API_READ_TOKEN=your_read_token_here
`;

  fs.writeFileSync(path.join(targetDir, '.env.local'), envContent);
  console.log('✅ Created .env.local with your Sanity configuration');
}

// Update package.json with new project name
const packageJsonPath = path.join(targetDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update package.json for the new project
packageJson.name = projectName;
packageJson.version = "1.0.0";
delete packageJson.bin; // Remove CLI binary reference
delete packageJson.publishConfig;
delete packageJson.files;

// Remove prompts dependency from user project (only needed for CLI)
if (packageJson.dependencies && packageJson.dependencies.prompts) {
  delete packageJson.dependencies.prompts;
}

// Add .gitignore if it doesn't exist
const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
/dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Sanity
.sanity
`;

fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignoreContent);
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Remove the CLI file from the new project
const cliPath = path.join(targetDir, 'cli.js');
if (fs.existsSync(cliPath)) {
  fs.unlinkSync(cliPath);
}

// Install dependencies
console.log("📦 Installing dependencies...");
try {
execSync("npm install", { stdio: "inherit", cwd: targetDir });
} catch (error) {
  console.log("⚠️  Failed to install dependencies automatically.");
  console.log("Please run 'npm install' manually in your project directory.");
}

// Final success message
const envStatus = sanityConfig.createEnvFile === true 
  ? '✅ Configured' 
  : sanityConfig.createEnvFile === 'example'
  ? '📄 Example created'
  : '⚠️  Manual setup required';

const nextSteps = sanityConfig.createEnvFile === true
  ? 'You\'re all set! Just run: npm run dev'
  : sanityConfig.createEnvFile === 'example'
  ? 'Copy .env.example to .env.local and update with your Sanity project details, then run: npm run dev'
  : 'Please set up your .env.local file with Sanity project details (see README.md)';

console.log(`
✅ Successfully created ${projectName}!

📋 Project Status:
  ✅ Template files copied
  ✅ Dependencies configured  
  ${envStatus} Sanity connection
  ✅ Git repository ready

🚀 Next steps:
cd ${projectName}
  ${nextSteps}

🌐 Your app will be available at:
  - Frontend: http://localhost:3000
  - Sanity Studio: http://localhost:3000/studio

📖 Resources:
  - Documentation: README.md
  - Sanity Dashboard: https://sanity.io/manage

Happy coding! 🎉
`);
