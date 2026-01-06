import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type RequestWithUser = {
  user: {
    userId: string;
    email: string;
  };
};

export const CurrentUser = createParamDecorator(
  (data: 'userId' | 'email', ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
