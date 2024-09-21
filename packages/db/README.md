# Data Model

## Communities

There are two types of communities: public and private. Public communities are open to everyone, while private communities require an invitation to join.

Users can be invited to both a public or private community. Invitations should be stored in the database.

Communities have admins/chiefs/bosses. These are users that have special permissions to manage the community. They can invite users, create challenges, and manage the community settings.

```mermaid
---
title: Communities
---
erDiagram
   COMMUNITY {
    number id
    string name
    boolean is_public
  }

  CHALLENGE {
    number id
    string name
    string description
    number community_id
  }

  USER {
    number id
    string firsName
    string lastName
    string email
  }

  USER |o--|{ COMMUNITY : "is member of"
  COMMUNITY ||--|{ CHALLENGE : "has"

```
