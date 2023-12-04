import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useCreateCabin(){

    const queryClient =useQueryClient();   
    
    const { mutate:createCabin, isLoading: isCreating } = useMutation({
        mutationFn: creatEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["Cabins"] });
           
        },
        onError: (err) => toast.error(err.message),
    });
    return{createCabin,isCreating}
}