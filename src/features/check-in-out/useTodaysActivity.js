import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodaysActivity(){
   const{isLoading,data:activities}=useQuery({
    queryFn:getStaysTodayActivity,
    queryKey:['todays-activity']
   });
   return{isLoading,activities}
}