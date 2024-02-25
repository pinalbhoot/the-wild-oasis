import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { creatCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const {register,handleSubmit,reset,getValues,formState}=useForm();

  const {errors}= formState;
  console.log(errors);
 
  const queryClient =useQueryClient();
  

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: creatCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });


  function onSubmit(data)
  {   
    //console.log(data)
     mutate({...data,image:data.image[0]});
  }
  function onError(errors){
  //console.log(errors);
} 
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      

      <FormRow label= "cabin name" error={errors?.name?.message} >
          <Input type="text" id="name"  disabled={isCreating} {...register("name",{required:"This Field is Requried"})} />
      </FormRow>

      <FormRow label = " Maximun Capacity " error={errors?.maxCapacity?.message} >
       
        <Input type="number" id="maxCapacity"  disabled={isCreating}  {...register("maxCapacity",{required:"This Field is Requried",
      min:{
        value:1,
        message:"Capacity should be at least 1"
      }})} />
      </FormRow>

      <FormRow  label = "Regular Price " error={errors?.regularPrice?.message} >
      
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice",{required:"This Field is Requried"})}/>
      </FormRow>

      <FormRow  label = " Discount " error={errors?.discountPrice?.message} >
       
        <Input type="number" id="discountPrice"  disabled={isCreating} defaultValue={0} {...register("discountPrice",{
          required:"This Field is Requried",
           validate: (value)=> value <= getValues().regularPrice ||
            "Discount Should be Less then  Regular Price",      
      })} />
      </FormRow>

      <FormRow  label = "Description for websitees" error={errors?.description?.message} >    
          <Textarea type="number" id="description"   disabled={isCreating} defaultValue="" {...register("description",{required:"This Field is Requried"})}/>
      </FormRow>

      <FormRow>
        {/* <lable htmlFor="image">Cabin photo</lable> */}
        <label htmlFor="image">Cabin photo</label>
        <FileInput id="image" accept="image/*" {...register("image",{required:"This Field is Requried"})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
