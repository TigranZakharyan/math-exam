import React from 'react';
// @mui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography, colors } from '@mui/material';

// ----------------------------------------------------------------------

function QuizesDialog({ quiz, onClose }) {
    return (
        <Dialog
            open
            fullWidth
            maxWidth="md"
        >
            <DialogTitle textTransform="capitalize">{ quiz.title }</DialogTitle>
            <DialogContent dividers sx={{width: '800px'}}>
                {
                    quiz.questions.map((qst, index) => (
                        <Box sx={{width: '100%'}} key={qst.title}>
                            <Typography variant="h4" textTransform="capitalize">{`${index + 1}. ${qst.title}`}</Typography>
                            <List sx={{pl: 5}}>
                                {
                                    qst.answers.map((asw, index) => (
                                        <ListItem key={asw.title} sx={{d: 'flex', justifyContent: 'space-between'}}>
                                            <Typography textTransform="capitalize">{`${index + 1}. ${asw.title}`}</Typography>
                                            <Typography 
                                                textTransform="capitalize" 
                                                color={asw.isCorrect ? colors.green.A700 : colors.red.A700}
                                            >
                                                {`${asw.isCorrect}`}
                                            </Typography>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
                    ))
                }
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose}>
                Close
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default QuizesDialog;

