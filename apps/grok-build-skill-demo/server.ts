import { readdir } from "node:fs/promises";
import { join } from "node:path";

const PORT = 3456;
const SKILLS_DIR = join(import.meta.dir, "skills");
const PUBLIC_DIR = join(import.meta.dir, "public");

interface SkillConfig {
  id: string;
  name: string;
  version: string;
  description: string;
  entry: string;
  input: { label: string; placeholder: string; example: string };
}

// Skill listings reflect live config: skill.json files are re-read from disk
// on every request, so config edits show up on the next refresh.
async function loadSkills(): Promise<SkillConfig[]> {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  const skills: SkillConfig[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const configFile = Bun.file(join(SKILLS_DIR, entry.name, "skill.json"));
    if (await configFile.exists()) {
      skills.push(await configFile.json());
    }
  }
  return skills;
}

async function runSkill(skillId: string, input: { text: string }) {
  const skills = await loadSkills();
  const skill = skills.find((s) => s.id === skillId);
  if (!skill) return null;
  // Dynamic import is required here: the action module path comes from the
  // skill's on-disk config, which is the point of the plugin-style demo.
  const action = await import(join(SKILLS_DIR, skill.id, skill.entry));
  return action.run(input);
}

Bun.serve({
  port: PORT,
  routes: {
    "/": () => new Response(Bun.file(join(PUBLIC_DIR, "index.html"))),
    "/api/skills": async () => Response.json(await loadSkills()),
    "/api/skills/:id/run": {
      POST: async (req) => {
        const input = (await req.json()) as { text: string };
        const result = await runSkill(req.params.id, input);
        if (result === null) {
          return Response.json({ error: "skill not found" }, { status: 404 });
        }
        return Response.json(result);
      },
    },
  },
});

console.log(`grok-build-skill-demo running at http://localhost:${PORT}`);
