import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  Community as PgCommunity,
  NewCommunity as PgNewCommunity,
} from "@o/db";
import { CommunitiesTable, CommunityMembershipsTable, UsersTable } from "@o/db";
import { desc, eq, inArray } from "drizzle-orm";

import { PgCommunityComposite } from "@/community/community.types";

import { DbService } from "../db/db.service";
import { EntityRepository, FindByArgs } from "../entity";

@Injectable()
export class CommunityRepository
  implements
    EntityRepository<
      typeof CommunitiesTable,
      PgCommunity,
      PgNewCommunity,
      PgCommunityComposite
    >
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  async create(
    newCommunity: PgNewCommunity
  ): Promise<PgCommunityComposite | undefined> {
    const [result] = await this.dbService.db
      .insert(CommunitiesTable)
      .values(newCommunity)
      .returning();

    const owner = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, result.ownerId),
    });

    if (owner) {
      await this.dbService.db
        .insert(CommunityMembershipsTable)
        .values({ userId: owner.id, communityId: result.id, isAdmin: true });
    }

    return owner ? { ...result, owner } : undefined;
  }

  async update(
    updateCommunityInput: Partial<PgCommunity> & { id: number }
  ): Promise<PgCommunityComposite | undefined> {
    const [updatedCommunity] = await this.dbService.db
      .update(CommunitiesTable)
      .set(updateCommunityInput)
      .where(eq(CommunitiesTable.id, updateCommunityInput.id))
      .returning();

    if (!updatedCommunity) {
      return undefined;
    }

    const owner = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, updatedCommunity.ownerId),
    });

    return owner ? { ...updatedCommunity, owner } : undefined;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedCommunity] = await this.dbService.db
      .delete(CommunitiesTable)
      .where(eq(CommunitiesTable.id, id))
      .returning();

    return !!deletedCommunity;
  }

  async findBy(
    fields: Partial<
      Record<keyof Pick<PgCommunity, "id" | "ownerId">, number | number[]>
    > = {},
    args?: FindByArgs
  ): Promise<PgCommunityComposite[]> {
    const communities = await this.dbService.db.query.CommunitiesTable.findMany(
      {
        where: Object.keys(fields).length
          ? (communities, { and, eq }) =>
              and(
                ...Object.entries(fields).map(([k, v]) =>
                  Array.isArray(v)
                    ? inArray(communities[k as keyof typeof communities], v)
                    : eq(communities[k as keyof typeof communities], v)
                )
              )
          : undefined,
        limit: args?.limit,
        offset: args?.offset,
        with: { owner: true },
      }
    );

    return communities;
  }

  async findById(id: number): Promise<PgCommunityComposite | undefined> {
    const community = await this.dbService.db.query.CommunitiesTable.findFirst({
      where: eq(CommunitiesTable.id, id),
      with: { owner: true },
    });

    return community;
  }

  async findAll(): Promise<PgCommunityComposite[]> {
    const communities = await this.dbService.db.query.CommunitiesTable.findMany(
      {
        with: { owner: true },
      }
    );

    return communities;
  }

  async findUserCommunities(
    userId: number,
    first: number,
    startCursorId: number
  ): Promise<PgCommunityComposite[]> {
    const communities = await this.dbService.db
      .select({
        community: CommunitiesTable,
        owner: UsersTable,
      })
      .from(CommunityMembershipsTable)
      .innerJoin(
        CommunitiesTable,
        eq(CommunitiesTable.id, CommunityMembershipsTable.communityId)
      )
      .innerJoin(UsersTable, eq(UsersTable.id, CommunitiesTable.ownerId))
      .where(eq(CommunityMembershipsTable.userId, userId))
      .orderBy(desc(CommunitiesTable.createdAt))
      .offset(startCursorId)
      .limit(first + 1);

    return communities.map((result) => ({
      ...result.community,
      owner: result.owner,
    }));
  }
}
