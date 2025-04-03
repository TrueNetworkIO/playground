import { CodeTemplate, CodeTemplateCategory } from "@/shared/schema";
import { getExampleCode } from "./editor";

// Predefined code templates for the playground
export const templates: CodeTemplate[] = [
  {
    id: "create-attestation",
    title: "Create an Attestation",
    description: "Create and issue a basic attestation",
    category: "attestations",
    language: "typescript",
    code: getExampleCode("Create an Attestation")
  },
  {
    id: "update-attestation",
    title: "Update an Attestation",
    description: "Update and issue an attestation",
    category: "attestations",
    language: "typescript",
    code: getExampleCode("Update an Attestation")
  },
  {
    id: "read-attestation",
    title: "Read Attestations",
    description: "Read all attestations of a user",
    category: "attestations",
    language: "typescript",
    code: getExampleCode("Read Attestations")
  },
  {
    id: "get-reputation-score",
    title: "Get Reputation Score",
    description: "Get the reputation score of a user",
    category: "reputation",
    language: "typescript",
    code: getExampleCode("Get Reputation Score")
  },
  {
    id: "get-free-balance",
    title: "Get Free Balance",
    description: "Get the free balance of a user",
    category: "utility",
    language: "typescript",
    code: getExampleCode("Get Free Balance")
  },
  {
    id: 'string-to-hash',
    title: 'String To Hash',
    description: 'Convert a string to a hash',
    category: 'utility',
    language: 'typescript',
    code: getExampleCode('String To Hash')
  },
  {
    id: 'get-schema-hash',
    title: 'Get Schema Hash',
    description: 'Get the hash of a schema',
    category: 'utility',
    language: 'typescript',
    code: getExampleCode('Get Schema Hash')
  }
];

// Get template by id
export const getTemplateById = (id: string): CodeTemplate | undefined => {
  return templates.find(template => template.id === id);
};

// Get templates by category
export const getTemplatesByCategory = (category: CodeTemplateCategory): CodeTemplate[] => {
  return templates.filter(template => template.category === category);
};

// Get template code by template name
export const getTemplateCodeByName = (name: string): string => {
  const template = templates.find(t => t.title === name);
  if (template) {
    return template.code;
  }
  return getExampleCode("");
};
