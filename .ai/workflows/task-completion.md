# Task Completion Workflow

## Purpose

Define what must happen after every completed task.

---

# Definition of Done

A task is considered DONE only if:

* Code implemented
* Typecheck passed
* Build passed
* Relevant documentation updated
* Progress tracker updated

---

# Documentation Update Rules

## Backend Change

Update if changed:

```txt
docs/api/api-contract.md
docs/database/prisma-schema-design.md
docs/database/database-design.md
```

---

## Frontend Change

Update if changed:

```txt
docs/frontend/frontend-routes.md
docs/frontend/ui-pages.md
docs/frontend/ui-components.md
```

---

## Architecture Change

Update if changed:

```txt
docs/architecture/design.md
docs/architecture/module-breakdown.md
```

---

# Backlog Update

When task completed:

Example:

```txt
AUTH-005
```

Update:

```txt
Status: DONE
```

---

# Progress Update

Move task:

```txt
TODO
```

to:

```txt
DONE
```

Update:

```txt
Current Tasks
Completed Tasks
Overall Progress
MVP Completion
```

---

# Milestone Update

If milestone target reached:

Update:

```txt
docs/development/milestones.md
```

Status:

```txt
PLANNED
```

to:

```txt
DONE
```

---

# Decision Log

If implementation introduces architectural decision:

Update:

```txt
docs/development/progress.md
```

Decision Log section.

Example:

```txt
DEC-002

Use Cloudflare R2 instead of MinIO.
```

---

# Pull Request Checklist

Before marking task DONE:

* Documentation updated
* No TypeScript errors
* No lint errors
* No ownership violations
* No permission violations
* No duplicated types
* No duplicated utilities
* Follows AGENTS.md
