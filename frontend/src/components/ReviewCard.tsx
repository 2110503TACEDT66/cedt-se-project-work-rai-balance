"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function ReviewCard({
  rating,
  description,
  userid,
  createdAt
}: {
  rating:number,
  description:string,
  userid:string,
  createdAt:string
}) {

  const [value, setValue] = React.useState<number | null>(2);

  return (
    <div className="border-b-2 m-[25px]">
      <div className='font-semibold mb-[5px]'>
        User ID : {userid}
      </div>
      
      <Rating name="read-only" value={rating} readOnly className='mb-[15px]'/>
      
      <div className="font-semibold mb-[5px]">
        Comment : {description}
      </div>
      {createdAt}
    </div>
    );
}