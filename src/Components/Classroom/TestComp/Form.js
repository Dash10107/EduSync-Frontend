import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Form = ({ question, ind, updateUserAnswers,isSubmitted }) => {
  const handleRadioChange = (event) => {
    const selectedAnswer = event.target.value;
    updateUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [ind]: selectedAnswer,
    }));
  };
  return (
    <>
      <div className='border-2 p-6 lg:p-8 rounded-lg my-8'>
      <FormControl>
      <FormLabel id="demo-customized-radios" className='mb-2'>
        <span className='text-gray-700 lg:text-xl text-lg xl:text-2xl font-medium'>{ind} </span>
        <span className='text-gray-700 lg:text-xl text-lg xl:text-2xl font-medium'>{question?.questionText} </span>
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        className='my-2 lg:my-4 xl:my-6 mx-4 lg:mx-6 '
        >
        {question?.options?.map((option)=>{
          return(
          <FormControlLabel 
            key={option}
            className='my-1'             
            value={option}
            control={<BpRadio onChange={handleRadioChange} />}
             label={<span className='text-sm lg:text-lg xl:text-xl'>{option}</span>} />)
       
        })}
      </RadioGroup>
    </FormControl>
          </div>
    </>
  )
}
export default Form
