import { Controller, Post, HttpCode } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  @Post('verify')
  @HttpCode(200)
  verify(): string {
    const random = Math.floor(Math.random() * 2);
    let response;

    switch (random) {
      case 0:
        response = { status: 'declined' };
        break;
      case 1:
        response = { status: 'approved' };
        break;
    }

    return response;
  }
}
