CREATE TABLE IF NOT EXISTS "challenge"."activity_type_goal" (
	"type" "challenge"."activity_type" NOT NULL,
	"goal" "challenge"."activity_goal" NOT NULL,
	CONSTRAINT "activity_type_goal_type_goal_pk" PRIMARY KEY("type","goal")
);
