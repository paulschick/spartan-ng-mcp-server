/**
 * API utilities for Spartan NG Angular components
 * 
 * This file contains type definitions and schemas for Spartan NG components
 * from the goetzrobin/spartan repository.
 */

import { z } from 'zod';

// Zod Schemas for Angular component type definitions
const AngularInputSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  required: z.boolean().optional(),
  default: z.string().optional(),
  example: z.string().optional()
});

const AngularOutputSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  example: z.string().optional()
});

const ComponentStorySchema = z.object({
  title: z.string(),
  code: z.string(),
  description: z.string().optional(),
  args: z.record(z.any()).optional()
});

const SpartanComponentInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  selector: z.string().optional(),
  inputs: z.array(AngularInputSchema).optional(),
  outputs: z.array(AngularOutputSchema).optional(),
  stories: z.array(ComponentStorySchema).optional(),
  source: z.string().optional(),
  installation: z.string().optional(),
  sourceUrl: z.string().optional(),
  usage: z.string().optional(),
  framework: z.literal('angular'),
  library: z.literal('spartan-ng'),
  version: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  peerDependencies: z.array(z.string()).optional()
});

const ComponentMetadataSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  type: z.literal('spartan:helm'),
  dependencies: z.array(z.string()),
  peerDependencies: z.array(z.string()),
  framework: z.literal('angular'),
  library: z.literal('spartan-ng')
});

// Export TypeScript types from Zod schemas
export type AngularInput = z.infer<typeof AngularInputSchema>;
export type AngularOutput = z.infer<typeof AngularOutputSchema>;
export type ComponentStory = z.infer<typeof ComponentStorySchema>;
export type SpartanComponentInfo = z.infer<typeof SpartanComponentInfoSchema>;
export type ComponentMetadata = z.infer<typeof ComponentMetadataSchema>;

// Export schemas for validation
export {
  AngularInputSchema,
  AngularOutputSchema,
  ComponentStorySchema,
  SpartanComponentInfoSchema,
  ComponentMetadataSchema
};
