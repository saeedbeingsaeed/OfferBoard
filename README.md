# Offerboard

Track co-op and internship applications on a board: move each job from Saved to Offer, keep
deadlines and notes in one place, and see how your search is going.

Django · HTMX · Tailwind CSS · Postgres (Supabase) · Render. Runs entirely on free tiers.

> Work in progress. Screenshots, architecture and the full guide arrive with the final milestone.

## Run it locally

Needs Python 3.12+ and `curl` (the Tailwind CLI is downloaded automatically, so no Node.js is needed).

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env               # defaults work as-is: SQLite + DEBUG on

python manage.py migrate
bin/tailwind -i assets/app.css -o static/dist/app.css    # add --watch while editing templates
python manage.py runserver
```

Open <http://localhost:8000>.

## Tests and linting

```bash
pytest
ruff check . && ruff format --check .
```

## Deploying

See [docs/setup.md](docs/setup.md) for step-by-step Supabase, Render and Google sign-in setup.
