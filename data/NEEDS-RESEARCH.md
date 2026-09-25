# Needs Research

Fields left `null` in the data files because they couldn't be verified
from a credible source (NOAA/NWS climate normals, US Census, or an
official municipal site) during Phase 2 research. Fill these in with a
sourced value before treating a page as complete — don't guess. Add a
new section here every time a new state or city is added with
unverified fields.

## States

### All three states (`data/states.ts`)
- `avgAnnualSnowfallInches` — deliberately `null` for Michigan, New York, and Minnesota. Snowfall varies too dramatically within each state (e.g. ~45" in Detroit vs. ~149" in Marquette; ~25" in NYC vs. 200"+ on the Tug Hill Plateau) for a single statewide figure to be honest. If you want a number here anyway, it should be a clearly-labeled regional figure, not a flat state average.

## Cities

Unless noted otherwise below, every city's `population`, coordinates,
`county`, `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`,
`coldestMonthAvgLowF`, `majorRoads`, and `localSnowNotes` were verified
against NOAA/NWS 1991–2020 climate normals, US Census figures, and
Wikipedia infoboxes that cite those sources. Only the gaps below are
outstanding.

### Michigan
- **Detroit** — `avgSnowDaysPerYear`: null (only a mismatched-definition figure was found — "days with ≥1 inch" rather than the standard "measurable snowfall" metric used elsewhere)
- **Kalamazoo** — `avgSnowDaysPerYear`: null (not available in the sources checked)
- **Flint, Marquette, Saginaw, Sault Ste. Marie** — `ordinanceNote`: null (sidewalk-clearing is described as "the property owner's responsibility" in general terms, but no specific, citable time limit or parking-ban detail was found)
- **Sault Ste. Marie** — `neighborhoods`: only 3 verified names found (small city, no documented formal neighborhood system)

### New York
- **Saranac Lake** — `avgAnnualSnowfallInches`: null (sources only give a 100–125" range, not a precise NOAA normal for a nearby station — the range is described qualitatively in `localSnowNotes` instead)
- **Albany, Utica, Binghamton, Watertown, Niagara Falls, Ithaca, Saranac Lake** — `ordinanceNote`: null (no specific, citable municipal ordinance found; confirmed real ordinances were only found for Buffalo, Rochester, and Syracuse)

### Minnesota
- **Bemidji** — `avgSnowDaysPerYear`: null (only a non-NOAA aggregator figure was found, using a different measurement standard than the NOAA figures used for other cities)
- **St. Cloud, Mankato, Moorhead, Bemidji, International Falls, Brainerd** — `ordinanceNote`: null (no specific, citable municipal ordinance found; confirmed real ordinances were only found for Minneapolis, Saint Paul, Duluth, and Rochester)
- **Brainerd, International Falls** — `neighborhoods`: only 1–2 verified names found (small cities, no documented formal neighborhood system)

## Known limitation: `nearbyCitySlugs`

Every city's `nearbyCitySlugs` is a same-state, real-geography grouping
(driving-distance proximity) rather than a researched/cited fact — it's
used only for "nearby cities we serve" internal links, not displayed as
a claim on the page. A few pairings (e.g. Marquette ↔ Sault Ste. Marie,
~170 miles) are the closest available city *within this 30-city pilot
set*, not genuinely close — this will improve automatically as more
cities are added in later phases.

---

# Full 38-state expansion (35 states added beyond the Phase 2 pilot)

Added Michigan/New York/Minnesota's 3-state pilot up to full coverage
of the brief's snow-state list: 33 Tier 1 states plus 5 Tier 2
partial-coverage states (Nevada, New Mexico, western North Carolina,
Kentucky, eastern Tennessee), researched in the same way as Phase 2 —
NOAA/NWS climate normals, US Census figures, state DOT winter-
maintenance pages, and official municipal codes, with unconfirmable
fields left `null` rather than guessed. `nearbyCitySlugs` for every new
city was computed programmatically from real latitude/longitude
(nearest 3–4 same-state cities by great-circle distance), not
hand-picked, so it's consistent across all 260 new cities.

**Honest substitution — Oregon:** Corvallis was replaced with Sisters,
OR, because Corvallis (Willamette Valley, ~3.9in/yr snowfall) would
have produced a page nearly indistinguishable from other mild-winter
valley towns — a thin-content risk per this file's hard rule against
doorway pages. Sisters sits at the foot of the Cascades and has
genuinely distinct, citable local snow content. The reasoning is also
recorded inline in Sisters' `localSnowNotes`.

**Contrast case — Utah:** St. George is included deliberately as an
honest low-snow contrast (~1.4in/yr) rather than a genuine snow-removal
market, consistent with how Boise (ID) and Medford (OR) are also
included with modest, honestly-reported snowfall rather than omitted
or inflated.

## Per-state null fields (35 new states)

Unless noted, every new city's `population`, coordinates, `county`,
`avgAnnualSnowfallInches`, `coldestMonthAvgLowF`, `majorRoads`, and
`localSnowNotes` were verified against NOAA/NWS climate normals, US
Census figures, and state/municipal sources. Only the gaps below are
outstanding — `avgSnowDaysPerYear` in particular is null for the large
majority of new cities because a station-level "average snow days"
figure (distinct from total snowfall) was often not published or not
independently verifiable in the time available.

### Maine
- `avgAnnualSnowfallInches`: null (statewide figure not meaningful — see `climateNotes`)
- **Lewiston, Bangor, Augusta** — `ordinanceNote`: null
- **Auburn, Biddeford** — `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null
- **Sanford** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Caribou** — `ordinanceNote`: null; only 0 neighborhoods found (small city, no documented formal system)

### New Hampshire
- `avgAnnualSnowfallInches`: null
- **Manchester, Rochester** — `avgSnowDaysPerYear`: null
- **Nashua, Concord, Portsmouth, Keene** — `ordinanceNote`: null
- **Dover** — `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null; only 2 neighborhoods found
- **Berlin** — `ordinanceNote`: null; only 2 neighborhoods found

### Vermont
- `avgAnnualSnowfallInches`: null
- **South Burlington** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null
- **Rutland, Montpelier** — `ordinanceNote`: null
- **Barre** — `ordinanceNote`: null; only 1 neighborhood found
- **St. Albans** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 1 neighborhood found
- **Bennington** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Brattleboro** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 2 neighborhoods found

### Massachusetts
- `avgAnnualSnowfallInches`: null
- **Lowell** — `ordinanceNote`: null
- **Cambridge** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Pittsfield** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Northampton** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Greenfield** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 1 neighborhood found

### Rhode Island
- `avgAnnualSnowfallInches`: null
- **Providence, Warwick, Cranston, Pawtucket, Woonsocket, Newport, East Providence** — `ordinanceNote`: null
- **Westerly** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null

### Connecticut
- `avgAnnualSnowfallInches`: null
- **Hartford, New Haven, Stamford, Norwalk, Danbury** — `ordinanceNote`: null
- **Bridgeport** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null
- **Waterbury** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null
- **New Britain** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null

### New Jersey
- `avgAnnualSnowfallInches`: null
- **Newark, Jersey City, Paterson, Trenton, Elizabeth, Edison** — `ordinanceNote`: null
- **Morristown** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Hackettstown** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null; only 2 neighborhoods found

### Pennsylvania
- `avgAnnualSnowfallInches`: null
- **Allentown, Erie, Scranton, State College** — `ordinanceNote`: null
- **Reading** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Bethlehem** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null

### West Virginia
- `avgAnnualSnowfallInches`: null
- `stateSpecificNotes`: null (no single statewide DOT policy summary found as citable as other states')
- **Charleston, Huntington, Parkersburg, Wheeling, Beckley** — `ordinanceNote`: null
- **Martinsburg** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 2 neighborhoods found
- **Elkins** — `ordinanceNote`: null; only 2 neighborhoods found

### Maryland
- `avgAnnualSnowfallInches`: null; `stateSpecificNotes`: null
- **Baltimore** — `avgSnowDaysPerYear`: null
- **Hagerstown** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Cumberland, Salisbury** — `ordinanceNote`: null
- **Annapolis** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`: null
- **Gaithersburg** — `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null

### Delaware
- `avgAnnualSnowfallInches`: null; `stateSpecificNotes`: null
- **Dover** — `ordinanceNote`: null
- **Newark** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Middletown, Milford** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 2 neighborhoods found
- **Smyrna** — `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null; only 2 neighborhoods found
- **Seaford** — `ordinanceNote`: null; only 1 neighborhood found
- **Georgetown** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null; only 1 neighborhood found

### Virginia
- `avgAnnualSnowfallInches`: null; `stateSpecificNotes`: null
- **Roanoke, Charlottesville, Blacksburg, Fredericksburg** — `ordinanceNote`: null
- **Winchester** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Harrisonburg** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null
- **Bristol** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 1 neighborhood found

### Ohio
- **Columbus, Cleveland, Toledo, Dayton, Youngstown, Canton** — `ordinanceNote`: null

### Indiana
- `avgAnnualSnowfallInches`: null
- **Fort Wayne, South Bend, Evansville, Gary, Bloomington** — `ordinanceNote`: null
- **Elkhart, Michigan City** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Illinois
- **Chicago, Naperville** — `avgSnowDaysPerYear`: null (Naperville also `ordinanceNote`: null)
- **Aurora, Rockford, Joliet, Peoria, Springfield, Champaign** — `ordinanceNote`: null

### Wisconsin
- **Green Bay, Kenosha, Racine, Appleton, Wausau, Eau Claire** — `ordinanceNote`: null

### Iowa
- **Cedar Rapids, Davenport, Sioux City, Waterloo, Dubuque, Ames** — `ordinanceNote`: null

### Missouri
- `avgAnnualSnowfallInches`: null
- **St. Louis, Springfield, Columbia, Independence, Jefferson City, Joplin** — `ordinanceNote`: null
- **St. Joseph** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null

### Nebraska
- `avgAnnualSnowfallInches`: null
- **Bellevue** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Grand Island** — `ordinanceNote`: null
- **Kearney, Fremont** — `ordinanceNote`: null; only 2 neighborhoods found
- **Norfolk, North Platte** — `ordinanceNote`: null; only 1 neighborhood found

### Kansas
- `avgAnnualSnowfallInches`: null
- **Kansas City (KS), Olathe, Lawrence, Manhattan** — `ordinanceNote`: null
- **Overland Park, Salina** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### North Dakota
- `avgAnnualSnowfallInches`: null
- **Bismarck** — only 2 neighborhoods found
- **Minot, West Fargo** — `ordinanceNote`: null
- **Williston, Dickinson, Jamestown** — `ordinanceNote`: null; only 1 neighborhood found

### South Dakota
- `avgAnnualSnowfallInches`: null
- **Aberdeen, Watertown, Mitchell, Pierre** — `ordinanceNote`: null; only 1 neighborhood found
- **Brookings, Yankton** — `ordinanceNote`: null; only 2 neighborhoods found

### Nevada (Tier 2)
- `avgAnnualSnowfallInches`: null
- **Reno, Carson City, Sparks** — `ordinanceNote`: null
- **Elko** — `ordinanceNote`: null; only 1 neighborhood found

### New Mexico (Tier 2)
- `avgAnnualSnowfallInches`: null
- **Taos, Los Alamos, Ruidoso** — `ordinanceNote`: null

### North Carolina (Tier 2 — western mountain counties only)
- `avgAnnualSnowfallInches`: null
- **Boone** — only 2 neighborhoods found
- **Blowing Rock** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null; only 1 neighborhood found
- **Waynesville** — `ordinanceNote`: null

### Kentucky (Tier 2 — eastern Appalachian counties only)
- `avgAnnualSnowfallInches`: null
- **Lexington, Bowling Green** — `ordinanceNote`: null
- **Pikeville** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, `ordinanceNote`: null; only 1 neighborhood found

### Tennessee (Tier 2 — eastern mountain counties only)
- `avgAnnualSnowfallInches`: null
- **Gatlinburg, Chattanooga** — `ordinanceNote`: null
- **Johnson City** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Idaho
- `avgAnnualSnowfallInches`: null
- **Boise, Coeur d'Alene, Idaho Falls, Pocatello, Twin Falls, Moscow, McCall** — `avgSnowDaysPerYear`: null
- **Ketchum** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Washington
- `avgAnnualSnowfallInches`: null
- **Spokane, Yakima, Wenatchee, Ellensburg** — `avgSnowDaysPerYear`: null
- **Bellingham, Leavenworth, Chelan** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Colville** — `avgSnowDaysPerYear`, `ordinanceNote`: null; only 2 neighborhoods found

### Oregon
- `avgAnnualSnowfallInches`: null
- **Klamath Falls, Hood River** — `avgSnowDaysPerYear`: null
- **Bend, Medford** — `avgSnowDaysPerYear`, `coldestMonthAvgLowF`: null (Medford's coldest-month figure was found but looked implausibly cold for a Mediterranean-climate valley and was distrusted rather than used)
- **La Grande, Pendleton, Sisters** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Baker City** — `avgSnowDaysPerYear`, `coldestMonthAvgLowF`, `ordinanceNote`: null; only 2 neighborhoods found

### Alaska
- `avgAnnualSnowfallInches`: null
- **Anchorage, Fairbanks, Juneau** — `avgSnowDaysPerYear`: null
- **Wasilla, Sitka, Kodiak, Kenai, Palmer** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Montana
- **Great Falls, Bozeman, Helena, Kalispell, Butte** — `avgSnowDaysPerYear`: null
- **Havre** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Wyoming
- `avgAnnualSnowfallInches`: null
- **Casper, Laramie, Jackson, Sheridan, Rock Springs** — `avgSnowDaysPerYear`: null
- **Cody, Gillette** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Colorado
- `avgAnnualSnowfallInches`: null
- **Colorado Springs, Fort Collins, Boulder, Steamboat Springs, Vail** — `avgSnowDaysPerYear`: null
- **Aspen, Durango** — `avgSnowDaysPerYear`, `ordinanceNote`: null

### Utah
- `avgAnnualSnowfallInches`: null
- **Park City, Provo, Ogden, Logan** — `avgSnowDaysPerYear`: null
- **St. George, Cedar City** — `avgSnowDaysPerYear`, `ordinanceNote`: null
- **Sandy** — `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`: null (sources ranged 13–124in with no dedicated long-term station; left null rather than picking a number)

---

# Depth expansion (bringing all 38 states toward the brief's 20-25-city target)

Second expansion pass, on top of the "full 38-state expansion" above: added roughly 10-12 more cities to each of the 33 Tier 1 states (bringing MI/NY/MN and all others from ~8-10 cities up toward 20+), a modest few more to each of the 5 Tier 2 states within their already-defined snowy sub-regions only, and two new "optional" states the brief explicitly carved out as partial-coverage exceptions: **California** (Sierra Nevada/Tahoe corridor only: South Lake Tahoe, Truckee, Mammoth Lakes, Portola, Big Bear Lake, Loyalton) and **Arizona** (Flagstaff/high-country only: Flagstaff, Williams, Show Low, Pinetop-Lakeside, Eagar). Final dataset: **40 states, 704 cities**.

Same research methodology as the original expansion — NOAA/NWS climate normals, US Census figures, state DOT winter-maintenance pages, and official municipal codes, with unconfirmed fields left `null`. Given the volume (~430 new cities in this round), the notes below are a consolidated summary rather than an exhaustive per-city listing — see each `localSnowNotes` field for city-specific sourcing caveats, which several research agents wrote inline (e.g. "this figure is a regional-station proxy," "sources disagreed by X%," etc.).

## Cross-cutting patterns worth knowing before further editing this data

- **`avgSnowDaysPerYear` is null for the large majority of new cities.** A "days with measurable snowfall" statistic, distinct from total snowfall inches, was often not published or not independently verifiable per-city in the research time available. Where populated, it's usually a directly-sourced NOAA figure; a few agents flagged that they used a same-region interpolation (documented inline in `localSnowNotes` where it happened) rather than a per-city primary source — treat those as softer than the rest.
- **Suburbs of a larger metro frequently inherit that metro's official station data** (e.g. Detroit-area suburbs sharing DTW's normal, St. Louis suburbs sharing Lambert's, Salt Lake Valley suburbs sharing SLC's) when the suburb has no distinct long-term NOAA station of its own — this is called out inline in each such city's `localSnowNotes` rather than presented as an independently-measured figure.
- **`ordinanceNote` is null wherever an agent could not find an actual citable code section/chapter** via the municipality's own site or a code-hosting platform (Municode, American Legal, eCode360, amlegal) — never guessed. This is true for a large fraction of the smaller towns added in this round.
- **Honest substitutions** (same pattern as the original Sisters/Corvallis swap): Bishop, CA → **Portola, CA** (Bishop's rain-shadow position has no confirmable snowfall normal); Nevada City, CA → **Loyalton, CA** (Nevada City is a Gold Country rain climate, not real snow); Alpine, AZ → **Eagar, AZ** (Alpine is an unincorporated CDP, not a real incorporated town). Each is explained inline in the substituted city's `localSnowNotes`.
- **A data-quality flag surfaced by one research agent, not yet independently verified**: the original Phase-2-era South Dakota entries (Sioux Falls and Rapid City) both show `avgSnowDaysPerYear: 32.8` — an exact match that could be a genuine coincidence between two similar prairie/foothill climates, or could indicate a copy-paste error from the original research pass. Worth a direct NOAA station recheck before treating either figure as authoritative.
- **Hazen, ND** has no confirmable NOAA station of its own; `avgAnnualSnowfallInches`, `avgSnowDaysPerYear`, and `coldestMonthAvgLowF` are all `null` rather than borrowed from nearby Beulah (which the researching agent verified has a very different, much higher total).
- **Valley City, ND** — `avgAnnualSnowfallInches` and `avgSnowDaysPerYear` are `null`; no reliable city-specific figure was found.
- **Government Camp, OR** (~252in/yr, pop. ~179) and **Alta, UT** (~458in/yr, pop. ~228) are both real, distinctive, heavily-sourced snow markets despite tiny populations — kept deliberately despite being thin by population alone, since the brief's "no thin pages" concern is about content depth, not population size, and both have substantial real municipal/DOT winter-operations context to draw on.
- **Valdez, AK** (~279in/yr) is NOAA's snowiest incorporated town in the US — a strong, well-documented distinctiveness anchor for that page.
