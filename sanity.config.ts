'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import { structureTool } from 'sanity/structure'
import { colorInput } from '@sanity/color-input';
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { contactFormPlugin } from '@multidots/sanity-plugin-contact-form';


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Sanity Blog Theme',
  schema,
  plugins: [
    structureTool({structure}),
    colorInput(),
    visionTool({defaultApiVersion: apiVersion}),
    contactFormPlugin(),
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((docType) => !['siteSettings'].includes(docType.templateId));
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(({ action }) => action && !['duplicate', 'delete'].includes(action));
      }
      return prev;
    },
  },
})
