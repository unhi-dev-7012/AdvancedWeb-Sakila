import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật ValidationPipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      // Tự động trả về lỗi khi dữ liệu không hợp lệ
      whitelist: true, // Loại bỏ các trường không mong muốn
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );
  await app.listen(3000);
}
bootstrap();
