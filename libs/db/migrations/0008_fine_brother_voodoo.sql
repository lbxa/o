CREATE INDEX IF NOT EXISTS "search_index" ON "user"."users" USING gin ((
        setweight(to_tsvector('english', "handle"), 'A') ||
        setweight(to_tsvector('english', "email"), 'B') ||
        setweight(to_tsvector('english', "first_name"), 'C') ||
        setweight(to_tsvector('english', "last_name"), 'D')
      ));