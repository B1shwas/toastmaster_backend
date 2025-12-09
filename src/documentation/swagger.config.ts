import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Toastmaster API')
    .setDescription('API documentation for the Toastmaster application')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
}

export function setupSwagger(app: INestApplication) {
  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

export function createSwaggerDocument(app: INestApplication) {
  const config = getSwaggerConfig();
  return SwaggerModule.createDocument(app, config);
}
