# Sample API

## DB structure

- Idea Table
    - id x
    - name x
    - slug x
    - author - author_id x
    - description x
    - date_created x
    - date_updated x
- Tag Table
    - id x
    - name x
    - slug x
    - about x
- Ideas_Tags_Table [Intermittent Table]
    - id
    - tag_id
    - idea_id
- Profile Table
    - id x
    - user_id x
    - name x
    - country x
- User Table
    - id x
    - username x
    - password
- Likes
    - id
    - liked_by - author_id
    - liked_idea - idea_id