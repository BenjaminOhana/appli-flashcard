import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export interface FlashCard {
  id: string;
  expressionFR: string;
  expressionEN: string;
  rule: string;
  context: string;
  status: "À revoir" | "En cours" | "Acquis ✅" | string;
  nextReviewDate: string | null;
  interval: number;
  score: number;
  revisionsCount: number;
}

export const propertyNames = {
  fr: "🇫🇷 Expression FR",
  en: "🇬🇧 Expression EN",
  rule: "💡 Règle / piège",
  context: "📍 Contexte",
  date: "📅 Date",
  status: "Statut",
  nextReviewDate: "Prochaine révision",
  interval: "Intervalle (jours)",
  score: "Score",
  revisionsCount: "Nb révisions",
};

export function parseNotionCard(page: any): FlashCard {
  const props = page.properties;
  
  // Helpers to extract Notion property contents safely
  const getTitle = (prop: any) => prop?.title?.[0]?.plain_text || "";
  const getRichText = (prop: any) => prop?.rich_text?.[0]?.plain_text || "";
  const getSelect = (prop: any) => prop?.select?.name || "";
  const getStatus = (prop: any) => prop?.status?.name || "À revoir";
  const getNumber = (prop: any, defaultVal = 0) => typeof prop?.number === "number" ? prop.number : defaultVal;
  const getDate = (prop: any) => prop?.date?.start || null;

  return {
    id: page.id,
    expressionFR: getTitle(props[propertyNames.fr]),
    expressionEN: getRichText(props[propertyNames.en]),
    rule: getRichText(props[propertyNames.rule]),
    context: getSelect(props[propertyNames.context]),
    status: getStatus(props[propertyNames.status]),
    nextReviewDate: getDate(props[propertyNames.nextReviewDate]),
    interval: getNumber(props[propertyNames.interval], 0),
    score: getNumber(props[propertyNames.score], 0),
    revisionsCount: getNumber(props[propertyNames.revisionsCount], 0),
  };
}

export async function fetchCardsToReview(): Promise<FlashCard[]> {
  if (!DATABASE_ID) {
    console.warn("NOTION_DATABASE_ID is not defined.");
    return [];
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      or: [
        {
          property: propertyNames.nextReviewDate,
          date: {
            on_or_before: today,
          },
        },
        {
          property: propertyNames.nextReviewDate,
          date: {
            is_empty: true,
          },
        }
      ],
    },
    // Only return pages (filter out empty rows if any)
  });

  return response.results.map(parseNotionCard);
}

export async function addCard(data: { expressionFR: string; expressionEN: string; rule: string; context: string }) {
  if (!DATABASE_ID) throw new Error("Database ID missing");

  const today = new Date().toISOString().split('T')[0];

  return await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      [propertyNames.fr]: {
        title: [{ text: { content: data.expressionFR } }],
      },
      [propertyNames.en]: {
        rich_text: [{ text: { content: data.expressionEN } }],
      },
      [propertyNames.rule]: {
        rich_text: [{ text: { content: data.rule } }],
      },
      [propertyNames.context]: {
        select: { name: data.context },
      },
      [propertyNames.date]: {
        date: { start: today },
      },
      [propertyNames.status]: {
        status: { name: "À revoir" },
      },
      [propertyNames.interval]: { number: 0 },
      [propertyNames.score]: { number: 0 },
      [propertyNames.revisionsCount]: { number: 0 },
    },
  });
}

export async function updateCardProgress(
  id: string,
  data: {
    status: string;
    nextReviewDate: string;
    interval: number;
    score: number;
    revisionsCount: number;
  }
) {
  return await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNames.status]: { status: { name: data.status } },
      [propertyNames.nextReviewDate]: { date: { start: data.nextReviewDate } },
      [propertyNames.interval]: { number: data.interval },
      [propertyNames.score]: { number: data.score },
      [propertyNames.revisionsCount]: { number: data.revisionsCount },
    },
  });
}
