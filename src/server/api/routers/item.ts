import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      // TODO: save something to the db

      const item = await ctx.prisma.item.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
      return item;
    }),
});
