import ButtonIcon from "../../ui/ButtonIcon";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import { useLogout } from "./useLogout";
import Spinnermini from "../../ui/SpinnerMini";

function Logout(){
    const{Logout,isLoading}=useLogout();
        return(
        <ButtonIcon disabled={isLoading} onClick={Logout}>
         {!isLoading ? <HiArrowRightOnRectangle/> : <Spinnermini/>}
        </ButtonIcon>);
}
export default Logout;