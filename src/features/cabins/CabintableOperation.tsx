import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No discount" },
  { value: "with-discount", label: "With discount" },
];

const CabinTableOperation = () => {
  return (
    <TableOperations>
      <Filter filterField="discount" options={OPTIONS} />
    </TableOperations>
  );
};

export default CabinTableOperation;
