import { get } from "lodash";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  const filteredCabins = useMemo(() => {
    if (filterValue === "all") return cabins;
    if (filterValue === "no-discount")
      return cabins?.filter((cabin) => cabin.discount === 0);
    if (filterValue === "with-discount")
      return cabins?.filter((cabin) => cabin.discount > 0);
  }, [cabins, filterValue]);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = useMemo(
    () =>
      filteredCabins?.sort(
        (a, b) => (get(a, field) - get(b, field)) * modifier
      ),
    [field, filteredCabins, modifier]
  );

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
