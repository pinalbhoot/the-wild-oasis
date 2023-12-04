import { useEffect } from "react";
import { useRef } from "react";

export function useOutsideClick(handler,listnercaptcharing=true){
    const ref = useRef();

 useEffect(
  function(){

    function handalClick(e){
      if(ref.current  && !ref.current.contains(e.target)){
      
        handler();
      }
    }
      
      document.addEventListener("click",handalClick,listnercaptcharing);
      return()=>document.removeEventListener("click",handalClick,listnercaptcharing)
 },[handler,listnercaptcharing]
 )
 return ref;

}