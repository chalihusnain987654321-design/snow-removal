import type { Service } from "./types";

// All 14 services from the project brief (Section 5). Icons map 1:1 to
// the ServiceIcon set built in Phase 1.

export const services: Service[] = [
  {
    slug: "residential-snow-plowing",
    name: "Residential Snow Plowing",
    shortDescription:
      "Driveway plowing so you can get out the door on the first push of the morning.",
    longDescription:
      "Residential snow plowing keeps your driveway clear through the entire storm cycle, not just after it stops snowing. We plow at trigger depths you set in advance, typically 2 inches, so a driveway never sits buried while a storm is still active. Every route is planned the night before a forecasted event, and trucks are dispatched in the order that gets working driveways cleared first, then the rest of the route on a predictable pass schedule.\n\nEquipment ranges from straight-blade and V-blade trucks for standard driveways to compact tractors and skid steers for tight urban lots, shared driveways, or properties where a full-size truck can't maneuver without damaging landscaping. Every driveway is walked or scouted once per season so the crew knows where the edges, drainage grates, and hardscaping are before the first snow falls. That's what keeps mailboxes, sprinkler heads, and pavers intact.\n\nYou choose between a per-push agreement, billed each time the crew plows, or a flat seasonal contract that covers the whole winter regardless of how many storms hit. Seasonal contracts trade some flexibility for predictable budgeting; per-push works better for light-snow years or properties that only need occasional service. Either way, the trigger depth, service order, and any special instructions (a car left in the driveway, a specific clear width, a spot to pile the snow) are set once and followed every time: no re-explaining your property after every storm.",
    benefits: [
      "Trigger-depth dispatch: plowed while the storm is active, not just after",
      "Same crew and truck learn your property's layout over the season",
      "Per-push or flat-rate seasonal contracts",
      "Damage-aware plowing around landscaping, mailboxes, and hardscaping",
    ],
    process: [
      { step: "Pre-season walkthrough", detail: "We scout the driveway before the first snowfall to mark obstacles, edges, and your preferred pile location." },
      { step: "Storm dispatch", detail: "Routes are planned from the forecast and trucks go out once your trigger depth is reached." },
      { step: "Pass and clear", detail: "The driveway is plowed to the full width, with a final pass after the storm tapers off to catch drift." },
      { step: "Follow-up check", detail: "For multi-day storms, we re-check routes and re-dispatch as accumulation continues." },
    ],
    faqs: [
      { question: "What trigger depth do you plow at?", answer: "Most residential customers set a 2-inch trigger, meaning we plow once 2 inches has accumulated and again as needed through the storm. You can set a different trigger when you sign up." },
      { question: "Do I need to move my car?", answer: "Yes, if your car is in the driveway we can't clear underneath or around it fully. Let dispatch know if a car will be present so the route can plan around it." },
      { question: "What's the difference between per-push and seasonal service?", answer: "Per-push bills you for each visit, which suits light-snow winters. A seasonal contract is a flat rate for the whole season regardless of storm count, which suits budgeting predictability in a heavy-snow winter." },
      { question: "Will plowing damage my driveway or lawn edges?", answer: "We scout every driveway before the season to mark edges, drainage, and hardscaping, and blades are set to avoid gouging asphalt or concrete. Let us know about any soft or uneven spots in advance." },
      { question: "Can I change my trigger depth mid-season?", answer: "Yes, contact dispatch and the change applies starting with the next storm." },
      { question: "What if I'm not home when the crew arrives?", answer: "No problem. Plowing doesn't require anyone home, just a driveway clear of vehicles and obstacles per the instructions on file." },
    ],
    icon: "plow",
    audience: "residential",
  },
  {
    slug: "commercial-snow-plowing",
    name: "Commercial Snow Plowing",
    shortDescription:
      "Parking lot and drive-lane plowing that keeps a property open through a storm, not just cleaned up after one.",
    longDescription:
      "Commercial plowing has different failure modes than residential work: a blocked drive lane stops deliveries, an unplowed lot turns away customers, and a slick entrance is a liability claim waiting to happen. Lots are plowed on a trigger depth tied to your operating hours, not a fixed schedule, and larger properties are broken into zones so drive lanes, fire lanes, and ADA-accessible spots get priority passes before the rest of the lot.\n\nEquipment is sized to the property: full-size trucks with box plows or pushers for large lots, skid steers for tight urban sites and loading docks, and sidewalk machines for the pedestrian paths a truck can't reach. Snow gets pushed to designated storage areas planned in advance so it doesn't block sightlines, drainage, or additional parking as the season goes on. Piling snow in the wrong spot early in the season is a common cause of flooding and blocked spaces by February.\n\nProperties with strict opening hours (retail, medical, offices) typically run on a seasonal contract with a guaranteed response window so lot condition doesn't depend on storm timing. Multi-property owners and management companies get a single point of contact and consistent service records across every site, which matters when you need to show due diligence after a slip-and-fall claim.",
    benefits: [
      "Zone-based clearing: drive lanes and entrances first, full lot second",
      "Snow storage planned in advance to avoid blocked drainage or parking later in the season",
      "Sized equipment for full lots, tight sites, and loading docks",
      "Service records kept per property: useful for liability documentation",
    ],
    process: [
      { step: "Site assessment", detail: "We map drive lanes, fire lanes, ADA spots, and snow storage areas before the season starts." },
      { step: "Trigger-depth dispatch", detail: "Crews are routed once the trigger depth tied to your operating hours is reached." },
      { step: "Zone clearing", detail: "Priority zones are cleared first, then the full lot, then sidewalks and pedestrian paths." },
      { step: "Ice follow-up", detail: "Salting or de-icing follows plowing where surfaces refreeze, especially entrances and ramps." },
    ],
    faqs: [
      { question: "How do you prioritize a large lot during a storm?", answer: "We zone the property before the season starts: drive lanes, fire lanes, and entrances are cleared first, then the rest of the lot, then pedestrian paths." },
      { question: "Where does the plowed snow go?", answer: "We plan snow storage locations with you in advance so piles don't block drainage, sightlines, or additional parking later in the season." },
      { question: "Can you guarantee our lot is clear before we open?", answer: "Seasonal contracts can include a guaranteed response window tied to your operating hours. Ask about response-time terms when you request a quote." },
      { question: "Do you provide service records for insurance or liability purposes?", answer: "Yes, we keep dated service records per property, which many commercial clients use to document due diligence." },
      { question: "Do you handle multiple properties for the same company?", answer: "Yes, multi-property owners and management companies get a single point of contact and consistent service records across every site." },
      { question: "What happens if a storm exceeds the normal forecast?", answer: "Routes and crew rotation adjust for multi-day or heavier-than-forecast storms so priority zones stay covered throughout." },
    ],
    icon: "plow",
    audience: "commercial",
  },
  {
    slug: "sidewalk-walkway-clearing",
    name: "Sidewalk & Walkway Clearing",
    shortDescription:
      "Shoveling and snow-blowing for sidewalks, entries, and walkways, cleared to bare pavement, not just pushed aside.",
    longDescription:
      "Sidewalks and walkways get missed by plow trucks and become the most common source of slip-and-fall injuries during winter. This service covers the paths a truck can't clear: front walks, building entrances, breezeways, and pedestrian routes across a property. Crews clear to bare pavement where conditions allow, not just a rough path through the snow, and follow with salt or ice melt where refreeze is likely.\n\nFor residential customers this usually means the walk from the driveway to the front door and any path to a side or back entrance. For commercial and multi-family properties it covers the full pedestrian network (building entrances, breezeways, courtyards, and connecting paths between buildings), cleared on the same trigger-depth schedule as the parking lot or driveway so pedestrians aren't left navigating snow after vehicles already have a clear lot.\n\nEquipment is matched to the path: walk-behind snow blowers for wider sidewalks, hand shoveling for tight spots, stairs, and areas near landscaping where a blower risks throwing debris. Every path is scouted in advance so crews know where uneven pavement, steps, or drainage grates are before the first snow: the same damage-aware approach used for driveways and lots.",
    benefits: [
      "Cleared to bare pavement where conditions allow, with salt follow-up",
      "Covers entrances, breezeways, and connecting paths a plow truck can't reach",
      "Matched to residential walks or full commercial pedestrian networks",
      "Scouted in advance for uneven pavement, steps, and drainage grates",
    ],
    process: [
      { step: "Path mapping", detail: "We walk the property to identify every path that needs clearing, including entrances and connecting walkways." },
      { step: "Trigger-depth dispatch", detail: "Crews clear sidewalks on the same schedule as driveway or lot plowing." },
      { step: "Clear and treat", detail: "Snow is cleared to bare pavement where possible, with salt or ice melt applied where refreeze is likely." },
      { step: "Spot checks", detail: "High-traffic entrances get a follow-up check during multi-day storms." },
    ],
    faqs: [
      { question: "Do you clear all the way to bare pavement?", answer: "Yes, where conditions allow: the goal is a walkable surface, not just a path pushed through the snow, followed by salt where refreeze is likely." },
      { question: "Can this be added to an existing plowing contract?", answer: "Yes, sidewalk clearing is commonly bundled with driveway or lot plowing so the whole property is cleared on the same schedule." },
      { question: "Do you clear stairs and building entrances?", answer: "Yes, stairs and entrances are typically hand-shoveled for control and to avoid blower debris near landscaping or glass entries." },
      { question: "How does this help with slip-and-fall liability?", answer: "Documented, scheduled sidewalk clearing is one of the clearest ways a commercial property can show due diligence if a winter slip-and-fall claim comes up." },
      { question: "Is this available without a plowing contract?", answer: "Yes, standalone sidewalk service is available, though it's commonly bundled with driveway or lot plowing." },
      { question: "How do you handle narrow or oddly shaped walkways?", answer: "Paths are scouted in advance and matched to the right equipment (blower, shovel, or a combination) based on width and obstacles." },
    ],
    icon: "shovel",
    audience: "both",
  },
  {
    slug: "snow-blowing-services",
    name: "Snow Blowing Services",
    shortDescription:
      "Walk-behind snow blowing for paths, tight spaces, and areas a plow truck or shovel crew can't efficiently clear.",
    longDescription:
      "Snow blowing fills the gap between plow trucks and hand shoveling, faster than a shovel on wider paths, and able to reach spots a truck can't: narrow side yards, gated walkways, tight condo courtyards, and areas close to fencing or landscaping where a plow blade risks damage. It's commonly used for longer residential walkways, multi-unit property paths, and commercial sites with pedestrian areas that don't fit truck access.\n\nCommercial-grade walk-behind blowers throw snow clear of the path rather than compacting it into the edges the way repeated shoveling can, which matters on narrow walkways where there's nowhere for pushed snow to go after a few storms. Crews plan discharge direction in advance so blown snow doesn't end up back on a cleared driveway, blocking a neighboring path, or piling against a foundation or HVAC unit.\n\nThis service is typically paired with plowing or shoveling rather than used alone: trucks handle the driveway or lot, blowers handle the connecting paths, and shovels handle stairs and tight corners. Bundled this way, a property gets full coverage without paying truck rates for areas a truck can't efficiently access.",
    benefits: [
      "Reaches tight side yards, courtyards, and gated paths trucks can't access",
      "Throws snow clear instead of compacting it at path edges",
      "Discharge direction planned to avoid re-blocking cleared areas",
      "Commonly bundled with plowing or shoveling for full property coverage",
    ],
    process: [
      { step: "Path assessment", detail: "We identify which paths are better served by blower than truck or shovel." },
      { step: "Discharge planning", detail: "Blow direction is set in advance to avoid piling snow against foundations, HVAC units, or neighboring cleared areas." },
      { step: "Storm dispatch", detail: "Blower crews run on the same trigger-depth schedule as the rest of the property." },
      { step: "Edge cleanup", detail: "Path edges are cleaned up so repeated storms don't build compacted snow walls over the season." },
    ],
    faqs: [
      { question: "How is this different from sidewalk shoveling?", answer: "Blowing throws snow clear of the path rather than piling it at the edges, which works better on longer or wider walkways that get shoveled repeatedly over a season." },
      { question: "Can blowing damage landscaping or property?", answer: "Discharge direction is planned per property to avoid throwing snow into landscaping, against siding, or onto a neighboring cleared path." },
      { question: "Is this available as a standalone service?", answer: "It's usually bundled with plowing or shoveling for full property coverage, but standalone service is available for properties that just need paths cleared." },
      { question: "Does blowing work on icy or compacted snow?", answer: "Blowers work best on fresh or moderately packed snow; heavily compacted or icy surfaces may need shoveling or de-icing first." },
      { question: "Can this be scheduled for every storm automatically?", answer: "Yes, it runs on the same trigger-depth dispatch as the rest of your property once set up." },
    ],
    icon: "blower",
    audience: "both",
  },
  {
    slug: "ice-management-salting-sanding-deicing",
    name: "Ice Management: Salting, Sanding & De-Icing",
    shortDescription:
      "Rock salt, sand, and de-icing agents applied after plowing to keep cleared surfaces from refreezing.",
    longDescription:
      "Plowing removes snow; ice management is what keeps the cleared surface usable afterward. Melted snow and compacted residue refreeze overnight or as temperatures swing through freezing, turning a plowed lot or driveway into a hazard hours after it looked clear. Salting, sanding, and de-icing agents are applied after plowing (and sometimes before, if conditions call for it) to break that refreeze cycle.\n\nMaterial choice matters more than most people assume. Straight rock salt (sodium chloride) works well down to about 15–20°F but loses effectiveness in deeper cold, where calcium chloride or magnesium chloride blends perform better. Sand adds traction without melting anything, useful on surfaces where chemical de-icers aren't appropriate or when temperatures are too low for salt to work at all. We match the material and application rate to the surface, the temperature, and how the property is used: a hospital entrance and a warehouse loading dock don't need the same treatment.\n\nApplication is targeted, not blanket-spread: entrances, ramps, stairs, crosswalks, and other high-traffic or high-liability spots get priority, since that's where refreeze causes the most falls. Over-application wastes material and can damage concrete, landscaping, and waterways, so rates are calibrated rather than maximized.",
    benefits: [
      "Applied after plowing to prevent refreeze on cleared surfaces",
      "Material matched to temperature: rock salt, calcium chloride, or magnesium chloride blends",
      "Targeted application on entrances, ramps, stairs, and crosswalks",
      "Calibrated rates to avoid over-application and surface or landscape damage",
    ],
    process: [
      { step: "Surface and temperature check", detail: "We assess surface type and forecast temperature to select the right material." },
      { step: "Post-plow application", detail: "De-icing material is applied after plowing, targeted at entrances, ramps, and high-traffic areas." },
      { step: "Refreeze monitoring", detail: "Overnight and swing-temperature refreeze windows are watched and re-treated as needed." },
      { step: "Follow-up passes", detail: "High-liability areas get repeat checks during extended cold snaps." },
    ],
    faqs: [
      { question: "What's the difference between salt, sand, and calcium chloride?", answer: "Rock salt melts ice down to about 15–20°F, calcium and magnesium chloride blends work in deeper cold, and sand adds traction without melting; we match material to the temperature and surface." },
      { question: "Will salt damage my concrete or landscaping?", answer: "Over-application is what causes damage, which is why application rates are calibrated to the surface and conditions rather than blanket-spread." },
      { question: "Do you treat before or after a storm?", answer: "Both, depending on conditions: post-storm application prevents refreeze on cleared surfaces, and pre-treatment (anti-icing) is used ahead of some storms to prevent bonding in the first place." },
      { question: "Can I request ice management without plowing?", answer: "Yes, standalone de-icing visits are available, though most customers bundle it with plowing." },
      { question: "Is rock salt safe for pets and landscaping?", answer: "Heavy use can irritate paws and stress landscaping. Ask about pet- and plant-safer alternatives if that's a concern." },
    ],
    icon: "salt",
    audience: "both",
  },
  {
    slug: "anti-icing-brine-pretreatment",
    name: "Anti-Icing & Brine Pre-Treatment",
    shortDescription:
      "Liquid brine applied before a storm to stop snow and ice from bonding to the pavement in the first place.",
    longDescription:
      "Anti-icing works differently than salting after a storm: liquid brine, a saltwater solution, is sprayed on pavement ahead of a forecasted event so falling snow can't bond tightly to the surface. When snow doesn't bond, plows clear it faster and more completely, and any residual layer is far easier to remove than snow that's compacted into ice by traffic before a truck arrives.\n\nBrine is applied 12 to 48 hours before a storm depending on the forecast, temperature, and precipitation type: timing it right is most of the job, since brine applied too early can be diluted or washed away by rain ahead of a system, and applied too late doesn't have time to work. It's most effective ahead of light-to-moderate snow and for preventing the thin ice layer that forms on lots and roads when a storm starts as freezing rain or briefly crosses through rain-to-snow.\n\nAnti-icing is typically used on commercial properties and municipal contracts where preventing bonded ice from the first hour of a storm matters more than reacting after: entrances, drive lanes, and high-traffic pedestrian routes see the most benefit. It's usually paired with reactive plowing and salting rather than replacing them; brine prevents the bond, plowing still removes the accumulated snow.",
    benefits: [
      "Applied before a storm to stop snow and ice from bonding to pavement",
      "Makes plowing faster and more complete once the storm arrives",
      "Reduces the thin-ice layer that forms from freezing rain or rain-to-snow transitions",
      "Pairs with reactive plowing and salting for full storm coverage",
    ],
    process: [
      { step: "Forecast review", detail: "We time brine application to the storm's expected arrival, usually 12–48 hours ahead." },
      { step: "Brine application", detail: "Liquid brine is sprayed on drive lanes, entrances, and high-traffic pedestrian routes." },
      { step: "Storm response", detail: "Plowing and salting proceed as normal once the storm arrives, now working against a surface that hasn't bonded." },
      { step: "Effectiveness check", detail: "Coverage is reviewed after the storm to refine timing for the next event." },
    ],
    faqs: [
      { question: "How is anti-icing different from salting after a storm?", answer: "Anti-icing is applied before the storm to stop snow from bonding to pavement in the first place; salting after a storm treats snow and ice that's already there." },
      { question: "Does brine work in all conditions?", answer: "It's most effective ahead of light-to-moderate snow and freezing rain. Heavy, wind-driven storms still need full plowing regardless of pre-treatment." },
      { question: "Is anti-icing available for residential driveways?", answer: "It's primarily used for commercial and municipal properties where preventing bonded ice on entrances and drive lanes has the most impact, but ask if you're interested for a residential property." },
      { question: "How far in advance do you apply brine?", answer: "Typically 12 to 48 hours before the storm, timed to the forecast so it isn't washed away or diluted before snow arrives." },
      { question: "Can anti-icing replace plowing entirely?", answer: "No, it prevents bonding so plowing is faster and more complete, but accumulated snow still needs to be plowed." },
    ],
    icon: "brine",
    audience: "commercial",
  },
  {
    slug: "roof-snow-removal",
    name: "Roof Snow Removal",
    shortDescription:
      "Snow load removal from roofs before accumulation reaches a level that risks structural stress or collapse.",
    longDescription:
      "Roof snow load becomes a real structural concern after repeated storms pile snow faster than it melts or settles, especially on flat and low-slope commercial roofs, older structures, or roofs with existing drainage issues. Roof snow removal clears accumulated weight using techniques and equipment suited to the roof type, working from the roof surface, from the ground with specialized roof rakes for accessible residential roofs, or with aerial equipment for larger commercial structures.\n\nSnow density varies enormously: fresh powder is much lighter per inch than wet, settled, or rain-soaked snow, and a roof can be at real risk with less total depth than you'd expect if the snow is heavy and saturated. We assess load based on snow type and depth, not depth alone, and prioritize flat roofs, roofs with known drainage problems, and areas prone to drift buildup near parapets or HVAC units, where load concentrates well beyond the average across the roof.\n\nThis is a specialized, safety-focused service: crews use proper harnessing, avoid damaging roofing membranes or shingles with metal tools, and clear drains and scuppers so meltwater has somewhere to go rather than pooling and refreezing. It's typically requested reactively after a heavy multi-storm stretch, though commercial properties with known load concerns sometimes set up standing monitoring through the season.",
    benefits: [
      "Load assessed by snow type and density, not depth alone",
      "Priority given to flat roofs, drainage problem areas, and drift-prone spots",
      "Equipment and technique matched to roof type to avoid membrane or shingle damage",
      "Drains and scuppers cleared so meltwater doesn't pool and refreeze",
    ],
    process: [
      { step: "Load assessment", detail: "We evaluate snow depth and density against the roof type to judge real structural risk." },
      { step: "Access planning", detail: "Ground-based raking, roof-surface work, or aerial equipment is selected based on the structure." },
      { step: "Careful removal", detail: "Snow is cleared without damaging roofing membranes, shingles, or flashing." },
      { step: "Drain clearing", detail: "Drains and scuppers are cleared so meltwater can escape instead of pooling and refreezing." },
    ],
    faqs: [
      { question: "How do I know if my roof needs snow removal?", answer: "Risk depends on snow density as much as depth: heavy, wet, or rain-soaked snow is far more dangerous per inch than fresh powder. Flat and low-slope roofs, and roofs with known drainage issues, are highest priority." },
      { question: "Will removal damage my roof?", answer: "Technique and tools are matched to the roof type specifically to avoid damaging membranes, shingles, or flashing; this isn't the same as shoveling a driveway." },
      { question: "Do you offer this for residential roofs?", answer: "Yes, for accessible residential roofs, typically using ground-based roof rakes rather than roof-surface work." },
      { question: "Do you offer ongoing monitoring through the season?", answer: "Commercial properties with known load concerns can set up standing monitoring rather than waiting for a reactive request." },
      { question: "Is roof snow removal covered by insurance?", answer: "Coverage varies by policy: check with your insurer, and ask us for service documentation if needed for a claim." },
    ],
    icon: "roof",
    audience: "both",
  },
  {
    slug: "ice-dam-removal-prevention",
    name: "Ice Dam Removal & Prevention",
    shortDescription:
      "Safe removal of roof-edge ice dams, plus the ventilation and insulation fixes that stop them from forming again.",
    longDescription:
      "An ice dam forms when heat escaping through a roof melts snow higher up, and the meltwater refreezes at the colder roof edge or over an unheated eave, building a ridge of ice that backs water up under shingles. Left alone, that backed-up water finds its way into the roof deck, insulation, and eventually interior ceilings and walls; ice dams are one of the more expensive winter damage sources precisely because the damage happens where you can't see it until it's already inside.\n\nRemoval uses low-pressure steam or careful mechanical methods to melt channels through the dam without damaging shingles the way chipping or a pressure washer would; this matters because rough removal methods are a common cause of roof damage that ends up costing more than the ice dam itself. We clear channels to let trapped water drain, focused on relieving the dam rather than stripping the entire roof edge.\n\nRemoval addresses the immediate problem; prevention addresses the cause. Ice dams are fundamentally a heat-loss and ventilation issue, not just a weather issue: a well-insulated, well-ventilated attic keeps the whole roof close to outdoor temperature, so there's no warm patch to create meltwater in the first place. We can flag likely insulation or ventilation gaps during a removal visit and point you toward the fix, since a roof that keeps forming ice dams every winter usually has a specific, fixable cause.",
    benefits: [
      "Low-pressure steam or careful mechanical removal: no shingle damage from chipping",
      "Channels cleared to let trapped water drain rather than stripping the whole roof edge",
      "Root-cause insulation and ventilation issues flagged during service",
      "Prevents the interior water damage that untreated ice dams cause",
    ],
    process: [
      { step: "Damage assessment", detail: "We check for active water intrusion and existing damage before starting removal." },
      { step: "Careful removal", detail: "Steam or gentle mechanical methods melt channels through the dam without damaging shingles." },
      { step: "Drainage check", detail: "Channels are confirmed clear so trapped meltwater can drain properly." },
      { step: "Prevention notes", detail: "Likely insulation or ventilation gaps are flagged so the underlying cause can be addressed." },
    ],
    faqs: [
      { question: "Why do ice dams form?", answer: "Heat escaping through the roof melts snow higher up, and that meltwater refreezes at the colder roof edge, building an ice ridge that backs water up under shingles." },
      { question: "Is chipping ice off the roof a bad idea?", answer: "Yes, chipping or pressure-washing an ice dam commonly damages shingles and can make the underlying leak worse. Steam or careful mechanical channel-clearing is safer." },
      { question: "Will removal alone stop ice dams from coming back?", answer: "Removal fixes the immediate problem, but ice dams are usually a sign of an insulation or ventilation gap; we can flag likely causes so you can address why it's forming." },
      { question: "How do I know if I have an ice dam?", answer: "Look for icicles along the roof edge, ice ridges at the eaves, or water stains on interior ceilings near exterior walls." },
      { question: "Is ice dam removal urgent?", answer: "If water is actively entering the home, yes; otherwise it's still worth addressing promptly to limit damage." },
    ],
    icon: "icicle",
    audience: "both",
  },
  {
    slug: "snow-hauling-relocation",
    name: "Snow Hauling & Relocation",
    shortDescription:
      "Off-site snow removal for properties that run out of room to pile it after repeated storms.",
    longDescription:
      "Most properties can plow snow to the edges of a lot or driveway for the whole season, but tight urban sites, small commercial lots, and properties with limited storage space eventually run out of room. When piles get too tall to push further, start blocking parking spaces, drive lanes, or sightlines, or begin melting into areas they shouldn't, the remaining option is hauling snow off-site entirely.\n\nSnow is loaded with skid steers or loaders and hauled by dump truck to an approved snow storage or melting site, never dumped into storm drains, waterways, or unauthorized land, which is both environmentally harmful and often illegal depending on local rules. This is typically a commercial and municipal service, used for parking structures, dense urban retail sites, loading docks, and any property where pile space is the limiting factor rather than plowing capacity.\n\nHauling is usually planned proactively for properties that predictably run out of storage space every season, rather than requested only in a crisis: if your lot fills up by mid-January most years, scheduling hauling after the first few major storms keeps pile space open for the rest of the winter instead of losing usable parking or access for months.",
    benefits: [
      "Frees up parking, drive lanes, and sightlines blocked by snow piles",
      "Hauled to approved storage/melting sites: never dumped in drains or waterways",
      "Sized equipment for parking structures, urban lots, and loading docks",
      "Can be scheduled proactively for properties that predictably run out of pile space",
    ],
    process: [
      { step: "Site evaluation", detail: "We identify pile locations that are running out of room or starting to block access." },
      { step: "Loading", detail: "Skid steers or loaders load snow for transport." },
      { step: "Off-site hauling", detail: "Snow is hauled by dump truck to an approved storage or melting site." },
      { step: "Space recovery", detail: "Cleared pile areas are confirmed usable again for parking or additional plowed snow." },
    ],
    faqs: [
      { question: "When does a property need snow hauling instead of just plowing?", answer: "When pile space runs out: piles get too tall to push further, start blocking parking or drive lanes, or begin encroaching on usable space." },
      { question: "Where does the hauled snow go?", answer: "To an approved snow storage or melting site. Dumping in storm drains or waterways isn't done; it's both environmentally harmful and often against local regulations." },
      { question: "Is this a residential service?", answer: "It's primarily used for commercial and municipal properties with limited pile space, but ask if a residential situation has run out of room." },
      { question: "How much notice do you need to schedule a haul?", answer: "Often a day or two: properties that predictably run out of space each season can set up hauling proactively after the first major storms." },
      { question: "Does hauling replace regular plowing?", answer: "No, hauling removes existing piles so plowing can continue; it's a supplement, not a substitute." },
    ],
    icon: "truck",
    audience: "commercial",
  },
  {
    slug: "seasonal-snow-removal-contracts",
    name: "Seasonal Snow Removal Contracts",
    shortDescription:
      "A flat rate for the whole winter, covering every qualifying storm regardless of how many hit.",
    longDescription:
      "A seasonal contract sets one price for the entire winter, covering plowing (and typically ice management) for every storm that reaches your trigger depth, no matter how many storms that turns out to be. It trades some flexibility for budget certainty: a heavy-snow winter costs the same as a light one, which matters for commercial properties and property managers who need predictable line-item costs rather than a bill that swings with the weather.\n\nThe alternative is per-push billing, where you pay for each visit individually. Per-push tends to cost less in a light-snow year and more in a heavy one; a seasonal contract is the reverse. Which makes sense depends on your risk tolerance and how your property handles cost variability: a homeowner might prefer per-push for flexibility, while a commercial property with a fixed maintenance budget usually prefers the predictability of a seasonal rate.\n\nSeasonal contracts are priced using historical snowfall data for your area, property size, and service scope (plowing only, or plowing plus sidewalks and ice management), not a guess. We walk through what's included (trigger depth, response time expectations, what counts as a separate event during a multi-day storm) before you sign, so there's no ambiguity mid-season about what's covered.",
    benefits: [
      "One flat rate for the whole season, regardless of storm count",
      "Predictable budgeting for commercial and property management clients",
      "Priced from historical snowfall data for your area, not a guess",
      "Scope (plowing, sidewalks, ice management) defined clearly before you sign",
    ],
    process: [
      { step: "Scope definition", detail: "We define exactly what's covered (plowing, sidewalks, ice management) and the trigger depth." },
      { step: "Historical rate-setting", detail: "The seasonal rate is built from historical snowfall data for your specific area and property size." },
      { step: "Contract review", detail: "Response times and multi-day-storm terms are reviewed before you sign, so there's no ambiguity mid-season." },
      { step: "Season-long service", detail: "Every qualifying storm is serviced under the flat rate, all winter." },
    ],
    faqs: [
      { question: "What's the difference between seasonal and per-push billing?", answer: "Seasonal is a flat rate for the whole winter regardless of storm count: better for budget predictability. Per-push bills each visit individually: better for light-snow years or occasional need." },
      { question: "How is the seasonal rate calculated?", answer: "From historical snowfall data for your area, your property size, and the scope of service you choose (plowing only, or plowing plus sidewalks and ice management)." },
      { question: "What happens during an unusually heavy winter?", answer: "You're covered at the same flat rate regardless of how many storms hit: that's the core trade-off of a seasonal contract." },
      { question: "What counts as a separate storm event in a multi-day system?", answer: "This is defined in your contract terms, walked through with you before you sign so there's no ambiguity mid-season." },
      { question: "Do seasonal contracts include ice management?", answer: "It depends on the scope you choose (plowing only, or plowing plus sidewalks and ice management), defined clearly upfront." },
    ],
    icon: "contract",
    audience: "both",
  },
  {
    slug: "24-7-emergency-snow-removal",
    name: "24/7 Emergency Snow Removal",
    shortDescription:
      "Dispatch that runs around the clock during an active storm, not just during business hours.",
    longDescription:
      "Storms don't stay within business hours, and neither does dispatch. Crews and equipment are on standby through active snow events, day or night, so a property isn't waiting until morning for a plow that should have come at 2 AM, especially critical for properties that operate overnight or need to be clear before an early opening: hospitals, distribution centers, 24-hour retail, and residential customers who need a driveway clear before an early commute.\n\nEmergency response is built into the same trigger-depth dispatch model used for standard service: the difference is that overnight and off-hours storms get the same priority as daytime ones, rather than waiting for a morning route. For multi-day storms, crews rotate to keep response consistent rather than one crew working an unsustainable stretch and falling behind as the storm continues.\n\nThis level of service is standard for commercial and seasonal contract customers, and available for residential customers who need it: if an early flight, an overnight delivery, or a 24-hour operation depends on the property being clear regardless of when the storm hits, that's worth flagging when you set up service.",
    benefits: [
      "Crews and equipment on standby through active storms, day or night",
      "Overnight and off-hours storms get the same dispatch priority as daytime ones",
      "Crew rotation on multi-day storms to keep response consistent",
      "Built for hospitals, distribution centers, 24-hour retail, and early-commute residential needs",
    ],
    process: [
      { step: "Standby readiness", detail: "Crews and equipment are staged ahead of a forecasted storm, regardless of time of day." },
      { step: "Trigger-depth dispatch", detail: "Overnight and off-hours storms are dispatched on the same trigger-depth basis as daytime events." },
      { step: "Crew rotation", detail: "Multi-day storms are covered by rotating crews to maintain consistent response." },
      { step: "Status availability", detail: "Dispatch can be reached for a status check during an active event." },
    ],
    faqs: [
      { question: "Does this cost extra compared to standard plowing?", answer: "24/7 dispatch is typically standard for commercial and seasonal contract customers. Ask about terms if you specifically need guaranteed overnight response as a residential customer." },
      { question: "How do you handle multi-day storms?", answer: "Crews rotate through extended storms to keep response times consistent rather than one crew falling behind as the event continues." },
      { question: "Can I reach dispatch during an active storm?", answer: "Yes, dispatch is reachable for a status check while a storm is active." },
      { question: "Is overnight service available for residential customers?", answer: "Ask about terms if you specifically need guaranteed overnight response as a residential customer." },
      { question: "How do you avoid crew burnout during long storms?", answer: "Crews rotate through extended multi-day events to keep response times consistent rather than one crew working an unsustainable stretch." },
    ],
    icon: "phone",
    audience: "both",
  },
  {
    slug: "hoa-property-management-snow-services",
    name: "HOA & Property Management Snow Services",
    shortDescription:
      "Coordinated snow removal across shared driveways, common areas, and multiple units under one contract.",
    longDescription:
      "HOAs and property management companies deal with a different problem than a single homeowner: multiple buildings, shared driveways, common-area sidewalks, guest parking, and a board or ownership group that needs consistent, documented service across every unit, not a patchwork of individual arrangements. This service covers the whole property under a single contract: private roads and shared driveways, building entrances, common walkways, mailbox clusters, and guest parking areas, all cleared on a consistent schedule.\n\nCommunication runs through one point of contact for the association or management company rather than resident-by-resident coordination, with service records kept for board meetings, resident inquiries, and budget planning. Multi-building properties are zoned so buildings with higher foot traffic or earlier resident departure times get priority within the same storm response.\n\nContracts are typically seasonal, priced from the property's total plowable and walkable area, unit count, and service scope: plowing only, or plowing plus sidewalks and ice management for common areas. We can also work directly with a board or management company on a multi-year agreement so scope and terms don't need to be renegotiated every fall.",
    benefits: [
      "One contract covers shared driveways, common areas, and multiple buildings",
      "Single point of contact for the association or management company",
      "Zoned response for buildings with higher traffic or earlier departure times",
      "Service records kept for board meetings and resident inquiries",
    ],
    process: [
      { step: "Property mapping", detail: "We map every shared driveway, common walkway, and building entrance across the property." },
      { step: "Zone prioritization", detail: "Buildings with higher traffic or earlier resident departures are zoned for priority response." },
      { step: "Coordinated dispatch", detail: "The full property is cleared on a consistent schedule under one contract." },
      { step: "Reporting", detail: "Service records are provided for board meetings, budget planning, or resident inquiries." },
    ],
    faqs: [
      { question: "Do you coordinate with the HOA board or with individual residents?", answer: "Through one point of contact for the association or management company: that's what keeps service consistent across the whole property." },
      { question: "Can you handle multiple buildings on different schedules?", answer: "Yes, multi-building properties are zoned so higher-traffic buildings or earlier resident departure times get priority within the same storm response." },
      { question: "How is service scoped for an HOA contract?", answer: "From total plowable and walkable area, unit count, and service scope: typically a seasonal contract, sometimes as a multi-year agreement." },
      { question: "Do you offer multi-year agreements?", answer: "Yes, we can work with a board or management company on a multi-year agreement so scope and terms don't need renegotiating every fall." },
      { question: "How is guest parking handled?", answer: "Guest parking is included in the property-wide clearing schedule alongside shared driveways and common walkways." },
    ],
    icon: "hoa",
    audience: "commercial",
  },
  {
    slug: "retail-office-medical-snow-services",
    name: "Retail, Office & Medical Facility Snow Services",
    shortDescription:
      "Snow and ice management built around customer, patient, and employee access during business hours.",
    longDescription:
      "Retail, office, and medical properties share a common requirement most other commercial sites don't have to the same degree: the property needs to be safely accessible to the public, often on a tight schedule, and often to people for whom a slick entrance is a real safety risk, medical facilities especially, where patients may already have mobility limitations. Service is built around your operating hours, with entrances, parking, and accessible routes cleared and treated before doors open, not after.\n\nADA-accessible parking spots, ramps, and entrance paths get priority treatment alongside the main lot, since these are both a legal accessibility requirement and the areas where a fall carries the most liability. For medical facilities, ambulance bays and emergency entrances are treated as top priority, cleared and de-iced on a schedule that doesn't wait for the rest of the lot.\n\nRetail properties with extended or seasonal hours (holiday shopping periods, early-morning openings) can set service triggers around those specific windows rather than a generic business-hours schedule. Office and medical properties typically run on standard weekday hours with weekend coverage scaled to actual usage, avoiding the cost of full weekend service for a property that's largely empty on Saturdays.",
    benefits: [
      "Entrances and accessible routes cleared and treated before doors open",
      "ADA-accessible parking, ramps, and paths prioritized alongside the main lot",
      "Ambulance bays and emergency entrances treated as top priority for medical facilities",
      "Service triggers matched to actual operating hours, including extended or seasonal hours",
    ],
    process: [
      { step: "Access mapping", detail: "We identify entrances, ADA routes, and (for medical facilities) ambulance bays and emergency entrances." },
      { step: "Hours-based scheduling", detail: "Service is scheduled to be complete before doors open, matched to your actual operating hours." },
      { step: "Priority clearing", detail: "Accessible routes and emergency entrances are cleared and treated first." },
      { step: "Full property completion", detail: "The remaining lot and walkways are completed on the same visit." },
    ],
    faqs: [
      { question: "Can service be scheduled around specific opening times?", answer: "Yes, service triggers can be set to your actual operating hours, including extended retail hours or seasonal periods." },
      { question: "How do you handle ADA-accessible parking and ramps?", answer: "They're prioritized alongside the main lot as both a legal requirement and a high-liability area if left icy." },
      { question: "Do medical facilities get different priority than retail or office?", answer: "Ambulance bays and emergency entrances are treated as top priority for medical facilities, cleared and de-iced ahead of the rest of the property." },
      { question: "Can service scale up during holiday shopping periods?", answer: "Yes, retail properties with extended or seasonal hours can set service triggers around those specific windows." },
      { question: "Do you provide weekend coverage?", answer: "Weekend coverage is scaled to your actual usage rather than billed at full weekday rates for a largely empty property." },
    ],
    icon: "office",
    audience: "commercial",
  },
  {
    slug: "municipal-institutional-snow-services",
    name: "Municipal & Institutional Snow Services",
    shortDescription:
      "Snow removal for schools, churches, and municipal properties, scheduled around the specific hours that matter most.",
    longDescription:
      "Schools, churches, and municipal facilities each have a version of the same problem: a property that needs to be clear at a specific, non-negotiable time (before the first bus arrives, before a Sunday service, before a public building opens) rather than just \"sometime during the day.\" Service is scheduled around those fixed points, not a generic business-hours window, since a school lot cleared an hour after buses arrive doesn't solve the actual problem.\n\nFor schools, bus loops, drop-off lanes, and walkways to entrances are priority zones, cleared and treated before the first bus is scheduled. For churches and municipal buildings with predictable peak-attendance times (Sunday services, public meeting nights, election days), service can be timed to those specific windows rather than a flat daily schedule. Parking lots, accessible entrances, and walkways are all covered under the same visit.\n\nMunicipal contracts typically involve documented service records for public accountability, and may need to meet specific bid or procurement requirements: we can work within municipal contracting and reporting processes rather than a standard commercial agreement where that's required.",
    benefits: [
      "Scheduled around fixed points: bus arrival, service times, public opening hours",
      "Bus loops and drop-off lanes prioritized for schools",
      "Timed to predictable peak-attendance events for churches and municipal buildings",
      "Documented service records for public accountability where required",
    ],
    process: [
      { step: "Fixed-point identification", detail: "We identify the specific times the property must be clear: bus arrival, service times, opening hours." },
      { step: "Zone prioritization", detail: "Bus loops, drop-off lanes, or main entrances are prioritized based on the property type." },
      { step: "Timed dispatch", detail: "Service is scheduled to be complete before the identified fixed point, not on a generic schedule." },
      { step: "Documentation", detail: "Service records are kept where required for public accountability or procurement reporting." },
    ],
    faqs: [
      { question: "Can you schedule around bus arrival times for a school?", answer: "Yes, bus loops, drop-off lanes, and entrance walkways are prioritized and scheduled to be clear before the first bus arrives." },
      { question: "Do you work within municipal bid or procurement requirements?", answer: "Yes, we can work within standard municipal contracting and reporting processes where that's required." },
      { question: "How do you handle a church's Sunday-only peak schedule?", answer: "Service can be timed specifically to predictable peak-attendance windows rather than a flat daily schedule." },
      { question: "How do you handle snow days or school closures?", answer: "Service still runs on the trigger-depth schedule regardless of whether school is in session, so the property is ready when it reopens." },
      { question: "Are you available for one-time event-related clearing?", answer: "Yes, service can be timed to a specific one-time event, like an election day or public meeting, in addition to standing contracts." },
    ],
    icon: "school",
    audience: "commercial",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
