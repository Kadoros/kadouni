"use client";
import {
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandItem,
  EditorContent,
  EditorRoot,
} from "novel";

const Editor = () => {
  return (
    <div>
      <EditorRoot>
        <EditorContent>
          <EditorCommand>
            {/* <EditorCommandItem />
            <EditorCommandItem />
            <EditorCommandItem /> */}
          </EditorCommand>
          {/* <EditorBubble>
            <EditorBubbleItem />
            <EditorBubbleItem />
            <EditorBubbleItem />
          </EditorBubble> */}
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default Editor;
