# 🗺️ Map Coloring Game

An interactive game that helps users better understand the **map coloring problem** and the **greedy algorithm**.

## 🎯 Objective

The player must **color each country** such that **no neighboring countries share the same color**, while also trying to **use the fewest number of colors possible**.

## 🚀 Live Demo

👉 [https://map-coloring-game.vercel.app](https://map-coloring-game.vercel.app)

## ⚙️ Key Features

- 🎨 **Manual coloring** of individual countries by selecting a color.
- ⚡ **Automatic coloring** using the Greedy algorithm.
- 📜 **Coloring log** that displays:
  - Which color was assigned to each country.
  - Which colors have been used by its neighboring countries.
- ✅ **Comparison with Greedy algorithm**: checks if the user’s coloring matches the greedy solution.
- 💡 **Explanation of the Greedy algorithm** idea.
- 📊 **Statistics**: number of colored countries and colors used.
- 🔄 **Reset button** to restart the coloring process.

## 🧠 Problem & Algorithm Overview

### 📌 Map Coloring Problem

- Each country is represented as a **node** in a graph.
- An **edge** between two nodes indicates that the countries are neighbors and must not share the same color.
- The goal is to **color all nodes** such that no adjacent nodes share the same color.

### ⚙️ Greedy Coloring Algorithm

- Traverse each country in a given order.
- For each country:
  - Assign the **first available color** that has not been used by its neighbors.
  - Do not go back and change previously assigned colors (no backtracking).
- **Fast** and **simple**, but does **not guarantee** the minimum number of colors.

---

## 🧩 Tech Stack

- ⚛️ ReactJS + TypeScript
- 💨 Tailwind CSS
- 🔔 React Hot Toast

## 📁 Getting Started Locally

```bash
git clone https://github.com/lengocanh2005it/map-coloring-game.git
cd map-coloring-game
npm install
npm run dev
