import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import {
  CreateQuizDialog,
  QuizesList,
} from '../sections/@dashboard/quizes';
// mock
import { create, fetchAll } from 'src/api/quizes';
import QuizesDialog from 'src/sections/@dashboard/quizes/QuizesDialog';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function QuizesPage() {
  const [selectedQuiz, setSelectedQuiz] = React.useState(null);
  const [newQuiz, setNewQuiz] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleOpenQuiz = React.useCallback((quiz) => {
    setSelectedQuiz(quiz);
  }, []);

  const handleCloseQuiz = React.useCallback(() => setSelectedQuiz(null), []);

  const handleCloseNewQuiz = React.useCallback(() => setNewQuiz(false), []);

  const handleSubmit = React.useCallback((quiz) => {
    create(quiz)
    .then((data) => setData((prev) => {
      prev.push(data);
      return prev;
    }))
    .catch((err) => console.log(err))
    .finally(handleCloseNewQuiz)
  }, [data]);

  React.useEffect(() => {
    fetchAll()
    .then((res) => setData(res))
    .catch((err) => console.log(err))
  }, []);

  return (
    <>
      <Helmet>
        <title>Quizes | Math-Eaxm</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Quizes
          </Typography>
          <Button
            variant="contained" 
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setNewQuiz(true)}
          >
            New Quiz
          </Button>
        </Stack>

        <QuizesList data={data} onOpen={handleOpenQuiz} />
        {
          selectedQuiz && <QuizesDialog quiz={selectedQuiz} onClose={handleCloseQuiz} />
        }
        {
          newQuiz && <CreateQuizDialog onClose={handleCloseNewQuiz} onSubmit={handleSubmit} />
        }
      </Container>
    </>
  );
}
