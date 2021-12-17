import { Module, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class DocsModule {
  async setup(app: INestApplication, title: string, desc: string) {
    const builder = new DocumentBuilder()
      .setTitle(title)
      .setDescription(desc)
      .addBearerAuth()
      .addOAuth2()
      .addBearerAuth();

    const config = builder.build();

    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });

    SwaggerModule.setup('api', app, document, {
      uiConfig: {},
      swaggerOptions: {},
    });
  }
}
