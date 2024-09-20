import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { communities } from "../db/schema";
import { Community } from "../types/graphql";
import { encodeGlobalId } from "../utils";

@Injectable()
export class CommunitiesService {
  constructor(private dbService: DbService) {}

  async findOne(id: number): Promise<Community> {
    const [community] = await this.dbService.db
      .select()
      .from(communities)
      .where(eq(communities.id, id));

    const globalId = encodeGlobalId("Community", community.id);

    return { ...community, id: globalId };
  }
}
