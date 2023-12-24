import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = new Router();
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/register']);
    return false;
  }

  return true;
};
