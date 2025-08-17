// Schema definitions for Spartan NG Angular components
export interface ComponentExample {
  title: string;
  code: string;
  url?: string;
}

export interface ComponentInput {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

export interface ComponentInfo {
  name: string;
  description: string;
  url?: string;
  inputs?: ComponentInput[];
  outputs?: ComponentOutput[];
  examples?: ComponentExample[];
  source?: string;
  installation?: string;
  directive?: string;
  selector?: string;
}

export interface Theme {
  name: string;
  description: string;
  url?: string;
}

export interface Block {
  name: string;
  description: string;
  url?: string;
  preview?: string;
  // Note: Blocks are not currently supported in Spartan NG
}
