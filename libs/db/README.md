# Data Model

The data model is segmented into constituent entities: users, communities, and challenges. These entities are important to understand as they form the basis of the codebases's naming conventions and structure, as per Domain Driven Design (DDD).

```mermaid
erDiagram
    USER {
        number id PK
        string firstName
        string lastName
        string email
        string handle
        datetime created_at
        datetime updated_at
    }
    COMMUNITY {
        number id PK
        string name
        boolean is_public
        boolean is_verified
        number owner_id FK
        datetime created_at
        datetime updated_at
    }
    COMMUNITY_MEMBERSHIP {
        number id PK
        number user_id FK
        number community_id FK
        boolean is_admin
        datetime joined_at
    }
    COMMUNITY_INVITATION {
        number id PK
        number community_id FK
        number inviter_id FK
        number invitee_id FK
        string status
        datetime created_at
        datetime expires_at
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
    CHALLENGE_MEMBERSHIP {
        number id PK
        number user_id FK
        number community_id FK
        number challenge_id FK
        datetime joined_at
    }
    CHALLENGE_INVITATION {
        number id PK
        number challenge_id FK
        number inviter_id FK
        number invitee_id FK
        string status
        datetime created_at
        datetime expires_at
    }

    USER ||--o{ COMMUNITY_MEMBERSHIP : "participates in"
    USER ||--o{ CHALLENGE_MEMBERSHIP : "participates in"
    USER ||--o{ COMMUNITY_INVITATION : "invites/is invited to community"
    USER ||--o{ CHALLENGE_INVITATION : "invites/is invited to challenge"
    COMMUNITY ||--|{ COMMUNITY_MEMBERSHIP : "has"
    COMMUNITY ||--|{ CHALLENGE : "contains"
    COMMUNITY ||--o{ COMMUNITY_INVITATION : "has"
    CHALLENGE ||--o{ CHALLENGE_INVITATION : "has"
    CHALLENGE ||--|{ CHALLENGE_MEMBERSHIP: "has"
```

## Communities

There are two types of communities: public and private. Public communities are open to everyone, while private communities require an invitation to join.

### Community Membership

Users can be invited to both a public or private community. A user can either accept or decline an invitation. If the user accepts the invitation, they are added to the community. If they decline, the invitation is not removed but marked as declined. An invitation also has an expiry date (e.g. 7 days). Invitations have three states: `pending`, `accepted`, and `declined`.

### Community Roles

Communities have admins/chiefs/bosses (still deciding on the official name). These are users that have special permissions to manage the community. They can invite users, create challenges, and manage the community settings. Such users can nominate other users to become admins. The concept of an owner is the equivalent to a superadmin. There can only be one owner per community, they can demote or remove any admin.

A community can host multiple challenges. Challenges have a start and end date, and a description. Users have to be part of a community to join the challenges hosted by that community. By default you are not part of a challenge when you join a community, you must join that challenge.

## Challenges

### Challenge Membership

A user must be a member of a community to join their challenge(s). If a user is invited to a community's challenge without being a member, they must first join the community.

### Challenge Roles

Challenge roles are inherited from community roles so the system doesn't explode with complexity.

Q: Should only admins create challenges? Or should any member be able to create a challenge?

### Activities

The bread and butter of challenges are activities. This is where all the logic happens. Activities are the actual things you do in a challenge. There can be multiple activities in a challenge where the level of user customisation comes from concepts below.

To start off, one activity per challenge will keeps simple. However, we want hosts to feel they have the freedom to create diverse challenges with multiple activities.

```mermaid
erDiagram
    USERS {
        number id PK
    }

    CHALLENGES {
        number id PK
    }

    CHALLENGE_ACTIVITIES {
        number id PK
        number challengeId FK
        string type
        string goal
        string unit
        string target
        datetime created_at
        datetime updated_at
    }

    CHALLENGE_ACTIVITY_RESULTS {
        number id PK
        number userId FK
        number activityId FK
        integer result
        datetime created_at
        datetime updated_at
    }

    %% Relationships
    CHALLENGES ||--o{ CHALLENGE_ACTIVITIES : "has"
    CHALLENGE_ACTIVITIES ||--o{ CHALLENGE_ACTIVITY_RESULTS : "has"
    USERS ||--o{ CHALLENGE_ACTIVITY_RESULTS : "submits"
```

#### Activity Types

Users can create a challenge from the following activity types:

- Repetitions
- Weightlifting
- Time-Based (always measured in milliseconds)
- Distance
- Social

Each of these activities can have a different unit of measurement:

- kg
- lb
- m
- ft
- seconds
- minutes
- hours
- mi
- km
- %

We build internal mappings to ensure the correct units are linked to the correct activity types e.g.

```ts
const activityUnitsMap = {
  "Repetitions": [],
  "Time-Based": ["seconds", "minutes", "hours"],
  "Weightlifting": ["kg", "lb"],
  "Distance": ["m", "km", "mi", "ft"],
  "Social": [],
};
```

#### Activity Goals

Goals are how communities quantify the success of a challenge. We currently offer the following goal types:

- Lowest Number
- Highest Number
- Shortest Time
- Longest Time
- Most Improved
- Specific Target

This is our internal mapping to ensure the correct goals are linked to the correct activity types:

```ts
const activityGoalsMap = {
  "Repetitions": ["Lowest Number", "Highest Number", "Specific Target"],
  "Time-Based": ["Shortest Time", "Longest Time"],
  "Weightlifting": ["Most Improved", "Specific Target"],
  "Distance": ["Most Improved", "Specific Target"],
  "Social": [],
};
```

This information gives us the ability to offer a dynamic set of options for users to choose from when creating a challenge. Here are some examples:

- "The One Rep Max": Repetitions, Highest Number
- "The Fastest 5k": Time-Based, Shortest Time
- "The Heaviest Deadlift": Weightlifting, Specific Target, 100 kg
- "The Intense Run": Distance, Most Improved
- "The Most Improved Bench Press": Weightlifting, Most Improved, 30 %
- "The Coffee Run": Social

#### Results

Activities are templates for collecting results. Once a challenge's activity is created we use the units and goal types to infer what the user should record. Results are recorded into the activity results table.
