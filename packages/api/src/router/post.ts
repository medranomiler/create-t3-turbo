import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirst({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input } });
  }),
} satisfies TRPCRouterRecord;
