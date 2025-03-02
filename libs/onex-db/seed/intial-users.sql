INSERT INTO "user".users (first_name, last_name, email, handle, password, refresh_token, avatar_url)
VALUES
('Lucas', 'Barbosa', 'lucasbrsa@hotmail.com', 'lbxa', 'Password1', NULL, NULL),
('John', 'Doe', 'john.doe1@example.com', 'johndoe1', 'password1', NULL, NULL),
('Jane', 'Smith', 'jane.smith2@example.com', 'janesmith2', 'password2', NULL, NULL),
('Michael', 'Johnson', 'michael.johnson3@example.com', 'michaeljohnson3', 'password3', NULL, NULL),
('Emily', 'Davis', 'emily.davis4@example.com', 'emilydavis4', 'password4', NULL, NULL),
('David', 'Brown', 'david.brown5@example.com', 'davidbrown5', 'password5', NULL, NULL),
('Sarah', 'Miller', 'sarah.miller6@example.com', 'sarahmiller6', 'password6', NULL, NULL),
('Chris', 'Wilson', 'chris.wilson7@example.com', 'chriswilson7', 'password7', NULL, NULL),
('Jessica', 'Moore', 'jessica.moore8@example.com', 'jessicamoore8', 'password8', NULL, NULL),
('Daniel', 'Taylor', 'daniel.taylor9@example.com', 'danieltaylor9', 'password9', NULL, NULL),
('Laura', 'Anderson', 'laura.anderson10@example.com', 'lauraanderson10', 'password10', NULL, NULL),
('Matthew', 'Thomas', 'matthew.thomas11@example.com', 'matthewthomas11', 'password11', NULL, NULL),
('Olivia', 'Jackson', 'olivia.jackson12@example.com', 'oliviajackson12', 'password12', NULL, NULL),
('Andrew', 'White', 'andrew.white13@example.com', 'andrewwhite13', 'password13', NULL, NULL),
('Megan', 'Harris', 'megan.harris14@example.com', 'meganharris14', 'password14', NULL, NULL),
('Joshua', 'Martin', 'joshua.martin15@example.com', 'joshuamartin15', 'password15', NULL, NULL),
('Ashley', 'Thompson', 'ashley.thompson16@example.com', 'ashleythompson16', 'password16', NULL, NULL),
('Ryan', 'Garcia', 'ryan.garcia17@example.com', 'ryangarcia17', 'password17', NULL, NULL),
('Amanda', 'Martinez', 'amanda.martinez18@example.com', 'amandamartinez18', 'password18', NULL, NULL),
('Nicholas', 'Robinson', 'nicholas.robinson19@example.com', 'nicholasrobinson19', 'password19', NULL, NULL),
('Stephanie', 'Clark', 'stephanie.clark20@example.com', 'stephanieclark20', 'password20', NULL, NULL);

-- Create the community with ID 1 if it doesn't exist
INSERT INTO community.communities (id, name, is_public, is_verified, owner_id)
SELECT 1, 'Default Community', true, false, 1
WHERE NOT EXISTS (
    SELECT 1 FROM community.communities WHERE id = 1
);

-- Add all users to community with ID 1
INSERT INTO community.memberships (user_id, community_id, is_admin)
SELECT id, 1, 
  CASE 
    WHEN id = 1 THEN true  -- Make Lucas Barbosa (assuming ID 1) an admin
    ELSE false
  END
FROM "user".users
WHERE id > 0;