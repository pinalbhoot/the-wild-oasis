import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./usecreateCabin";
import { useEditCabin } from "./useEditCabin";


function CreateCabinForm({cabinToEdit ={},onCloseModel}) {
  const {id:editId,...editvalues}=cabinToEdit ;
  const isEditSession =Boolean(editId);

  const {register,handleSubmit,reset,getValues,formState}=useForm(
    {
      defaultValues:isEditSession ? editvalues :{},
    }
  );

  const {errors}= formState;
  console.log(errors);

  const{isCreating,createCabin}= useCreateCabin()
 
  const{editCabin,isEditing}=useEditCabin();

 
  const isWorking = isCreating || isEditing;

  function onSubmit(data)
  {  
    const image = typeof data.image === "string" ? data.image : data.image[0];
    //console.log(data)
    if(isEditSession) 
         editCabin(
        {newCabinData: {...data,image},id:editId},{
          onSuccess:(data)=>{
            reset();
            onCloseModel?.(); 
          },
        });
    else
     createCabin({...data,image:image},{
      onSuccess:(data)=>{
        reset();
        onCloseModel?.();
      },
    });
  }
  function onError(errors){
  console.log(errors);
} 
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModel ? "model" : "regular"}>
      

      <FormRow lable= "cabin name" error={errors?.name?.message} >
          <Input type="text" id="name"  disabled={isWorking} {...register("name",{required:"This Field is Requried"})} />
      </FormRow>

      <FormRow lable = " Maximun Capacity " error={errors?.maxCapacity?.message} >
       
        <Input type="number" id="maxCapacity"  disabled={isWorking}  {...register("maxCapacity",{required:"This Field is Requried",
      min:{
        value:1,
        message:"Capacity should be at least 1"
      }})} />
      </FormRow>

      <FormRow  lable = "Regular Price " error={errors?.regularPrice?.message} >
      
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice",{required:"This Field is Requried"})}/>
      </FormRow>

      <FormRow  lable = " Discount " error={errors?.discountPrice?.message} >
       
        <Input type="number" id="discountPrice"  disabled={isWorking} defaultValue={0} {...register("discountPrice",{
          required:"This Field is Requried",
           validate: (value)=> value <= getValues().regularPrice ||
            "Discount Should be Less then  Regular Price",      
      })} />
      </FormRow>

      <FormRow  lable = "Description for websitees" error={errors?.description?.message} >    
          <Textarea type="number" id="description"   disabled={isWorking} defaultValue="" {...register("description",{required:"This Field is Requried"})}/>
      </FormRow>

      <FormRow>
        {/* <lable htmlFor="image">Cabin photo</lable> */}
        <label htmlFor="image">Cabin photo</label>
        <FileInput id="image" accept="image/*" {...register("image",{required: isEditSession ? false : "This Field is Requried"})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModel?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin":"Create New  cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
