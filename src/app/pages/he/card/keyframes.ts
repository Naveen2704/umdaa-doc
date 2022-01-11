import { keyframes, style,animate } from '@angular/animations';

export const swipeup = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(100%, 0%, 0)', opacity: 0 }),
]

export const swipedown = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(-100%, 0%, 0)', opacity: 0 }),
]


