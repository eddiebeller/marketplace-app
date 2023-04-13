import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.item.findMany();
  }),
  get: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.item.findUnique({
        where: {
          id: input.itemId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.item.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
      return item;
    }),
});
