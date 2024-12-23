import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabins from "../features/cabins/AddCabins";
import CabinTableOprators from "../features/cabins/CabinTableOprators";

function Cabins() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
       <CabinTableOprators/>
    </Row>

    <Row>
      <CabinTable/>
      <AddCabins/>
    </Row>
    </>
  );
}

export default Cabins;
