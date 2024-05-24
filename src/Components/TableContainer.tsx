import Table from "./Table";
import Filter from "./Filter";
import useCombinedData from "../Hooks/useCombinedData";

const TableContainer = () => {
  const { toggleLock, filteredData, setFilters, filters } = useCombinedData();

  return (
    <div>
      <Filter filters={filters} onFilterChange={setFilters} />
      {filteredData && (
        <Table combinedData={filteredData} toggleLock={toggleLock} />
      )}
    </div>
  );
};

export default TableContainer;
