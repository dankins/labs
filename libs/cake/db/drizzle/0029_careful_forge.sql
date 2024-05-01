ALTER TABLE "connections" ADD CONSTRAINT "connections_member_id_follower_id_unique" UNIQUE("member_id","follower_id");

insert into profiles (id, parent_type, parent_id, username, created_at, updated_at) 
select gen_random_uuid() as id, 'brand' as parent_type, id as parent_id, slug as username, NOW() as created_at, now() as updated_at from brands;

insert into profiles (id, parent_type, parent_id, username, created_at, updated_at) 
select gen_random_uuid() as id, 'member' as parent_type, id as parent_id, 'member-' || lower(substr(md5(random()::text), 1, 6)) as username, NOW() as created_at, now() as updated_at from members;