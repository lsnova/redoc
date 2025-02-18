import type { LabelsConfig, LabelsConfigRaw } from './types';

const labels: LabelsConfig = {
  enum: 'Enum',
  enumSingleValue: 'Value',
  enumArray: 'Items',
  default: 'Default',
  deprecated: 'Deprecated',
  example: 'Example',
  examples: 'Examples',
  recursive: 'Recursive',
  arrayOf: 'Array of ',
  webhook: 'Event',
  const: 'Value',
  noResultsFound: 'No results found',
  download: 'Download',
  downloadSpecification: 'Download OpenAPI specification',
  responses: 'Responses',
  callbackResponses: 'Callback responses',
  querySamples: 'Query samples',
  requestSamples: 'Request samples',
  responseSamples: 'Response samples',
  oceanAnyGrant: 'Any grant required:',
  oceanAllGrants: 'All grants required:',
  authorizationDescription: 'Authorization info:',
};

export function setRedocLabels(_labels?: LabelsConfigRaw) {
  Object.assign(labels, _labels);
}

export function l(key: keyof LabelsConfig, idx?: number): string {
  const label = labels[key];
  if (idx !== undefined) {
    return label[idx];
  }
  return label;
}
