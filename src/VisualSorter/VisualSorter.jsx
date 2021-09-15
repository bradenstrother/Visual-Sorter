import React from 'react';
import {
  getMergeSortAnimations
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './VisualSorter.css';

export default class VisualSorter extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    array: [],
  };
}

componentDidMount() {
  this.resetArray();
}

resetArray() {
  const array = [];
  for (let i = 0; i < 300; i++) {
    array.push(randomIntFromInterval(5, 730));
  }
  this.setState({
    array
  });
}

mergeSort() {
  const animations = getMergeSortAnimations(this.state.array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? 'white' : 'mediumpurple';
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * 3);
      // }
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * 3);
    }
  }
}

quickSort() {

}

heapSort() {

}

bubbleSort() {

}

testSortingAlgorithms() {
  for (let i = 0; i < 100; i++) {
    const array = [];
    const length = randomIntFromInterval(1, 1000);
    for (let i = 0; i < length; i++) {
      array.push(randomIntFromInterval(-1000, 1000));
    }
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    const mergeSortedArray = getMergeSortAnimations(array.slice());
    console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  }
}

render() {
  const {array} = this.state;

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div 
          className="array-bar" 
          key={idx}
          style={{
            backgroundColor: 'mediumpurple',
            height: `${value/16}em`,
          }}></div>
      ))}
      <button onClick={() => this.resetArray()}>Generate New Array</button>
      <button onClick={() => this.mergeSort()}>Merge Sort</button>
      <button onClick={() => this.quickSort()}>Quick Sort</button>
      <button onClick={() => this.heapSort()}>Heap Sort</button>
      <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
    </div>
    )
  }
}
// from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}