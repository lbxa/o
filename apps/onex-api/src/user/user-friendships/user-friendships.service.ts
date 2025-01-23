import { Injectable, NotFoundException } from "@nestjs/common";
import {
  $DrizzleSchema,
  User as PgUser,
  UserFriendship as PgUserFriendship,
  UserFriendshipsTable,
  UsersTable,
} from "@o/db";
import { and, count, desc, eq, getTableColumns } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { DbService } from "@/db/db.service";
import { EntityService, EntityType } from "@/entity";
import {
  InvitationStatus,
  UserConnection,
  UserFriendship as GqlUserFriendship,
  UserFriendshipConnection,
  UserFriendshipEdge,
} from "@/types/graphql";
import {
  buildConnection,
  ConnectionArgs,
  validateAndDecodeGlobalId,
} from "@/utils";
import { encodeGlobalId, mapToEnum } from "@/utils";
import { ForbiddenError, NotFoundError } from "@/utils/errors";

import { UserService } from "../user.service";

@Injectable()
export class UserFriendshipsService
  implements
    EntityService<
      typeof UserFriendshipsTable,
      PgUserFriendship,
      GqlUserFriendship
    >
{
  constructor(
    private dbService: DbService<typeof $DrizzleSchema>,
    private userService: UserService
  ) {}

  public getTypename(): EntityType {
    return "UserFriendship";
  }

  public pg2GqlMapper(
    pgUserFriendship: PgUserFriendship & {
      user: PgUser;
      friend: PgUser;
    }
  ): GqlUserFriendship {
    return {
      ...pgUserFriendship,
      id: encodeGlobalId("UserFriendship", pgUserFriendship.id),
      status: mapToEnum(InvitationStatus, pgUserFriendship.status),
      user: this.userService.pg2GqlMapper(pgUserFriendship.user),
      friend: this.userService.pg2GqlMapper(pgUserFriendship.friend),
    };
  }

  // maybe add this to the general API
  public buildEdge(
    friendship: PgUserFriendship & {
      user: PgUser;
      friend: PgUser;
    }
  ): UserFriendshipEdge {
    return {
      __typename: "UserFriendshipEdge",
      node: this.pg2GqlMapper(friendship),
      cursor: encodeGlobalId("UserFriendship", friendship.id),
    };
  }

  public async findById(id: number): Promise<GqlUserFriendship | undefined> {
    const friendship =
      await this.dbService.db.query.UserFriendshipsTable.findFirst({
        where: eq(UserFriendshipsTable.id, id),
        with: {
          user: true,
          friend: true,
        },
      });

    if (!friendship) {
      throw new NotFoundException(`User friendship not found: ${id}`);
    }

    return this.pg2GqlMapper(friendship);
  }

  async requestFriendship(
    userId: number,
    friendId: number
  ): Promise<GqlUserFriendship> {
    if (userId === friendId) {
      throw new ForbiddenError("Cannot request friendship with self");
    }

    const [result] = await this.dbService.db
      .insert(UserFriendshipsTable)
      .values({
        userId,
        friendId,
        status: InvitationStatus.PENDING,
      })
      .returning({ id: UserFriendshipsTable.id });

    const friendship =
      await this.dbService.db.query.UserFriendshipsTable.findFirst({
        where: eq(UserFriendshipsTable.id, result.id),
        with: {
          user: true,
          friend: true,
        },
      });

    if (!friendship) {
      throw new NotFoundError(`Failed to create friendship`);
    }

    return this.pg2GqlMapper(friendship);
  }

  /**
   * Returns the friendship for the given user and friend.
   * Returns undefined if the friendship does not exist.
   * [(userId, friendId), (friendId, userId)]
   */
  async getFriendship(
    userId: number,
    friendId: number
  ): Promise<{
    outgoing?: GqlUserFriendship;
    incoming?: GqlUserFriendship;
  }> {
    const outgoing =
      await this.dbService.db.query.UserFriendshipsTable.findFirst({
        where: and(
          eq(UserFriendshipsTable.userId, userId),
          eq(UserFriendshipsTable.friendId, friendId)
        ),
        with: {
          user: true,
          friend: true,
        },
      });

    const incoming =
      await this.dbService.db.query.UserFriendshipsTable.findFirst({
        where: and(
          eq(UserFriendshipsTable.userId, friendId),
          eq(UserFriendshipsTable.friendId, userId)
        ),
        with: {
          user: true,
          friend: true,
        },
      });

    return {
      outgoing: outgoing ? this.pg2GqlMapper(outgoing) : undefined,
      incoming: incoming ? this.pg2GqlMapper(incoming) : undefined,
    };
  }

  async getFriendships(
    userId: number,
    status?: InvitationStatus,
    direction: "incoming" | "outgoing" = "outgoing",
    args?: ConnectionArgs
  ): Promise<UserFriendshipConnection> {
    const limit = args?.first ?? 10;
    const after = args?.after
      ? validateAndDecodeGlobalId(args.after, "UserFriendship")
      : 0;

    const statusEq = status
      ? eq(UserFriendshipsTable.status, status)
      : undefined;

    const directionEq =
      direction === "incoming"
        ? eq(UserFriendshipsTable.friendId, userId)
        : eq(UserFriendshipsTable.userId, userId);

    const friendships =
      await this.dbService.db.query.UserFriendshipsTable.findMany({
        where: and(directionEq, statusEq),
        with: {
          user: true,
          friend: true,
        },
        limit: limit + 1, // Get one extra to check if there are more results
        offset: after,
        orderBy: desc(UserFriendshipsTable.createdAt),
      });

    const hasNextPage = friendships.length > limit;
    const edges = friendships
      .slice(0, limit)
      .map((friendship) => this.pg2GqlMapper(friendship));

    return buildConnection({
      nodes: edges,
      hasNextPage,
      hasPreviousPage: !!after,
      createCursor: (node) => node.id,
    });
  }

  async getFollowers(
    userId: number,
    args?: ConnectionArgs
  ): Promise<UserConnection> {
    const limit = args?.first ?? 10;
    const after = args?.after
      ? validateAndDecodeGlobalId(args.after, "User")
      : 0;

    const friendships =
      await this.dbService.db.query.UserFriendshipsTable.findMany({
        where: and(
          eq(UserFriendshipsTable.friendId, userId),
          eq(UserFriendshipsTable.status, InvitationStatus.ACCEPTED)
        ),
        with: {
          user: true,
        },
        limit: limit + 1, // Get one extra to check if there are more results
        offset: after,
        orderBy: desc(UserFriendshipsTable.createdAt),
      });

    const hasNextPage = friendships.length > limit;
    const nodes = friendships
      .slice(0, limit)
      .map((friendship) => this.userService.pg2GqlMapper(friendship.user));

    return buildConnection({
      nodes,
      hasNextPage,
      hasPreviousPage: !!after,
      createCursor: (node) => node.id,
    });
  }

  async getFollowing(
    userId: number,
    args?: ConnectionArgs
  ): Promise<UserConnection> {
    const limit = args?.first ?? 10;
    const after = args?.after
      ? validateAndDecodeGlobalId(args.after, "User")
      : 0;

    const friendships =
      await this.dbService.db.query.UserFriendshipsTable.findMany({
        where: and(
          eq(UserFriendshipsTable.userId, userId),
          eq(UserFriendshipsTable.status, InvitationStatus.ACCEPTED)
        ),
        with: {
          friend: true,
        },
        limit: limit + 1, // Get one extra to check if there are more results
        offset: after,
        orderBy: desc(UserFriendshipsTable.createdAt),
      });

    const hasNextPage = friendships.length > limit;
    const nodes = friendships
      .slice(0, limit)
      .map((friendship) => this.userService.pg2GqlMapper(friendship.friend));

    return buildConnection({
      nodes,
      hasNextPage,
      hasPreviousPage: !!after,
      createCursor: (node) => node.id,
    });
  }

  async acceptFriendship(
    acceptorId: number,
    requesterId: number
  ): Promise<GqlUserFriendship> {
    const UserAlias = alias(UsersTable, "user");
    const FriendAlias = alias(UsersTable, "friend");

    const [friendship] = await this.dbService.db
      .select({
        user: UserAlias,
        friend: FriendAlias,
        ...getTableColumns(UserFriendshipsTable),
      })
      .from(UserFriendshipsTable)
      .innerJoin(UserAlias, eq(UserAlias.id, UserFriendshipsTable.userId))
      .innerJoin(FriendAlias, eq(FriendAlias.id, UserFriendshipsTable.friendId))
      .where(
        and(
          // when accepting a friendship, the user is the friendId
          eq(UserFriendshipsTable.userId, requesterId),
          eq(UserFriendshipsTable.friendId, acceptorId)
        )
      );

    if (!friendship) {
      throw new NotFoundError(
        `Friendship between ${acceptorId} and ${requesterId} not found`
      );
    }

    switch (friendship.status) {
      case InvitationStatus.PENDING:
        break;
      case InvitationStatus.DECLINED:
        throw new ForbiddenError("Friendship already declined");
      default:
        throw new ForbiddenError("Friendship not in pending state");
    }

    const [result] = await this.dbService.db
      .update(UserFriendshipsTable)
      .set({ status: InvitationStatus.ACCEPTED })
      .where(
        and(
          eq(UserFriendshipsTable.userId, requesterId),
          eq(UserFriendshipsTable.friendId, acceptorId)
        )
      )
      .returning();

    if (!result) {
      throw new NotFoundError(
        `Friendship between ${requesterId} and ${acceptorId} not found`
      );
    }

    return this.pg2GqlMapper({
      ...result,
      user: friendship.user,
      friend: friendship.friend,
    });
  }

  async declineFriendship(
    acceptorId: number,
    requesterId: number
  ): Promise<GqlUserFriendship> {
    const UserAlias = alias(UsersTable, "user");
    const FriendAlias = alias(UsersTable, "friend");

    const [friendship] = await this.dbService.db
      .select({
        user: UserAlias,
        friend: FriendAlias,
        ...getTableColumns(UserFriendshipsTable),
      })
      .from(UserFriendshipsTable)
      .innerJoin(UserAlias, eq(UserAlias.id, UserFriendshipsTable.userId))
      .innerJoin(FriendAlias, eq(FriendAlias.id, UserFriendshipsTable.friendId))
      .where(
        and(
          // when accepting a friendship, the user is the friendId
          eq(UserFriendshipsTable.userId, requesterId),
          eq(UserFriendshipsTable.friendId, acceptorId)
        )
      );

    if (!friendship) {
      throw new NotFoundError(
        `Friendship between ${acceptorId} and ${requesterId} not found`
      );
    }

    switch (friendship.status) {
      case InvitationStatus.PENDING:
      case InvitationStatus.ACCEPTED:
        break;
      case InvitationStatus.DECLINED:
        throw new ForbiddenError("Friendship already declined");
    }

    const [result] = await this.dbService.db
      .update(UserFriendshipsTable)
      .set({ status: InvitationStatus.DECLINED })
      .where(
        and(
          eq(UserFriendshipsTable.userId, requesterId),
          eq(UserFriendshipsTable.friendId, acceptorId)
        )
      )
      .returning();

    if (!result) {
      throw new NotFoundError(
        `Friendship between ${requesterId} and ${acceptorId} not found`
      );
    }

    return this.pg2GqlMapper({
      ...result,
      user: friendship.user,
      friend: friendship.friend,
    });
  }

  async removeFriendship(userId: number, friendId: number): Promise<boolean> {
    const result = await this.dbService.db
      .delete(UserFriendshipsTable)
      .where(
        and(
          eq(UserFriendshipsTable.userId, userId),
          eq(UserFriendshipsTable.friendId, friendId)
        )
      )
      .returning();

    return result.length > 0;
  }

  async getFollowerCount(userId: number): Promise<number> {
    const followers =
      await this.dbService.db.query.UserFriendshipsTable.findMany({
        where: and(
          eq(UserFriendshipsTable.friendId, userId),
          eq(UserFriendshipsTable.status, InvitationStatus.ACCEPTED)
        ),
      });
    return followers.length;
  }

  async getFollowingCount(userId: number): Promise<number> {
    const following =
      await this.dbService.db.query.UserFriendshipsTable.findMany({
        where: and(
          eq(UserFriendshipsTable.userId, userId),
          eq(UserFriendshipsTable.status, InvitationStatus.ACCEPTED)
        ),
      });
    return following.length;
  }

  async getBuddyCount(userId: number): Promise<number> {
    const ReversedFriendTable = alias(UserFriendshipsTable, "reversedFriend");

    const [buddyCount] = await this.dbService.db
      .select({ buddies: count() })
      .from(UserFriendshipsTable)
      .innerJoin(
        ReversedFriendTable,
        and(
          eq(UserFriendshipsTable.userId, ReversedFriendTable.friendId),
          eq(UserFriendshipsTable.friendId, ReversedFriendTable.userId)
        )
      )
      .where(
        and(
          eq(UserFriendshipsTable.userId, userId),
          eq(UserFriendshipsTable.status, InvitationStatus.ACCEPTED),
          eq(ReversedFriendTable.status, InvitationStatus.ACCEPTED)
        )
      );

    return buddyCount.buddies;
  }
}
