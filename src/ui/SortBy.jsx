import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({options}){
  const[searchParams,setSearchParams]=useSearchParams();
  const sortBy = searchParams.get("sortBy") ||"";

    function handalChange(e){
        searchParams.set('sortBy',e.target.value)
        setSearchParams(searchParams)
    }
  return(
     <Select options={options} type="white" value={sortBy} onChange={handalChange}/>
  );
}
export default SortBy;