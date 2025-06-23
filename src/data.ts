export const countries = [
  "Việt Nam",
  "Lào",
  "Campuchia",
  "Thái Lan",
  "Trung Quốc",
];

export const neighbors: { [key: string]: string[] } = {
  "Việt Nam": ["Lào", "Campuchia", "Trung Quốc"],
  Lào: ["Việt Nam", "Thái Lan", "Trung Quốc"],
  Campuchia: ["Việt Nam", "Thái Lan"],
  "Thái Lan": ["Lào", "Campuchia"],
  "Trung Quốc": ["Việt Nam", "Lào"],
};

export const colors = [
  "#f87171",
  "#60a5fa",
  "#34d399",
  "#facc15",
  "#a78bfa",
  "#fb923c",
];

export const colorNames: { [hex: string]: string } = {
  "#f87171": "đỏ",
  "#60a5fa": "xanh dương",
  "#34d399": "xanh lá",
  "#facc15": "vàng",
  "#a78bfa": "tím",
  "#fb923c": "cam",
};
