
const levelTemplates = [
  {
    id: 1,
    name: "First Steps",
    apples: [
      { x: 2, y: 2 },
      { x: 5, y: 4 },
      { x: 7, y: 7 },
    ],
    walls: [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 5, y: 2 },
      { x: 6, y: 6 },
    ],
    portal: { x: 8, y: 1 },
    difficulty: "Easy",
  },
];

export const LEVELS = Array.from({ length: 50 }, (_, index) => {
  const template = levelTemplates[0];

  return {
    ...template,
    id: index + 1,
    name: index === 0 ? "First Steps" : `Apple Trail ${index + 1}`,
    apples: template.apples.map((apple) => ({ ...apple })),
    walls: template.walls.map((wall) => ({ ...wall })),
    portal: { ...template.portal },
    difficulty:
      index < 10 ? "Easy" : index < 30 ? "Medium" : "Hard",
  };
});
