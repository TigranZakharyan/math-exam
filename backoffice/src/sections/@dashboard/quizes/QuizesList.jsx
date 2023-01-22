import React from 'react';
// @mui
import { Grid, Typography, Box, Stack } from '@mui/material';
import QuizesCard from './QuizesCard';

// ----------------------------------------------------------------------

function QuizesList({ data, onOpen }) {
  const sortedData = {};
  data.forEach((e) => {
    const { category } = e;
    if(sortedData[category]) {
      sortedData[category].push(e)
    } else {
      sortedData[e.category] = [e]
    }
  });
  return (
    <>
      {Object.entries(sortedData).map((item) => {
        const [category, items] = item;
        return (
          <Box key={category}>
            <Typography variant="h2" textTransform="capitalize">{category}</Typography>
              <Grid container gap={3} flexDirection="row" justifyContent="flex-start">
                {
                  items.map((e) => <QuizesCard data={e} onOpen={onOpen} />)
                }
              </Grid>
          </Box>
        )
      })}
    </>
  );
}

export default QuizesList;
