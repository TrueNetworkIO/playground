import { CodeTemplate, CodeTemplateCategory } from "@/shared/schema";
import { getExampleCode } from "./editor";

// Predefined code templates for the playground
export const templates: CodeTemplate[] = [
  {
    id: "attestation-basic",
    title: "Attestation Example",
    description: "Create and issue a basic attestation",
    category: "attestations",
    language: "typescript",
    code: getExampleCode("Simple Attestation")
  },
  {
    id: "reputation-model",
    title: "Basic Reputation Model",
    description: "Create a reputation model with configurable weights",
    category: "reputation",
    language: "typescript",
    code: getExampleCode("Weighted Score")
  },
  {
    id: "trust-algorithm",
    title: "Trust Algorithm",
    description: "Implement a custom algorithm for computing trust scores",
    category: "utility",
    language: "typescript",
    code: getExampleCode("Trust Algorithm")
  },
  {
    id: "custom-template",
    title: "Custom Template",
    description: "Start with a blank template",
    category: "attestations",
    language: "typescript",
    code: getExampleCode("")
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
