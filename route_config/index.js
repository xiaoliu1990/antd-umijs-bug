import { modalRoutes } from './router'
import { errorRouter } from './error'
export const routes = [
  ...modalRoutes,
  ...errorRouter
]
