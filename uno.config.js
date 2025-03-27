import { defineConfig } from 'unocss';

export default defineConfig({
  shortcuts: {
    screen: 'w-screen h-screen',
    'flex-center': 'flex justify-center',
    'flex-center-center': 'flex justify-center items-center',
    'flex-center-end': 'flex justify-center items-end',
    'flex-start-center': 'flex justify-start items-center',
    'flex-start-end': 'flex justify-start items-end',
    'flex-end': 'flex justify-end',
    'flex-end-center': 'flex justify-end items-center',
    'flex-end-end': 'flex justify-end items-end',
    'flex-between': 'flex justify-between',
    'flex-between-center': 'flex justify-between items-center',
    'flex-around': 'flex justify-around',
    'flex-around-center': 'flex justify-around items-center',
    'flex-column': 'flex flex-col',
    'flex-column-center': 'flex flex-col items-center',
    'flex-column-start-end': 'flex flex-col justify-start items-end',
    'flex-column-center-start': 'flex flex-col justify-center items-start',
    'flex-column-center-center': 'flex flex-col justify-center items-center',
    'flex-column-center-end': 'flex flex-col justify-center items-end',
    'flex-column-end-start': 'flex flex-col justify-end items-start',
    'flex-column-end-center': 'flex flex-col justify-end items-center',
    'flex-column-end-end': 'flex flex-col justify-end items-end'
  }
});
