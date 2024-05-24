import { useState, useEffect } from "react";
import { CombinedData } from "../interfaces";
import propsDataset from "../data/props.json";
import alternatesDataset from "../data/alternates.json";

const useCombinedData = () => {
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [filters, setFilters] = useState({
    position: "",
    statType: "",
    marketSuspended: "",
    playerSearch: "",
    teamSearch: "",
  });

  // Use data from 'alternates.json' to calculate required column values for each market/line within 'props.json'
  useEffect(() => {
    const combined = propsDataset.map((playerMarket) => {
      const alternates = alternatesDataset.filter(
        (alt) =>
          alt.playerId === playerMarket.playerId &&
          alt.statTypeId === playerMarket.statTypeId
      );

      const optimalAlternate = alternates.find(
        (altLine) => altLine.line === playerMarket.line
      );

      const lines = alternates.map((altLine) => altLine.line);
      const lowLine = lines.length > 0 ? Math.min(...lines) : 0;
      const highLine = lines.length > 0 ? Math.max(...lines) : 0;

      const isSuspended =
        playerMarket.marketSuspended === 1 ||
        !optimalAlternate ||
        (optimalAlternate &&
          Math.max(
            optimalAlternate.underOdds,
            optimalAlternate.overOdds,
            optimalAlternate.pushOdds
          ) <= 0.4);

      return {
        ...playerMarket,
        lowLine,
        highLine,
        alternatePushOdds: optimalAlternate ? optimalAlternate.pushOdds : null,
        alternateUnderOdds: optimalAlternate
          ? optimalAlternate.underOdds
          : null,
        alternateOverOdds: optimalAlternate ? optimalAlternate.overOdds : null,
        marketSuspended: isSuspended ? 1 : 0,
      };
    });
    setCombinedData(combined);
  }, []);

  const toggleLock = (row: CombinedData) => {
    setCombinedData((prevData) =>
      prevData.map((playerMarket) =>
        playerMarket.playerId === row.playerId &&
        playerMarket.statTypeId === row.statTypeId
          ? {
              ...playerMarket,
              marketSuspended: playerMarket.marketSuspended ? 0 : 1,
            }
          : playerMarket
      )
    );
  };

  const filteredData = combinedData.filter((playerMarket) => {
    return (
      (filters.position ? playerMarket.position === filters.position : true) &&
      (filters.statType ? playerMarket.statType === filters.statType : true) &&
      (filters.marketSuspended
        ? playerMarket.marketSuspended.toString() === filters.marketSuspended
        : true) &&
      (filters.playerSearch
        ? playerMarket.playerName
            .toLowerCase()
            .includes(filters.playerSearch.toLowerCase())
        : true) &&
      (filters.teamSearch
        ? playerMarket.teamNickname
            .toLowerCase()
            .includes(filters.teamSearch.toLowerCase())
        : true)
    );
  });

  return { filteredData, filters, setFilters, toggleLock };
};

export default useCombinedData;
