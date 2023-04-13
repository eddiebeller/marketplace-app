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
  getMessage: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.item.findMany({
      where: {
        userId: ctx.auth.userId as string,
      },
      include: {
        message: true,
      },
    });
    return items.flatMap((item) => item.message);
  }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.message.create({
        data: {
          fromUser: ctx.auth.userId as string,
          // TODO: fix bug with the username - now ctx.auth.user is undefined
          fromUserName: ctx.auth.user?.username as string,
          itemId: input.itemId,
          message: input.message,
        },
      });
      return message;
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.item.create({
        data: {
          ...input,
          userId: ctx.auth.userId as string,
        },
      });
      return item;
    }),
});
