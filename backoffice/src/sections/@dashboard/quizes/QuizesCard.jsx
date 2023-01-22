import React from 'react';
// @mui
import {
  Card, Typography, Stack, Box, Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import generateGradient from 'src/utils/generateGradient';
// moment
import moment from 'moment'
// ----------------------------------------------------------------------

const StyledCard = styled(Card)(({ theme }) => ({
  width: '300px',
  height: '300px',
  boxShadow: theme.shadows,
  backgroundImage: generateGradient()
}));


// ----------------------------------------------------------------------

function QuizesCard({ data, onOpen }) {
  const {
    title, updatedAt, createdAt, questions
  } = data;
  return (
    <StyledCard variant="elevation">
      <Stack 
        spacing={2} 
        sx={{ p: 3, height: '100%' }}
        direction="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h2" textTransform="capitalize" noWrap color="white">
            {title}
          </Typography>
          <Typography variant="inherit" textTransform="capitalize" noWrap color="white">
            {questions.length > 1 ? `${questions.length} questions` : `${questions.length} question`}
          </Typography>
        </Box>
        <Stack>
          <Typography variant="line" textTransform="capitalize" textOverflow="revert " color="white">
            Created at {moment(createdAt).subtract(10, 'days').calendar()}
          </Typography>
          <Typography variant="line" textTransform="capitalize" textOverflow="revert " color="white">
            Updated at {moment(updatedAt).subtract(10, 'days').calendar()}
          </Typography>
          <Button 
            onClick={() => onOpen(data)} 
            variant="contained"
            sx={{mt: 2}}
          >See the quiz</Button>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

export default QuizesCard;
