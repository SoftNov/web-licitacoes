import { CanActivateFn } from '@angular/router';

export const usuarioNaoAutenticadoGuard: CanActivateFn = (route, state) => {
  return true;
};
