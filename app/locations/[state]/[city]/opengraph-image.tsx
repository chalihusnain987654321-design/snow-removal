import { ImageResponse } from "next/og";
import { business } from "@/config/business";
import { cities, getCityBySlug } from "@/data/cities";
import { getStateBySlug } from "@/data/states";

export const alt = "Snow Removal Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return cities.map((city) => ({ state: city.stateSlug, city: city.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);
  const state = city ? getStateBySlug(city.stateSlug) : undefined;
  const cityName = city ? `${city.name}, ${state?.abbr ?? ""}` : "Your City";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a1220 0%, #16283f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#ea580c", fontWeight: 700, display: "flex" }}>
          {business.name}
        </div>
        <div style={{ fontSize: 60, fontWeight: 800, marginTop: 24, lineHeight: 1.1, display: "flex" }}>
          Snow Removal in {cityName}
        </div>
        {city?.avgAnnualSnowfallInches !== null && city?.avgAnnualSnowfallInches !== undefined && (
          <div style={{ fontSize: 28, color: "#cbd5e1", marginTop: 24, display: "flex" }}>
            ~{city.avgAnnualSnowfallInches} inches of snow a year · 24/7 storm dispatch
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
