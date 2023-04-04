import {PrismaClient} from '@prisma/client';

if (!(global as any)?.prisma){
    (global as any).prisma = new PrismaClient();
}

const myPrisma:PrismaClient = (global as any).prisma;

export default myPrisma;