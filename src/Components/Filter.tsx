import React from "react";
import "./styles.css";

interface FilterProps {
  filters: {
    position: string;
    statType: string;
    marketSuspended: string;
    playerSearch: string;
    teamSearch: string;
  };
  onFilterChange: (filters: any) => void;
}

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div>
      <input
        type="text"
        name="playerSearch"
        placeholder="Player Name"
        value={filters.playerSearch}
        onChange={handleChange}
        className="filter"
      />
      <input
        type="text"
        name="teamSearch"
        placeholder="Team Name"
        className="filter"
        value={filters.teamSearch}
        onChange={handleChange}
      />
      <select
        name="position"
        value={filters.position}
        onChange={handleChange}
        className="filter"
      >
        <option value="">All Positions</option>
        <option value="PG">Point Guard</option>
        <option value="SG">Shooting Guard</option>
        <option value="SF">Small Forward</option>
        <option value="PF">Power Forward</option>
        <option value="C">Center</option>
      </select>
      <select
        name="statType"
        value={filters.statType}
        onChange={handleChange}
        className="filter"
      >
        <option value="">All Stat Types</option>
        <option value="points">Points</option>
        <option value="rebounds">Rebounds</option>
        <option value="assists">Assists</option>
        <option value="steals">Steals</option>
      </select>
      <select
        name="marketSuspended"
        value={filters.marketSuspended}
        onChange={handleChange}
        className="filter"
      >
        <option value="">All Markets</option>
        <option value="0">Active</option>
        <option value="1">Suspended</option>
      </select>
    </div>
  );
};

export default Filter;
