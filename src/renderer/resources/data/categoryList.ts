export const categories = [
  {
    nameCat: "Technologie",
    color: "#4CAF50",
  },
  {
    nameCat: "Santé",
    color: "#FF5722",
  },
  {
    nameCat: "Éducation",
    color: "#2196F3",
  },
  {
    nameCat: "Art",
    color: "#9C27B0",
  },
  {
    nameCat: "Voyage",
    color: "#FFC107",
  },
  {
    nameCat: "Cuisine",
    color: "#FF9800",
  },
  {
    nameCat: "Sport",
    color: "#3F51B5",
  },
  {
    nameCat: "Finance",
    color: "#009688",
  },
  {
    nameCat: "Environnement",
    color: "#8BC34A",
  },
  {
    nameCat: "Musique",
    color: "#E91E63",
  },
  {
    nameCat: "Mode",
    color: "#3F51B5",
  },
  {
    nameCat: "Science",
    color: "#00BCD4",
  },
  {
    nameCat: "Politique",
    color: "#FFEB3B",
  },
  {
    nameCat: "Culture",
    color: "#607D8B",
  },
  {
    nameCat: "Histoire",
    color: "#FF5722",
  },
  {
    nameCat: "Philosophie",
    color: "#8BC34A",
  },
  {
    nameCat: "Littérature",
    color: "#9E9E9E",
  },
  {
    nameCat: "Photographie",
    color: "#FF9800",
  },
  {
    nameCat: "Astronomie",
    color: "#3F51B5",
  },
  {
    nameCat: "Architecture",
    color: "#9C27B0",
  },
  {
    nameCat: "Jardinage",
    color: "#4CAF50",
  },
  {
    nameCat: "Cinéma",
    color: "#FF5722",
  },
  {
    nameCat: "Technologie de l'information",
    color: "#009688",
  },
  {
    nameCat: "Entrepreneuriat",
    color: "#FF9800",
  },
  {
    nameCat: "Sport automobile",
    color: "#FF5722",
  },
  {
    nameCat: "Bien-être",
    color: "#8BC34A",
  },
  {
    nameCat: "Économie",
    color: "#FFC107",
  },
  {
    nameCat: "Jeux vidéo",
    color: "#2196F3",
  },
  {
    nameCat: "Voyages aventure",
    color: "#FF5722",
  },
  {
    nameCat: "Écologie",
    color: "#4CAF50",
  },
  {
    nameCat: "Spiritualité",
    color: "#9E9E9E",
  },
  {
    nameCat: "Philanthropie",
    color: "#FFEB3B",
  },
  {
    nameCat: "Technologie durable",
    color: "#8BC34A",
  },
  {
    nameCat: "Linguistique",
    color: "#FFC107",
  },
  {
    nameCat: "Sociologie",
    color: "#FF9800",
  },
  {
    nameCat: "Artisanat",
    color: "#3F51B5",
  },
  {
    nameCat: "Astronautique",
    color: "#00BCD4",
  },
  {
    nameCat: "Neurosciences",
    color: "#E91E63",
  },
  {
    nameCat: "Design",
    color: "#9C27B0",
  },
  {
    nameCat: "Éthique",
    color: "#4CAF50",
  },
  {
    nameCat: "Mathématiques",
    color: "#FF9800",
  },
];

export function getCategoryColor(categoryName: string): string {
  const category = categories.find((cat) => cat.nameCat === categoryName);
  return category ? category.color : "#ffffff";
}
