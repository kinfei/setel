import { Controller, Post, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {
  @Post('verify')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Return approved or declined as mock for payment.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
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
