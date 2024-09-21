# Data Model

## Communities

There are two types of communities: public and private. Public communities are open to everyone, while private communities require an invitation to join.

Users can be invited to both a public or private community. Invitations should be stored in the database.

Communities have admins/chiefs/bosses (still deciding on the official name). These are users that have special permissions to manage the community. They can invite users, create challenges, and manage the community settings. Such users can nominate other users to become admins.

```mermaid
erDiagram
    USER {
        number id PK
        string firstName
        string lastName
        string email
        datetime created_at
        datetime updated_at
    }
    COMMUNITY {
        number id PK
        string name
        boolean is_public
        datetime created_at
        datetime updated_at
    }
    CHALLENGE {
        number id PK
        string name
        string description
        number community_id FK
        datetime start_date
        datetime end_date
        datetime created_at
        datetime updated_at
    }
    MEMBERSHIP {
        number id PK
        number user_id FK
        number community_id FK
        boolean is_admin
        datetime joined_at
    }
    INVITATION {
        number id PK
        number community_id FK
        number inviter_id FK
        number invitee_id FK
        string status
        datetime created_at
        datetime expires_at
    }
    USER ||--o{ MEMBERSHIP : "participates in"
    USER ||--o{ INVITATION : "invites/is invited"
    COMMUNITY ||--|{ MEMBERSHIP : "has"
    COMMUNITY ||--|{ CHALLENGE : "contains"
    COMMUNITY ||--o{ INVITATION : "has"

```
