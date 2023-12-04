import { useMutation } from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth";
import {toast} from "react-hot-toast";

export function useSignup(){
    const{mutate:signup,isLoading}=useMutation({
        mutationFn:signupApi,
        onSuccess:(user)=>{
            console.log(user);
            toast.success("Account sucessfully Created! please verify the new Account from the user's email address.");
        },
    });
    return{signup,isLoading};
}