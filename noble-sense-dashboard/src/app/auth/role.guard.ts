// import { CanActivateFn, Router } from '@angular/router';
// import { AuthenticationService } from '../pages/authentication/services/authentication.service';
// import { inject } from '@angular/core';
// import { Role } from '../models/user.model';

// export const roleGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthenticationService);
//   const router = inject(Router);

//   const userRole = authService.getUserRole();
//   // Check the route data for allowed roles
//   // Convert string to Role enum
//   const userRoleEnum = Role[userRole as keyof typeof Role];

//   const allowedRoles = route.data['allowedRoles'] as Array<Role>;
//   if (userRoleEnum && allowedRoles.includes(userRoleEnum)) {
//     return true; // Allow access to the route for the allowed roles
//   } else {
//     return false; // Prevent access to the route
//   }
// };
