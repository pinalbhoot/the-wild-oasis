import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
// import Uploader from "../data/Uploader";

import { useCabin } from "../features/cabins/useCabins";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-green-100);

   grid-row: 1/-1;
   display: flex;
   flex-direction: column;
   gap: 3.2rem;
`

function Sidebar()
{
    // const{cabins,isLoading}=useCabin();
    return(
        <StyledSidebar>
            <Logo/>
            <MainNav/>
            {/* <Uploader/> */}
        </StyledSidebar>
    );
}
export default Sidebar;