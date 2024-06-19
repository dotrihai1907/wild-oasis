import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const Cabins = () => {
  const [isAddNew, setIsAddNew] = useState<boolean>(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setIsAddNew((cur) => !cur)}>
          Add new cabin
        </Button>
        {isAddNew && <CreateCabinForm />}
      </Row>
    </>
  );
};

export default Cabins;
