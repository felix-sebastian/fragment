import React, { useState } from "react";
import { css } from "glamor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * config
 *
 */

const mainPadding = "0.7rem";
const borderRadius = "0.2rem";
const colorDanger = "#f33";
const colorDangerLight = "#fdd";
const colorAction = "#33f";
const colorActionLight = "#ddf";

const schema = {
  types: { text: {}, bool: {}, number: {}, options: {} },
  fragments: {
    address: {
      text: "Address",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: faHome
    }
  }
};

const initialState = [
  {
    operand: "or",
    fragments: [
      {
        type: "address",
        method: "is",
        value: "ajhadw"
      },
      {
        type: "address",
        method: "isNot",
        value: "wakka wakka"
      }
    ]
  },
  {
    operand: "and",
    fragments: [
      {
        type: "address",
        method: "is",
        value: "hello der"
      }
    ]
  },

  {
    operand: "or",
    fragments: [
      {
        type: "address",
        method: "length",
        value: 3
      }
    ]
  }
];

/**
 *
 * app
 *
 */

const fragmentCss = css({
  float: "left"
});

const fragmentMainCss = css({
  padding: mainPadding,
  borderRadius: borderRadius,
  backgroundColor: "#eee",
  display: "inline-block",
  color: "#333",
  boxShadow: "none",
  border: "none",
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const fragmentFilterCss = css({
  fontWeight: "300"
});

const addFragmentCss = css({
  float: "right"
});

const addFragmentButtonCss = css({
  float: "left",
  padding: mainPadding,
  borderRadius: borderRadius,
  backgroundColor: "#fafafa",
  display: "inline-block",
  border: "none",
  boxShadow: "none",
  marginLeft: "0.1rem"
});

const fragmentMissingValueCss = css({
  backgroundColor: colorDangerLight,
  color: colorDanger
});

const AddFragmentWindow = ({ addFragment, i }) => (
  <div>
    <button onClick={() => addFragment(i, "address")}>Add</button>
  </div>
);

const AddFragment = ({ addFragment, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={addFragmentCss}>
      <button onClick={() => setOpen(true)} className={addFragmentButtonCss}>
        +
      </button>
      {open && (
        <AddFragmentWindow
          addFragment={(i, type) => {
            setOpen(false);
            addFragment(i, type);
          }}
          i={i}
        />
      )}
    </div>
  );
};

const Fragment = ({ data }) => {
  const fragmentSchema = schema.fragments[data.type];
  return (
    <div className={fragmentCss}>
      <button
        className={`${fragmentMainCss} ${
          data.value === null ? fragmentMissingValueCss : ""
        }`}
      >
        <FontAwesomeIcon icon={fragmentSchema.icon} /> {fragmentSchema.text}
        <span className={fragmentFilterCss}>
          {" "}
          {fragmentSchema.methods[data.method].text}
        </span>{" "}
        {data.value !== null ? data.value : "missing value"}
      </button>
    </div>
  );
};

const globalOperandCss = css({
  float: "right",
  padding: mainPadding,
  borderRadius: borderRadius,
  display: "inline-block",
  background: "none",
  border: "none",
  boxShadow: "none",
  fontWeight: 700,
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const blockOperandCss = css({
  float: "left",
  padding: mainPadding,
  margin: "0 0.1rem",
  display: "inline-block",
  background: "#eee",
  border: "none",
  boxShadow: "none",
  fontWeight: 700,
  color: "#777",
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const addBlockCss = css({
  float: "left",
  padding: mainPadding,
  borderRadius: borderRadius,
  display: "inline-block",
  background: "none",
  border: "none",
  boxShadow: "none",
  fontWeight: 700,
  color: colorAction
});

const blockCss = css({
  float: "left",
  display: "inline-block"
});

const Block = ({ data, blockIndex, toggleBlockOperand }) =>
  data.fragments.map((fragment, i) => (
    <React.Fragment>
      <Fragment data={fragment} />
      {i < data.fragments.length - 1 && (
        <button
          className={blockOperandCss}
          data-block-index={blockIndex}
          onClick={toggleBlockOperand}
        >
          {data.operand}
        </button>
      )}
    </React.Fragment>
  ));

export default () => {
  const [blocks, setBlocks] = useState(initialState);
  const [operand, setOperand] = useState("and");

  const addFragment = (blockIndex, type) => {
    var newBlocks = blocks.slice(0);
    newBlocks[blockIndex].fragments.push({
      type: type,
      method: Object.keys(schema.fragments[type].methods)[0],
      value: null
    });
    setBlocks(newBlocks);
  };

  const addBlock = () => {
    setBlocks([
      ...blocks,
      {
        operand: "and",
        fragments: [{ type: "address", method: "is", value: "test address" }]
      }
    ]);
  };

  const toggleGlobalOperand = () =>
    setOperand(operand === "and" ? "or" : "and");

  const toggleBlockOperand = e => {
    const blockIndex = e.target.dataset.blockIndex;
    var newBlocks = blocks.slice(0);
    newBlocks[blockIndex].operand =
      blocks[blockIndex].operand === "and" ? "or" : "and";
    setBlocks(newBlocks);
  };

  return [
    blocks.map((block, i) => (
      <div className={blockCss}>
        <Block
          data={block}
          blockIndex={i}
          toggleBlockOperand={toggleBlockOperand}
        />
        {i < blocks.length - 1 && (
          <button className={globalOperandCss} onClick={toggleGlobalOperand}>
            {operand}
          </button>
        )}
        <AddFragment addFragment={addFragment} i={i} />
      </div>
    )),
    <button onClick={addBlock} className={addBlockCss}>
      + Add Block
    </button>
  ];
};
