# openai-edge-functions

ref: https://youtu.be/29p8kIqyU_Y

## Tech Stack

- Supabase
- Deno
- VS Code
  - https://github.com/denoland/vscode_deno/

## Run local

Setup your OpenAI API key in `.env.local`

```bash
$ cp .env.example .env.local
```

```bash
$ supabase start

$ supabase functions serve --env-file .env.local openai
Starting supabase/functions/openai
Serving supabase/functions/openai
Watcher Process started.
Check file:///home/deno/functions/openai/index.ts
Listening on http://localhost:8000/
```
