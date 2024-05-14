
import { setValuesandAdd } from '.';
import { setFocusNode } from './FocusNode';

//focuses on the node of the index we get from midNode function
export function FocusToNode(index: number) {
  //Focuses the prompt node on the screen so user knows what to do
  setTimeout(() => {
    setFocusNode(index, 1);
    document.getElementById('focus1')?.click()
  }, 1000);
}                                
  
//finds the middle node so we can focus the viewport to it once the keywords are extracted
export function midNode(arr: number[]): number {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const midIndex = Math.floor(sortedArr.length / 2);
  return sortedArr[midIndex - (sortedArr.length % 2 === 0 ? 1 : 0)];
}

//Prompt node
interface Node {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: { label: string };
  style?: { backgroundColor: string; color: string };
  draggable?: boolean;
}
export const initialNodes: Node[] = [
  {
    id: "prompt",
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { label: "1" },
    style: { backgroundColor: "#6ede87", color: "white" },
    draggable: true
  }
];

//wire definition
export const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: 'to the', animated: true },
];

