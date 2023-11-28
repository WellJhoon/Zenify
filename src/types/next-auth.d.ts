import type { User } from "next-auth";
import { UserRole } from "@prisma/client";
import "next-auth";

type UserId = string

declare module 'next-auth/jwt'{
    interface JWT {
        id: UserId
        role: UserRole
    }
}
declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserId
            role: UserRole
        }
    }
}
// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string;
//             name: string;
//             image: string;
//             email: string;
//             role: string;
//         }
//     }
// }