// import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
//
// type Role = string;
//
// export function Auth(...roles: Role[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(AuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' })
//   );
// }
