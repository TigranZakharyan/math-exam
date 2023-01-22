import React from 'react';
// @mui
import { Stack, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, Grid, styled, Checkbox, FormControlLabel, Divider, InputBase, colors } from '@mui/material';
import { Delete } from '@mui/icons-material';
// ----------------------------------------------------------------------


const StyledInput = styled(Input)({
    fontSize: 23,
    marginTop: 24,
    marginBottom: 12
})

const DEFAULT_QUESTION = {
    title: "",
    answers: []
}

const DEFAULT_ANSWER = {
    title: "",
    isRight: false,
}

function CreateQuizDialog({ onClose, onSubmit }) {
    const [quiz, setQuiz] = React.useState({
        title: "",
        category: "",
        description: ""
    });

    const [questions, setQuestions] = React.useState([]);

    const handleQuizChange = React.useCallback(({ target }) => {
        const { value, id } = target;
        setQuiz({...quiz, [id]: value});
    }, [quiz]);

    const handleAddQuestion = React.useCallback(() => {
        setQuestions([...questions, {...DEFAULT_QUESTION}]);
    }, [questions]);

    const handleDeleteQuestion = React.useCallback((qid) => {
        const arr = [...questions];
        arr.splice(qid, 1);
        setQuestions(arr);
    }, [questions]);

    const handleQuestionChange = React.useCallback(({ target: { value } }, qid) => {
        const arr = [...questions];
        arr[qid].title = value;
        setQuestions(arr);
    }, [questions]);

    const handleAddAnswer = React.useCallback((qid) => {
        const arr = [...questions];
        arr[qid].answers = [...arr[qid].answers, {...DEFAULT_ANSWER}];
        setQuestions(arr);
    }, [questions]);

    const handleAnswerChange = React.useCallback(({ target: { value } }, qid, aid) => {
        const arr = [...questions];
        arr[qid].answers[aid].title = value;
        setQuestions(arr);
    }, [questions]);

    const handleCheckboxChange = React.useCallback(({ target: { checked } }, qid, aid) => {
        const arr = [...questions];
        arr[qid].answers[aid].isRight = checked;
        setQuestions(arr);
    }, [questions]);

    const handleDeleteAnswer = React.useCallback((qid, aid) => {
        const arr = [...questions];
        arr[qid].answers.splice(aid, 1);
        setQuestions(arr);
    }, [questions]);

    const handleSubmit = () => {
        onSubmit({
            ...quiz,
            questions
        })
    }

    return (
        <Dialog
            open
            fullWidth
            maxWidth="md"
            onClose={onClose}
        >
            <DialogTitle textTransform="capitalize">Create new quiz</DialogTitle>
            <DialogContent dividers sx={{width: '800px'}}>
                <Stack spacing={3}>
                    <Grid container justifyContent="space-between" alignItems="flex-start">
                        <TextField placeholder="Quiz name" onChange={handleQuizChange} id="title" />
                        <TextField placeholder="Category" onChange={handleQuizChange} id="category" />
                        <Button variant="outlined" onClick={handleAddQuestion}>+ Add question</Button>
                    </Grid>
                    <TextField placeholder="Description" onChange={handleQuizChange} id="description" />
                </Stack>
                {
                    questions.map(({ answers, title }, qid) => (
                        <Box>
                            <Stack spacing={3} flex flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                                <StyledInput value={title} placeholder={`Question ${qid + 1}`} onChange={(e) => handleQuestionChange(e, qid)} />
                                <Box>
                                    <Button variant="outlined" onClick={() => handleAddAnswer(qid)}>+ Add answer</Button>
                                    <Button variant="text" onClick={() => handleDeleteQuestion(qid)}><Delete sx={{ color: colors.red.A700 }} /></Button>
                                </Box>
                            </Stack>
                            {
                                answers.map(({ isRight, title }, aid) => (
                                    <Stack justifyContent="space-between" alignItems="center" alignContent="center" flexDirection="row">
                                        <InputBase value={title} placeholder={`Answer ${aid + 1}`} variant="standard" onChange={(e) => handleAnswerChange(e, qid, aid)} />
                                        <Box>
                                        <FormControlLabel control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={(e) => handleCheckboxChange(e, qid, aid)} checked={isRight} />} label="Is right?" />
                                        <Button variant="text" onClick={() => handleDeleteAnswer(qid, aid)}><Delete sx={{ color: colors.red.A700 }} /></Button>
                                        </Box>
                                    </Stack> 
                                ))
                            }
                        </Box>
                    ))
                }
                
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose}>
                Close
            </Button>
            <Button onClick={handleSubmit} type="submit">OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateQuizDialog;

