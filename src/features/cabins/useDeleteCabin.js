import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletecabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(){
    const queryclient = useQueryClient();
    
    const{isLoading:isDeleting ,mutate:deleteCabin}=useMutation(
    {
        mutationFn: deleteCabinApi,
        onSuccess:()=>{
            toast.success("Cabin sucessfully Deleted");
            queryclient.invalidateQueries({
                querykey:["cabin"],
            })
        },
        onError:(err)=>toast.error(err.message),
    });
    return {isDeleting,deleteCabin};
}