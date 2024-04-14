import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ProgressCircle({value1}:{value1:number}) {
   const maxValue = 100;
   return (
      <div className='flex min-h-full w-auto flex-1 justify-center mt-3 bg-'>
         <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      
            
            <CircularProgress
               color="inherit"
            variant="determinate"
            size={150}
            thickness={5}
            value={value1}
            />
            <Box
            sx={{
               top: 0,
               left: 0,
               bottom: 0,
               right: 0,
               position: 'absolute',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
            >
            <Typography
               variant="caption"
               component="div"
               color="text.secondary"
               fontSize="1.5rem"
            >{`Point: ${Math.round(value1)}`}</Typography>
            </Box>
         </Box>
   </div>
   
   //  <div className="relative h-40 w-40 bg-white border border-black rounded-full">
   //    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full bg-slate-400 rounded-full" style={{ width: `${userPoint}%` }} />
   //    <div className="absolute top-1/4 left-1/4 transform translate-x-1/4 -translate-y-1/4 text-black font-bold">{`point : ${userPoint}`}</div>
   //  </div>
  );
}
