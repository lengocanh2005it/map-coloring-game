import { useState } from "react";
import toast from "react-hot-toast";
import { colorNames, colors, countries, neighbors } from "./data";

type AutoColorLog = {
  country: string;
  colorName: string;
  hex: string;
  usedNeighbors: {
    name: string;
    colorName: string;
  }[];
};

export default function App() {
  const [countryColors, setCountryColors] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [autoColorLogs, setAutoColorLogs] = useState<AutoColorLog[]>([]);
  const [isGreedyCorrect, setIsGreedyCorrect] = useState<boolean | null>(null);

  const handleColorSelect = (color: string) => setSelectedColor(color);

  const generateGreedySolution = (): { [key: string]: string } => {
    const result: { [key: string]: string } = {};
    const orderedCountries = [...countries];

    orderedCountries.forEach((country) => {
      const usedColors = new Set(
        neighbors[country]?.map((n) => result[n]).filter(Boolean)
      );

      const chosenColor = colors.find((color) => !usedColors.has(color));
      if (chosenColor) {
        result[country] = chosenColor;
      }
    });

    return result;
  };

  const handleCountryClick = (country: string) => {
    if (!selectedColor) {
      toast.error("Vui lòng chọn màu trước khi tô.");
      return;
    }

    if (countryColors[country]) {
      toast("Quốc gia này đã được tô màu!", { icon: "ℹ️" });
      return;
    }

    const isConflict = neighbors[country]?.some(
      (neighbor) => countryColors[neighbor] === selectedColor
    );

    if (isConflict) {
      toast.error(`Không thể tô ${country} vì trùng màu với nước láng giềng!`, {
        icon: "⚠️",
      });
      return;
    }

    const newColors = { ...countryColors, [country]: selectedColor };
    setCountryColors(newColors);

    toast.success(`Đã tô màu cho ${country} thành công!`, {
      icon: "🎨",
    });

    if (Object.keys(newColors).length === countries.length) {
      toast.success(
        <div>
          <b>Chúc mừng!</b>
          <p>Bạn đã tô màu xong tất cả {countries.length} quốc gia!</p>
        </div>,
        {
          duration: 5000,
          icon: "🎉",
        }
      );

      const greedy = generateGreedySolution();
      const greedyColorCount = new Set(Object.values(greedy)).size;
      const userColorCount = new Set(Object.values(newColors)).size;

      const isMatch = userColorCount === greedyColorCount;
      setIsGreedyCorrect(isMatch);
    } else {
      setIsGreedyCorrect(null);
    }
  };

  const handleAutoColor = () => {
    setIsGreedyCorrect(null);

    const newColors: { [key: string]: string } = {};
    const shuffledCountries = [...countries].sort(() => Math.random() - 0.5);
    const logs: AutoColorLog[] = [];

    shuffledCountries.forEach((country) => {
      const usedColors = new Set(
        neighbors[country]
          ?.map((neighbor) => newColors[neighbor])
          .filter(Boolean)
      );

      const availableColor = colors.find((color) => !usedColors.has(color));

      if (availableColor) {
        newColors[country] = availableColor;

        const usedNeighborsInfo =
          neighbors[country]
            ?.map((neighbor) => {
              const hex = newColors[neighbor];
              return hex
                ? { name: neighbor, colorName: colorNames[hex] || hex }
                : null;
            })
            .filter(Boolean) || [];

        logs.push({
          country,
          colorName: colorNames[availableColor],
          hex: availableColor,
          usedNeighbors: usedNeighborsInfo as {
            name: string;
            colorName: string;
          }[],
        });
      }
    });

    setCountryColors(newColors);
    setAutoColorLogs(logs);

    toast.success(
      <div>
        <b>Hoàn tất!</b>
        <p>Đã tự động tô màu cho {Object.keys(newColors).length} quốc gia.</p>
      </div>,
      {
        icon: "🎉",
        duration: 5000,
      }
    );
  };

  const handleReset = () => {
    setCountryColors({});
    setSelectedColor("");
    setAutoColorLogs([]);
    setIsGreedyCorrect(null);
  };

  const usedColorsCount = new Set(Object.values(countryColors)).size;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bài toán tô màu bản đồ
          </h1>
          <p className="text-gray-600">
            Tô màu bản đồ sao cho không có hai quốc gia láng giềng nào cùng màu.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Bảng màu
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-full h-12 rounded-lg transition-all cursor-pointer 
                      hover:brightness-110 ${
                        selectedColor === color
                          ? "ring-4 ring-offset-2 ring-gray-400"
                          : ""
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={`Màu ${colorNames[color]}`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Hành động</h2>
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                onClick={handleAutoColor}
              >
                Tự động tô màu
              </button>
              <button
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                onClick={handleReset}
              >
                Đặt lại bản đồ
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Thống kê
              </h2>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Số màu đã dùng:</span>
                  <span className="font-medium">
                    {usedColorsCount} / {colors.length}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Số quốc gia đã tô:</span>
                  <span className="font-medium">
                    {Object.keys(countryColors).length} / {countries.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bản đồ */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {countries.map((country) => {
                    const isHovered = hoveredCountry === country;
                    const neighborConflict =
                      isHovered &&
                      selectedColor &&
                      neighbors[country]?.some(
                        (n) => countryColors[n] === selectedColor
                      );

                    return (
                      <div
                        key={country}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          isHovered ? "transform scale-105 z-10 shadow-lg" : ""
                        } ${
                          neighborConflict
                            ? "border-red-500 animate-pulse"
                            : countryColors[country]
                            ? "border-transparent"
                            : "border-gray-200"
                        }`}
                        style={{
                          backgroundColor: countryColors[country] || "#f9fafb",
                          color: countryColors[country]
                            ? parseInt(
                                countryColors[country].replace("#", ""),
                                16
                              ) >
                              0xffffff / 2
                              ? "#000"
                              : "#fff"
                            : "#374151",
                        }}
                        onClick={() => handleCountryClick(country)}
                        onMouseEnter={() => setHoveredCountry(country)}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="font-medium text-center">{country}</div>
                        {isHovered &&
                          selectedColor &&
                          !countryColors[country] && (
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-20 pointer-events-none">
                              <div
                                className="w-full h-full rounded"
                                style={{ backgroundColor: selectedColor }}
                              />
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hiển thị láng giềng */}
            {hoveredCountry && neighbors[hoveredCountry] && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-gray-700 mb-2">
                  Các nước láng giềng của {hoveredCountry}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {neighbors[hoveredCountry].map((neighbor) => (
                    <span
                      key={neighbor}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: countryColors[neighbor] || "#e5e7eb",
                        color: countryColors[neighbor]
                          ? parseInt(
                              countryColors[neighbor].replace("#", ""),
                              16
                            ) >
                            0xffffff / 2
                            ? "#000"
                            : "#fff"
                          : "#374151",
                      }}
                    >
                      {neighbor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {autoColorLogs.length > 0 && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700 mb-2">
                  📜 Quá trình tô màu tự động:
                </h3>
                <div className="text-sm text-gray-600 mb-4 leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-gray-700 mb-1">
                    🧠 Tư tưởng giải quyết bài toán này:
                  </p>
                  <p>
                    Với mỗi quốc gia, ta sẽ chọn{" "}
                    <strong>màu đầu tiên hợp lệ </strong>
                    (không trùng với bất kỳ nước láng giềng nào đã được tô trước
                    đó). Quá trình diễn ra tuần tự và không quay lại sửa màu đã
                    chọn.
                  </p>
                </div>
                <ul className="space-y-4">
                  {autoColorLogs.map((log, i) => (
                    <li key={i} className="text-sm text-gray-800">
                      <div className="font-medium">✅ {log.country}</div>
                      <div>
                        → Tô màu:{" "}
                        <span
                          className="font-semibold"
                          style={{ color: log.hex }}
                        >
                          {log.colorName}
                        </span>{" "}
                        ({log.hex})
                      </div>
                      <div>
                        → Láng giềng đã dùng:{" "}
                        {log.usedNeighbors.length > 0
                          ? log.usedNeighbors
                              .map((n) => `${n.name} (${n.colorName})`)
                              .join(", ")
                          : "không có"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isGreedyCorrect !== null && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow text-gray-800">
                {isGreedyCorrect ? (
                  <div className="text-green-600 font-semibold">
                    🎉 Cách tô màu của bạn đúng theo thuật toán tham lam
                    (Greedy)!
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">
                    ⚠️ Cách tô màu của bạn <b>khác</b> với thuật toán tham lam.
                    Hãy thử lại nếu muốn!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
