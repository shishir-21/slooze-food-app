// Custom decorator to define required roles

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => 
  SetMetadata('roles', roles);