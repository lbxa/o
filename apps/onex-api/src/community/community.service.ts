import { Injectable, NotFoundException } from "@nestjs/common";
import { CommunitiesTable, Community as PgCommunity } from "@o/db";

import { PgCommunityComposite } from "@/community/community.types";
import { EntityType } from "@/entity";
import { UserService } from "@/user/user.service";

import { EntityService } from "../entity/entity-service";
import {
  Community as GqlCommunity,
  CommunityConnection,
  CommunityUpdateInput,
} from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { NotFoundError } from "../utils/errors";
import { CommunityRepository } from "./community.repository";

@Injectable()
export class CommunityService
  implements
    EntityService<
      typeof CommunitiesTable,
      PgCommunity,
      GqlCommunity,
      PgCommunityComposite
    >
{
  constructor(
    private communityRepository: CommunityRepository,
    private userService: UserService
  ) {}

  public getTypename(): EntityType {
    return "Community";
  }

  public pg2GqlMapper(community: PgCommunityComposite): GqlCommunity {
    return {
      ...community,
      id: encodeGlobalId(this.getTypename(), community.id),
      owner: this.userService.pg2GqlMapper(community.owner),
    };
  }

  async findById(id: number): Promise<GqlCommunity | undefined> {
    const community = await this.communityRepository.findById(id);

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return this.pg2GqlMapper(community);
  }

  async findAll(): Promise<GqlCommunity[]> {
    const allCommunities = await this.communityRepository.findAll();
    return allCommunities.map((community) => this.pg2GqlMapper(community));
  }

  async findUserCommunities(
    userId: number,
    first: number,
    after?: string
  ): Promise<CommunityConnection> {
    const startCursorId = after
      ? validateAndDecodeGlobalId(after, "Community")
      : 0;

    const communities = await this.communityRepository.findUserCommunities(
      userId,
      first + 1,
      startCursorId
    );

    const edges = communities.slice(0, first).map((community) => ({
      node: this.pg2GqlMapper(community),
      cursor: encodeGlobalId(this.getTypename(), community.id),
    }));

    // Determine if there is a next page
    const hasNextPage = communities.length > first;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;

    return {
      edges,
      pageInfo: {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage: startCursorId > 0,
      },
    };
  }

  async create(input: PgCommunity, userId: number): Promise<GqlCommunity> {
    const community = await this.communityRepository.create({
      ...input,
      ownerId: userId,
    });

    if (!community) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    return this.pg2GqlMapper(community);
  }

  async update(input: CommunityUpdateInput): Promise<GqlCommunity> {
    const { id: globalId, ...updates } = input;
    const id = validateAndDecodeGlobalId(globalId, this.getTypename());

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== null)
    );

    const updatedCommunity = await this.communityRepository.update({
      ...filteredUpdates,
      id,
    });

    if (!updatedCommunity) {
      throw new NotFoundError(`Community with id ${id} not found`);
    }

    return this.pg2GqlMapper(updatedCommunity);
  }

  async remove(id: number): Promise<boolean> {
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.communityRepository.delete(id);
  }
}
