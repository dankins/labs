ALTER TABLE "connections" ADD CONSTRAINT "connections_member_id_follower_id_unique" UNIQUE("member_id","follower_id");

