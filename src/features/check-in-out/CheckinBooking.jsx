import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import {useSettings} from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const[confirmPaid,setConfirmPaid]=useState(false);
  const[addbreackfast,setAddBreackFast]=useState(false);

  const{booking,isLoading}=useBooking();
  const{settings,isLoading:isLoadingSetting}=useSettings();
  

  const moveBack = useMoveBack();
  useEffect(()=>setConfirmPaid(booking?.isPaid??false),[booking]);
  
  const{checkin,isCheckinIn}= useCheckin();
  
  if(isLoading ||  isLoadingSetting)return<Spinner/> 
  
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const OptionalBreakfastPrice = settings.breakfasePrice * numNights * numGuests;

  function handleCheckin() {
    if(!confirmPaid) return;

    if(addbreackfast){
      checkin({
        bookingId,
        breakfast:{
          hasBreakfast:true,
          extrasPrice:OptionalBreakfastPrice,
          totalPrice:totalPrice + OptionalBreakfastPrice,
        },
      });

    }
    else{
        checkin({bookingId,breakfast:{}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} /> 

     { !hasBreakfast &&( 
      <Box>
        <CheckBox checked={addbreackfast}
         onChange={()=>{setAddBreackFast((add)=>!add);
         setConfirmPaid(false);
        }}
        id="breakfast"
        >
          Want to Add Breakfast for {formatCurrency(OptionalBreakfastPrice)}?

        </CheckBox>
      </Box>
      )}

       <Box>
         <CheckBox checked={confirmPaid}
         onChange={()=>setConfirmPaid((confirm)=>!confirm)}
         disabled={confirmPaid || isCheckinIn}
         id="confirm"
         >
             I Confirm that {guests.fullName} has paid the total amount of {" "} 
             {!addbreackfast ? formatCurrency(totalPrice) 
             :`${formatCurrency(totalPrice+OptionalBreakfastPrice)} 
             (${formatCurrency(totalPrice)} + ${formatCurrency(OptionalBreakfastPrice)})`}
         </CheckBox>
       </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
