
"use client"

import ReactFlow, {
  ConnectionLineType,
  NodeOrigin,
  Node,
  OnConnectEnd,
  OnConnectStart,
  useReactFlow,
  useStoreApi,
  Controls,
  Panel,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import DocEditorComp from '@/components/DocEditor/DocEditor';
import DocEditorcomponent from '@/components/DocEditor/DocEditor';
import Goingbackbtn from '@/components/GoBack/Goingbackbtn';

function Editor() {
  return (
    <div>

        <div
        style={{
          position: "fixed",
          backgroundColor: "white",
          width: "1000000px",
          height: "10000000px",
          marginTop: "-1000px",
          marginLeft: "-10000px",
        }}
        >
        </div>

        <div style={{zIndex:'9999', position:'sticky'}}>
            <DocEditorcomponent />
        </div>

    </div>
  );
}

// wrapping with ReactFlowProvider is done outside of the component
function FlowWithProvider() {

  return (
    <ReactFlowProvider>
      <Editor />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;
















