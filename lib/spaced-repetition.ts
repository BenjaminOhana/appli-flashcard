import { FlashCard } from "./notion";

export type ReviewPerformance = "knew" | "forgot";

export function calculateNextReview(card: FlashCard, performance: ReviewPerformance) {
  let newInterval = card.interval;
  let newScore = card.score;
  let newStatus: string = "En cours";
  
  if (performance === "forgot") {
    newInterval = 1; // En cas d'erreur, on revoit demain (1 jour)
    newScore = Math.max(0, card.score - 1);
    newStatus = "À revoir"; 
  } else {
    // Si c'est bon, on multiplie l'intervalle par 2.5, plafonné à 30 jours
    newInterval = card.interval === 0 ? 1 : Math.min(30, Math.round(card.interval * 2.5));
    newScore = card.score + 1;
    // Si l'intervalle est grand (ex >= 21j), on peut considérer comme "Acquis ✅"
    newStatus = newInterval >= 21 ? "Acquis ✅" : "En cours";
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    interval: newInterval,
    score: newScore,
    status: newStatus,
    nextReviewDate: nextReviewDate.toISOString().split("T")[0],
    revisionsCount: card.revisionsCount + 1,
  };
}
