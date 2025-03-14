import { Injectable, NotFoundException } from "@nestjs/common";
import {
  $DrizzleSchema,
  CommunitiesTable,
  Community as PgCommunity,
} from "@o/db";
import { eq } from "drizzle-orm";

import { PgCommunityComposite } from "@/community/community.types";
import { DbService } from "@/db/db.service";
import { EntityType, SearchableNumericFields } from "@/entity";
import { CommunityImageService } from "@/services/image";
import { UserService } from "@/user/user.service";

import { EntityService } from "../entity/entity-service";
import {
  Community as GqlCommunity,
  CommunityConnection,
  CommunityCreateInput,
  CommunityUpdateInput,
} from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors";
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
    private communityImageService: CommunityImageService,
    private userService: UserService,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

  public getTypename(): EntityType {
    return "Community";
  }

  public pg2GqlMapper(community: PgCommunityComposite): GqlCommunity {
    return {
      ...community,
      id: encodeGlobalId(this.getTypename(), community.id),
      owner: this.userService.pg2GqlMapper(community.owner),
      // by default fetch medium quality image
      imageUrl: community.imageUrl?.medium,
    };
  }

  findBy(
    _fields: SearchableNumericFields<PgCommunityComposite, "id">
  ): Promise<GqlCommunity[]> {
    throw new Error("Method not implemented.");
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

  async create(
    input: CommunityCreateInput,
    userId: number
  ): Promise<GqlCommunity> {
    const { image, ...communityObj } = input;
    const existing = await this.dbService.db.query.CommunitiesTable.findFirst({
      where: eq(CommunitiesTable.name, communityObj.name),
    });

    if (existing) {
      throw new ConflictError("Community name already taken");
    }

    const newCommunity = await this.communityRepository.create({
      ...input,
      ownerId: userId,
    });

    if (!newCommunity) {
      throw new InternalServerError("Failed to create community");
    }

    if (image) {
      await this.communityImageService.setCommunityImageUrl(
        newCommunity.id,
        image
      );
    }

    const communityWithRelations = await this.communityRepository.findById(
      newCommunity.id
    );

    if (!communityWithRelations) {
      throw new InternalServerError("Failed to create community membership");
    }

    return this.pg2GqlMapper(communityWithRelations);
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
