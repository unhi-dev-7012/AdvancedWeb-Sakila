import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // Tự động trả về lỗi khi dữ liệu không hợp lệ
    whitelist: true,         // Loại bỏ các trường không mong muốn
    transform: true,         // Tự động chuyển đổi kiểu dữ liệu
  }));
  //Config Swagger
  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('My API')
  //   .setDescription('API documentation with OpenAPI 3.0')
  //   .setVersion('1.0')
  //   .build();

  // const document = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
