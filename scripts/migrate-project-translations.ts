import { config } from "dotenv";
import { resolve } from "path";
import connectDB from "../lib/db/connection";
import Project from "../lib/db/models/Project";
import mongoose from "mongoose";

type TranslationEntry = { title?: string; description?: string };

type TranslationsRecord = Record<string, TranslationEntry>;

function normalizeTranslations(translations: unknown): TranslationsRecord {
  if (!translations || typeof translations !== "object") {
    return {};
  }

  if (translations instanceof Map) {
    return Object.fromEntries(translations.entries()) as TranslationsRecord;
  }

  return translations as TranslationsRecord;
}

function buildUpdatedTranslations(
  baseTitle: string,
  baseDescription: string,
  translations: TranslationsRecord,
  options: { backfillMs: boolean }
): { updated: TranslationsRecord; changed: boolean; changeSummary: string[] } {
  const updated: TranslationsRecord = { ...translations };
  const changes: string[] = [];

  // Handle legacy locale keys
  if (updated.en && !updated["en-US"]) {
    updated["en-US"] = updated.en;
    delete updated.en;
    changes.push("moved locale key 'en' -> 'en-US'");
  }

  if (updated.ms && !updated["ms-MY"]) {
    updated["ms-MY"] = updated.ms;
    delete updated.ms;
    changes.push("moved locale key 'ms' -> 'ms-MY'");
  }

  // Backfill default locale from base fields
  if (!updated["en-US"] || (!updated["en-US"].title && !updated["en-US"].description)) {
    updated["en-US"] = {
      title: baseTitle,
      description: baseDescription,
    };
    changes.push("backfilled 'en-US' from base title/description");
  } else {
    const next = { ...updated["en-US"] };
    let innerChanged = false;

    if (!next.title) {
      next.title = baseTitle;
      innerChanged = true;
      changes.push("backfilled 'en-US.title' from base title");
    }

    if (!next.description) {
      next.description = baseDescription;
      innerChanged = true;
      changes.push("backfilled 'en-US.description' from base description");
    }

    if (innerChanged) {
      updated["en-US"] = next;
    }
  }

  if (options.backfillMs) {
    const sourceTitle = updated["en-US"]?.title || baseTitle;
    const sourceDescription = updated["en-US"]?.description || baseDescription;

    if (!updated["ms-MY"] || (!updated["ms-MY"].title && !updated["ms-MY"].description)) {
      updated["ms-MY"] = {
        title: sourceTitle,
        description: sourceDescription,
      };
      changes.push("backfilled 'ms-MY' from en-US/base title/description");
    } else {
      const next = { ...updated["ms-MY"] };
      let innerChanged = false;

      if (!next.title) {
        next.title = sourceTitle;
        innerChanged = true;
        changes.push("backfilled 'ms-MY.title' from en-US/base title");
      }

      if (!next.description) {
        next.description = sourceDescription;
        innerChanged = true;
        changes.push("backfilled 'ms-MY.description' from en-US/base description");
      }

      if (innerChanged) {
        updated["ms-MY"] = next;
      }
    }
  }

  return {
    updated,
    changed: changes.length > 0,
    changeSummary: changes,
  };
}

async function migrateProjectTranslations() {
  // Load .env.local file
  config({ path: resolve(process.cwd(), ".env.local") });

  const isDryRun = process.argv.includes("--dry-run");
  const backfillMs = process.argv.includes("--backfill-ms");

  console.log("\n🔧 Project Translations Migration");
  console.log(`Mode: ${isDryRun ? "DRY RUN" : "WRITE"}`);
  console.log(`Backfill ms-MY: ${backfillMs ? "YES" : "NO"}`);

  console.log("Connecting to MongoDB...");
  await connectDB();
  console.log("✅ Connected\n");

  const projects = await Project.find({}).select("title description translations").lean();

  let touched = 0;
  let updatedCount = 0;

  for (const project of projects) {
    const p = project as {
      _id: string;
      title: string;
      description: string;
      translations?: unknown;
    };

    const currentTranslations = normalizeTranslations(p.translations);
    const { updated, changed, changeSummary } = buildUpdatedTranslations(
      p.title,
      p.description,
      currentTranslations,
      { backfillMs }
    );

    if (!changed) continue;

    touched += 1;

    if (isDryRun) {
      console.log(`- Would update project ${p._id}:`);
      changeSummary.forEach((c) => console.log(`  - ${c}`));
      continue;
    }

    await Project.updateOne(
      { _id: p._id },
      {
        $set: {
          translations: updated,
        },
      }
    );

    updatedCount += 1;
    console.log(`- Updated project ${p._id}`);
  }

  console.log("\n✅ Done");
  console.log(`Projects needing changes: ${touched}`);
  console.log(`Projects updated: ${isDryRun ? 0 : updatedCount}`);
  console.log("");

  if (isDryRun) {
    console.log(
      "Run again without --dry-run to apply changes: tsx scripts/migrate-project-translations.ts"
    );
  }

  await mongoose.disconnect();
}

migrateProjectTranslations().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});
