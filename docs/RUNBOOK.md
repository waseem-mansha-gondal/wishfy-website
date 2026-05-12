# Runbook

Operational reference for the wishfy.ai v1 repository and deploy target.
Keep this short, factual, and current. If a procedure changes, update it
here in the same PR.

## Repository

- **URL:** https://github.com/wishfyai/wishfy-website
- **Default branch:** `main`
- **Owner account:** `wishfyai` (GitHub user account)
- **Visibility:** currently `public` — should be flipped to `private` per
  WIS-28; tracked as an open admin task with the CEO (see "Open admin
  tasks" below).
- **Conventional Commits:** enforced via `commitlint.config.cjs`. Runner
  (husky/lefthook + CI hook) is wired up in the scaffolding child issue
  under WIS-2.

### Cloning

```bash
git clone git@github.com:wishfyai/wishfy-website.git
cd wishfy-website
pnpm install
```

The Founding Engineer agent uses an SSH host alias (`github-wishfy`) that
points the same `github.com` host at a wishfyai-scoped key:

```bash
git clone git@github-wishfy:wishfyai/wishfy-website.git
```

That alias lives in `~/.ssh/config` on the engineer workstation, not in
the repo. Public collaborators do not need it.

## Deploy target

- **Provider:** Vercel (Hobby tier)
- **Project:** _to be created — see "Open admin tasks"_
- **Production deploys:** **disabled** at the Vercel project level. Only
  preview deploys may run until a separate CEO approval cuts production
  over.
- **Custom domain:** not yet wired. Cloudflare zone for `wishfy.ai` is
  the eventual DNS source of truth.

## DNS

- **Registrar / DNS:** Cloudflare zone `wishfy.ai`
- **Production records:** untouched in WIS-28. Adding/changing the apex
  or `www` records is a separate gated change.
- **Turnstile:** `0x4AAAAAADN-rfiICdXUz-Fi` (site key); secret in
  `.env.local` and Vercel env (set in the third child issue).

## Access

| Person / agent       | GitHub account            | Repo role | Vercel scope               |
| -------------------- | ------------------------- | --------- | -------------------------- |
| CEO (Waseem)         | `wishfyai`                | owner     | _team to be created_       |
| Founding Engineer    | `waseem-mansha-gondal`    | read \*   | personal scope (transitional) |

\* Founding Engineer pushes commits via the `wishfyai` SSH key (machine
identity for the agent). Repo collaborator role for the
`waseem-mansha-gondal` GitHub user is pending CEO action.

### Adding a new collaborator

1. CEO logs into GitHub as `wishfyai`.
2. Repo → **Settings → Collaborators → Add people**.
3. Invite by GitHub username; pick the lowest role that fits (default
   `Write`; reserve `Admin` for the CEO and the Founding Engineer).
4. Invitee accepts the email invite.
5. Update the table above in the same PR that adds them.

For agent-driven access (e.g. a CI deploy bot), prefer a **fine-grained
PAT** scoped to this single repo, stored in Vercel env or GitHub Actions
secrets — never committed.

## Open admin tasks (CEO-owned)

These cannot be completed by an agent without elevated credentials and
are tracked on [WIS-28](/WIS/issues/WIS-28):

1. Flip repo visibility to **Private**.
2. Add branch protection on `main`: require PR review (1) + require CI
   status checks (placeholder name; real check wired in scaffolding
   child).
3. Create a Vercel **team** for Wishfy (or grant the Founding Engineer
   access to an existing one), then create the `wishfy-website` project
   linked to this repo with **Production deploys disabled**.
4. Confirm Cloudflare access path for the Founding Engineer (read-only
   API token for the `wishfy.ai` zone is sufficient for v1).

## Cross-references

- Stack lock: [`docs/STACK.md`](./STACK.md)
- Stack decision: [WIS-24 → `decision`](/WIS/issues/WIS-24#document-decision)
- Repo init issue: [WIS-28](/WIS/issues/WIS-28)
