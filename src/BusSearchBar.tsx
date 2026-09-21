import { useEffect, useRef, useState } from "react";

import {
  MapPin,
  ArrowRightLeft,
  ArrowRight,
  Search,
} from "lucide-react";

interface City {
  name: string;
  state: string;
}

const cities: City[] = [
  { name: "Pune", state: "Maharashtra" },
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Nashik", state: "Maharashtra" },
  { name: "Nagpur", state: "Maharashtra" },
  { name: "Aurangabad", state: "Maharashtra" },
  { name: "Kolhapur", state: "Maharashtra" },
  { name: "Satara", state: "Maharashtra" },
  { name: "Solapur", state: "Maharashtra" },
  { name: "Ahmednagar", state: "Maharashtra" },
  { name: "Thane", state: "Maharashtra" },
  { name: "Delhi", state: "Delhi" },
  { name: "Bangalore", state: "Karnataka" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Goa", state: "Goa" },
];

/* =========================================
   BUS LOGO
========================================= */

function BusIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main bus body */}
      <rect
        x="5"
        y="3"
        width="24"
        height="28"
        rx="5"
        fill="#202020"
      />

      {/* Top destination display */}
      <rect
        x="10"
        y="6"
        width="14"
        height="5"
        rx="2"
        fill="white"
      />

      {/* Left mirror */}
      <rect
        x="1.5"
        y="12"
        width="3.5"
        height="8"
        rx="1"
        fill="#202020"
      />

      {/* Right mirror */}
      <rect
        x="29"
        y="12"
        width="3.5"
        height="8"
        rx="1"
        fill="#202020"
      />

      {/* Main windshield */}
      <rect
        x="7"
        y="12"
        width="20"
        height="11"
        rx="3"
        fill="white"
      />

      {/* Windshield center divider */}
      <rect
        x="16.5"
        y="12"
        width="1"
        height="11"
        fill="#202020"
      />

      {/* Left headlight */}
      <circle
        cx="10"
        cy="25"
        r="2"
        fill="white"
      />

      {/* Right headlight */}
      <circle
        cx="24"
        cy="25"
        r="2"
        fill="white"
      />

      {/* Front grille */}
      <rect
        x="12"
        y="25"
        width="10"
        height="1"
        rx="0.5"
        fill="white"
      />

      <rect
        x="12"
        y="27"
        width="10"
        height="1"
        rx="0.5"
        fill="white"
      />

      {/* Bottom bumper */}
      <rect
        x="11"
        y="29"
        width="12"
        height="2"
        rx="1"
        fill="#202020"
      />

      {/* Left wheel */}
      <rect
        x="7"
        y="28"
        width="5"
        height="5"
        rx="1.5"
        fill="#202020"
      />

      {/* Right wheel */}
      <rect
        x="22"
        y="28"
        width="5"
        height="5"
        rx="1.5"
        fill="#202020"
      />
    </svg>
  );
}

/* =========================================
   TRAVEL DATE ICON
========================================= */

function TravelDateIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Calendar outline */}
      <rect
        x="4"
        y="5"
        width="22"
        height="21"
        rx="3"
        stroke="#202020"
        strokeWidth="2.6"
      />

      {/* Top calendar line */}
      <path
        d="M4 11H26"
        stroke="#202020"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Left binding */}
      <path
        d="M9 3V7"
        stroke="#202020"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Right binding */}
      <path
        d="M21 3V7"
        stroke="#202020"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Green date dots */}
      <circle
        cx="10"
        cy="16"
        r="1.5"
        fill="#16A34A"
      />

      <circle
        cx="15"
        cy="16"
        r="1.5"
        fill="#16A34A"
      />

      <circle
        cx="20"
        cy="16"
        r="1.5"
        fill="#16A34A"
      />

      <circle
        cx="10"
        cy="21"
        r="1.5"
        fill="#16A34A"
      />

      <circle
        cx="15"
        cy="21"
        r="1.5"
        fill="#16A34A"
      />

      <circle
        cx="20"
        cy="21"
        r="1.5"
        fill="#16A34A"
      />
    </svg>
  );
}

/* =========================================
   BUS SEARCH BAR
========================================= */

function BusSearchBar() {
  /* =========================================
     TODAY'S DATE
  ========================================== */

  const today = new Date().toISOString().split("T")[0];

  /* =========================================
     STATES
  ========================================== */

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(today);

  const [activeField, setActiveField] = useState<
    "from" | "to" | null
  >(null);

  const searchBarRef = useRef<HTMLDivElement>(null);

  /* =========================================
     CLOSE SUGGESTIONS WHEN CLICKING OUTSIDE
  ========================================== */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================
     FILTER CITIES
  ========================================== */

  const filteredCities = (value: string) => {
    return cities.filter((city) =>
      city.name
        .toLowerCase()
        .includes(value.toLowerCase())
    );
  };

  const fromCities = filteredCities(from);
  const toCities = filteredCities(to);

  /* =========================================
     SWAP LOCATIONS
  ========================================== */

  const swapLocations = () => {
    const oldFrom = from;

    setFrom(to);
    setTo(oldFrom);
  };

  /* =========================================
     SEARCH
  ========================================== */

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please select From, To and Date.");
      return;
    }

    console.log({
      from,
      to,
      date,
    });
  };

  return (
    <section className="w-full px-4 py-10">
      <div
        ref={searchBarRef}
        className="mx-auto w-full max-w-7xl"
      >
        {/* =========================================
            OUTER SEARCH CONTAINER
        ========================================== */}

        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg md:p-5">

          {/* =========================================
              DESKTOP LAYOUT
          ========================================== */}

          <div className="relative hidden lg:grid lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center lg:gap-0">

            {/* =========================================
                FROM
            ========================================== */}

            <div className="relative">
              <div
                onClick={() => setActiveField("from")}
                className={`relative flex h-[84px] cursor-text items-center rounded-l-2xl rounded-r-none border bg-gray-100 px-5 transition-all ${
                  activeField === "from"
                    ? "border-gray-400 bg-gray-100 shadow-md"
                    : "border-gray-200"
                }`}
              >
                {/* FROM ICON */}

                <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    <BusIcon />

                    <ArrowRight
                      size={19}
                      strokeWidth={2.8}
                      className="text-green-600"
                    />
                  </div>
                </div>

                {/* FROM CONTENT */}

                <div className="relative flex h-full min-w-0 flex-1 items-center">
                  <label
                    className={`pointer-events-none absolute left-0 transition-all duration-200 ${
                      activeField === "from" || from
                        ? "top-[15px] text-xs font-semibold text-gray-500"
                        : "top-1/2 -translate-y-1/2 text-lg font-bold text-gray-700"
                    }`}
                  >
                    From
                  </label>

                  <input
                    type="text"
                    value={from}
                    onFocus={() =>
                      setActiveField("from")
                    }
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setActiveField("from");
                    }}
                    className={`w-full bg-transparent font-semibold text-gray-800 outline-none ${
                      activeField === "from" || from
                        ? "mt-6 pt-2 text-base"
                        : "text-lg"
                    }`}
                  />
                </div>
              </div>

              {/* FROM SUGGESTIONS */}

              {activeField === "from" &&
                from.trim() !== "" && (
                  <div className="absolute left-0 right-0 top-[94px] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    {fromCities.length > 0 ? (
                      fromCities.map((city) => (
                        <button
                          key={`${city.name}-${city.state}`}
                          type="button"
                          onClick={() => {
                            setFrom(city.name);
                            setActiveField(null);
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                            <MapPin
                              size={19}
                              strokeWidth={1.8}
                              className="text-gray-600"
                            />
                          </div>

                          <div>
                            <p className="text-base font-semibold text-gray-800">
                              {city.name}
                            </p>

                            <p className="mt-0.5 text-sm text-gray-500">
                              {city.state}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-5 py-5 text-base text-gray-500">
                        No city found
                      </p>
                    )}
                  </div>
                )}
            </div>

            {/* =========================================
                TO
            ========================================== */}

            <div className="relative">
              <div
                onClick={() => setActiveField("to")}
                className={`relative flex h-[84px] cursor-text items-center rounded-none border border-l-0 bg-gray-100 px-5 transition-all ${
                  activeField === "to"
                    ? "border-gray-400 bg-gray-100 shadow-md"
                    : "border-gray-200"
                }`}
              >
                {/* TO ICON */}

                <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <BusIcon />

                    <MapPin
                      size={18}
                      strokeWidth={2.5}
                      className="absolute -right-3 -top-3 fill-gray-200 text-green-600"
                    />
                  </div>
                </div>

                {/* TO CONTENT */}

                <div className="relative flex h-full min-w-0 flex-1 items-center">
                  <label
                    className={`pointer-events-none absolute left-0 transition-all duration-200 ${
                      activeField === "to" || to
                        ? "top-[15px] text-xs font-semibold text-gray-500"
                        : "top-1/2 -translate-y-1/2 text-lg font-bold text-gray-700"
                    }`}
                  >
                    To
                  </label>

                  <input
                    type="text"
                    value={to}
                    onFocus={() =>
                      setActiveField("to")
                    }
                    onChange={(e) => {
                      setTo(e.target.value);
                      setActiveField("to");
                    }}
                    className={`w-full bg-transparent font-semibold text-gray-800 outline-none ${
                      activeField === "to" || to
                        ? "mt-6 pt-2 text-base"
                        : "text-lg"
                    }`}
                  />
                </div>
              </div>

              {/* TO SUGGESTIONS */}

              {activeField === "to" &&
                to.trim() !== "" && (
                  <div className="absolute left-0 right-0 top-[94px] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    {toCities.length > 0 ? (
                      toCities.map((city) => (
                        <button
                          key={`${city.name}-${city.state}`}
                          type="button"
                          onClick={() => {
                            setTo(city.name);
                            setActiveField(null);
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                            <MapPin
                              size={19}
                              strokeWidth={1.8}
                              className="text-gray-600"
                            />
                          </div>

                          <div>
                            <p className="text-base font-semibold text-gray-800">
                              {city.name}
                            </p>

                            <p className="mt-0.5 text-sm text-gray-500">
                              {city.state}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-5 py-5 text-base text-gray-500">
                        No city found
                      </p>
                    )}
                  </div>
                )}
            </div>

            {/* =========================================
                TRAVEL DATE
            ========================================== */}

            <div>
              <label
                htmlFor="travel-date"
                className="flex h-[84px] cursor-pointer items-center border border-l-0 border-gray-200 bg-gray-100 px-5 transition-all hover:border-gray-400"
              >
                <TravelDateIcon />

                <div className="ml-4 min-w-0 flex-1">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Travel Date
                  </p>

                  <input
                    id="travel-date"
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="w-full cursor-pointer bg-transparent text-base font-semibold text-gray-800 outline-none"
                  />
                </div>
              </label>
            </div>

            {/* =========================================
                SEARCH BUTTON
            ========================================== */}

            <button
              type="button"
              onClick={handleSearch}
              className="flex h-[84px] items-center justify-center gap-3 rounded-r-2xl border border-l-0 border-green-600 bg-green-600 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-[0.98]"
            >
              <Search
                size={23}
                strokeWidth={2}
              />

              <span>Search Buses</span>
            </button>

            {/* =========================================
                SWAP BUTTON
                PART OF FROM / TO BORDER
            ========================================== */}

            <button
              type="button"
              onClick={swapLocations}
              title="Swap locations"
              className="absolute left-[33.333%] top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-gray-600 shadow-md transition-all hover:bg-gray-200 hover:shadow-lg active:scale-95"
            >
              <ArrowRightLeft
                size={19}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* =========================================
              MOBILE / TABLET LAYOUT
          ========================================== */}

          <div className="grid grid-cols-1 gap-4 lg:hidden">

            {/* FROM */}

            <div className="relative">
              <div
                onClick={() => setActiveField("from")}
                className={`relative flex h-[84px] cursor-text items-center rounded-2xl border bg-gray-100 px-5 ${
                  activeField === "from"
                    ? "border-gray-400 shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    <BusIcon />

                    <ArrowRight
                      size={19}
                      strokeWidth={2.8}
                      className="text-green-600"
                    />
                  </div>
                </div>

                <div className="relative flex h-full min-w-0 flex-1 items-center">
                  <label
                    className={`pointer-events-none absolute left-0 ${
                      activeField === "from" || from
                        ? "top-[15px] text-xs font-semibold text-gray-500"
                        : "top-1/2 -translate-y-1/2 text-lg font-bold text-gray-700"
                    }`}
                  >
                    From
                  </label>

                  <input
                    type="text"
                    value={from}
                    onFocus={() =>
                      setActiveField("from")
                    }
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setActiveField("from");
                    }}
                    className={`w-full bg-transparent font-semibold text-gray-800 outline-none ${
                      activeField === "from" || from
                        ? "mt-6 pt-2 text-base"
                        : "text-lg"
                    }`}
                  />
                </div>
              </div>

              {/* MOBILE FROM SUGGESTIONS */}

              {activeField === "from" &&
                from.trim() !== "" && (
                  <div className="absolute left-0 right-0 top-[94px] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    {fromCities.length > 0 ? (
                      fromCities.map((city) => (
                        <button
                          key={`${city.name}-${city.state}`}
                          type="button"
                          onClick={() => {
                            setFrom(city.name);
                            setActiveField(null);
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                            <MapPin
                              size={19}
                              strokeWidth={1.8}
                              className="text-gray-600"
                            />
                          </div>

                          <div>
                            <p className="text-base font-semibold text-gray-800">
                              {city.name}
                            </p>

                            <p className="mt-0.5 text-sm text-gray-500">
                              {city.state}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-5 py-5 text-base text-gray-500">
                        No city found
                      </p>
                    )}
                  </div>
                )}
            </div>

            {/* TO */}

            <div className="relative">
              <div
                onClick={() => setActiveField("to")}
                className={`relative flex h-[84px] cursor-text items-center rounded-2xl border bg-gray-100 px-5 ${
                  activeField === "to"
                    ? "border-gray-400 shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <BusIcon />

                    <MapPin
                      size={18}
                      strokeWidth={2.5}
                      className="absolute -right-3 -top-3 fill-gray-200 text-green-600"
                    />
                  </div>
                </div>

                <div className="relative flex h-full min-w-0 flex-1 items-center">
                  <label
                    className={`pointer-events-none absolute left-0 ${
                      activeField === "to" || to
                        ? "top-[15px] text-xs font-semibold text-gray-500"
                        : "top-1/2 -translate-y-1/2 text-lg font-bold text-gray-700"
                    }`}
                  >
                    To
                  </label>

                  <input
                    type="text"
                    value={to}
                    onFocus={() =>
                      setActiveField("to")
                    }
                    onChange={(e) => {
                      setTo(e.target.value);
                      setActiveField("to");
                    }}
                    className={`w-full bg-transparent font-semibold text-gray-800 outline-none ${
                      activeField === "to" || to
                        ? "mt-6 pt-2 text-base"
                        : "text-lg"
                    }`}
                  />
                </div>
              </div>

              {/* MOBILE TO SUGGESTIONS */}

              {activeField === "to" &&
                to.trim() !== "" && (
                  <div className="absolute left-0 right-0 top-[94px] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    {toCities.length > 0 ? (
                      toCities.map((city) => (
                        <button
                          key={`${city.name}-${city.state}`}
                          type="button"
                          onClick={() => {
                            setTo(city.name);
                            setActiveField(null);
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                            <MapPin
                              size={19}
                              strokeWidth={1.8}
                              className="text-gray-600"
                            />
                          </div>

                          <div>
                            <p className="text-base font-semibold text-gray-800">
                              {city.name}
                            </p>

                            <p className="mt-0.5 text-sm text-gray-500">
                              {city.state}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-5 py-5 text-base text-gray-500">
                        No city found
                      </p>
                    )}
                  </div>
                )}
            </div>

            {/* TRAVEL DATE */}

            <label
              htmlFor="travel-date-mobile"
              className="flex h-[84px] cursor-pointer items-center rounded-2xl border border-gray-200 bg-gray-100 px-5"
            >
              <TravelDateIcon />

              <div className="ml-4 min-w-0 flex-1">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Travel Date
                </p>

                <input
                  id="travel-date-mobile"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full cursor-pointer bg-transparent text-base font-semibold text-gray-800 outline-none"
                />
              </div>
            </label>

            {/* SEARCH */}

            <button
              type="button"
              onClick={handleSearch}
              className="flex h-[84px] items-center justify-center gap-3 rounded-2xl border border-green-600 bg-green-600 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-[0.98]"
            >
              <Search
                size={23}
                strokeWidth={2}
              />

              <span>Search Buses</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusSearchBar;