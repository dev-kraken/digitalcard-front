export {default} from "next-auth/middleware"

export const config = {matcher: ["/((?!sign-up|sign-in|api).*)"],}