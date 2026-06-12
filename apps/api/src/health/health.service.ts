import { Injectable } from '@nestjs/common';

type HealthResponse = {
  success: true;
  message: 'Success';
  data: {
    status: 'ok';
    service: 'undangabi-api';
  };
};

@Injectable()
export class HealthService {
  check(): HealthResponse {
    return {
      success: true,
      message: 'Success',
      data: {
        status: 'ok',
        service: 'undangabi-api',
      },
    };
  }
}
