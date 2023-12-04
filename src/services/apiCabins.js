import supabase, { supabaseurl } from'./supabase';

export async function getCabins(){
    const { data, error } = await supabase.from("Cabins")
        .select('*')

        if(error){
                console.error(error);
                throw new Error("cabins could not be Found");

        }
        return data;
}

export async function creatEditCabin(newCabin,id)
  {
       console.log(newCabin,id);
         
        const hasImagePath = newCabin.image?.startsWith?.(supabaseurl);
        const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
        const imagePath =  hasImagePath ? newCabin.image 
                          :`${supabaseurl}/storage/v1/object/public/cabin-images/${imageName}`;
        
       //1.create/edit cabin 
       let query = supabase.from('Cabins');

        if(!id) 
          query = query.insert([{...newCabin,image:imagePath}]);

        if(id)
        query = query.update({...newCabin,image:imagePath})
     .eq('id',id);
    
    
     const{data,error} = await query.select().single();
    

     if(error){
           console.error(error);
           throw new Error("cabins could not be Created");       
          }
          //2.upload image
          if(hasImagePath) return data;
     const {error:StorageError } = await supabase
        .storage
        .from("cabin-images")
        .upload(imageName,newCabin.image)
        
        if(StorageError)
        {
          await supabase.from('Cabins').delete().eq("id",data.id)
          console.error(error);
          throw new Error("cabin image not uploaded and the cabin could not be Created");       
        }
        return data; 
        


  }
export async function deletecabin(id)
{
        const { data, error } = await supabase
        .from('Cabins')
        .delete()
        .eq("id",id)

       if(error){
                console.error(error);
                throw new Error("cabins could not be Found");

        }
        return data; 

}
