import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registry } from '../lib/zod-openapi';

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV31(registry.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Kinomi API',
      version: '1.0.0',
      description: 'REST API for Kinomi — a platform for platonic co-living and companionship.',
    },
    servers: [{ url: '/', description: 'Current server' }],
  });
}
