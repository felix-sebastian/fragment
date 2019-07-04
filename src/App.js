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
const colorDanger = "#f55";
const colorDangerLight = "#fdd";
const colorAction = "#55f";
const colorActionLight = "#ddf";

const schema = {
  types: { text: {}, bool: {}, number: {}, options: {} },
  filterTypesIndex: ["address", "firstName", "lastName"],
  filterTypes: {
    address: {
      text: "Address",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: faHome
    },
    firstName: {
      text: "First Name",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: faHome
    },
    lastName: {
      text: "Last Name",
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
    filters: [
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
    filters: [
      {
        type: "address",
        method: "is",
        value: "hello der"
      }
    ]
  },
  {
    operand: "or",
    filters: [
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

function classList() {
  var classes = Array.prototype.slice
    .call(arguments)
    .filter(
      className => className !== null && typeof className !== typeof undefined
    )
    .map(css => css.toString());
  var result = classes.join(" ");
  return result;
}

const buttonResetCss = css({
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "none"
});

const roundedLeft = css({
  borderRadius: `${borderRadius} 0 0 ${borderRadius}`
});

const roundedRight = css({
  borderRadius: `0 ${borderRadius} ${borderRadius} 0`
});

const filterMethodCss = css({
  fontWeight: "400"
});

const addFilterButtonCss = css({
  float: "left",
  padding: mainPadding,
  backgroundColor: "#fafafa",
  display: "inline-block",
  marginLeft: "0.1rem"
});

const filterMissingValueCss = css({
  backgroundColor: colorDangerLight,
  color: colorDanger
});

const baselineCss = css({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0
});

const addFilterCss = css({
  position: "absolute",
  width: 200,
  backgroundColor: "#fff",
  border: "1px solid #333",
  top: "0.5rem",
  left: 0
});

const AddFilterOptionCss = css({
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "0.5rem",
  ":hover": {
    backgroundColor: "#fafafa"
  }
});

const AddFilter = ({ addFilter, i, done }) => (
  <div className={addFilterCss}>
    {schema.filterTypesIndex.map(type => (
      <button
        className={classList(buttonResetCss, AddFilterOptionCss)}
        onClick={() => addFilter(i, type)}
      >
        <FontAwesomeIcon icon={schema.filterTypes[type].icon} />{" "}
        {schema.filterTypes[type].text}
      </button>
    ))}
    <button
      className={classList(buttonResetCss, AddFilterOptionCss)}
      onClick={done}
    >
      Done
    </button>
  </div>
);

const AddFilterButton = ({ addFilter, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={buttonResetCss}>
      <button
        onClick={() => setOpen(true)}
        className={classList(buttonResetCss, addFilterButtonCss)}
      >
        +
      </button>
      <div className={baselineCss}>
        {open && (
          <AddFilter
            addFilter={(i, type) => {
              setOpen(false);
              addFilter(i, type);
            }}
            i={i}
            done={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

const editFilterCss = css({
  textAlign: "left",
  width: 200,
  position: "absolute",
  top: 0,
  left: 0
});

const EditFilter = ({ data }) => <div className={editFilterCss}>Hi</div>;

const filterCss = css({
  float: "left"
});

const filterButtonCss = css({
  position: "relative",
  padding: mainPadding,
  fontWeight: 600,
  backgroundColor: "#eee",
  display: "inline-block",
  border: "none",
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const Filter = ({ data }) => {
  const [editing, setEditing] = useState(false);
  const filterSchema = schema.filterTypes[data.type];
  return (
    <div className={filterCss}>
      <button
        className={classList(
          filterButtonCss,
          buttonResetCss,
          data.value === null ? filterMissingValueCss : null
        )}
        onClick={() => setEditing(true)}
      >
        <FontAwesomeIcon icon={filterSchema.icon} /> {filterSchema.text}
        <span className={filterMethodCss}>
          {" "}
          {filterSchema.methods[data.method].text}
        </span>{" "}
        {data.value !== null ? data.value : "missing value"}
        {editing && (
          <div className={baselineCss}>
            <EditFilter />
          </div>
        )}
      </button>
    </div>
  );
};

const globalOperandCss = css({
  float: "right",
  padding: mainPadding,
  display: "inline-block",
  fontWeight: 700,
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const filterGroupOperandCss = css({
  float: "left",
  padding: mainPadding,
  margin: "0 0.1rem",
  display: "inline-block",
  background: "#eee",
  fontWeight: 700,
  color: "#777",
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const addFilterGroupCss = css({
  float: "left",
  padding: mainPadding,
  display: "inline-block",
  fontWeight: 700,
  color: colorAction
});

const filterGroupCss = css({
  float: "left",
  display: "inline-block"
});

const FilterGroup = ({ data, filterGroupIndex, toggleFilterGroupOperand }) =>
  data.filters.map((filter, i) => (
    <React.Fragment>
      <Filter data={filter} />
      {i < data.filters.length - 1 && (
        <button
          className={classList(filterGroupOperandCss, buttonResetCss)}
          data-filter-group-index={filterGroupIndex}
          onClick={toggleFilterGroupOperand}
        >
          {data.operand}
        </button>
      )}
    </React.Fragment>
  ));

const serializeSegment = state => JSON.stringify(state);

export default () => {
  const [filterGroups, setFilterGroups] = useState(initialState);
  const [operand, setOperand] = useState("and");

  const addFilter = (filterGroupIndex, type) => {
    var newFilterGroups = filterGroups.slice(0);
    newFilterGroups[filterGroupIndex].filters.push({
      type: type,
      method: Object.keys(schema.filterTypes[type].methods)[0],
      value: null
    });
    setFilterGroups(newFilterGroups);
  };

  const addFilterGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        operand: "and",
        filters: [
          {
            type: schema.filterTypesIndex[0],
            method: Object.keys(
              schema.filterTypes[schema.filterTypesIndex[0]].methods
            )[0],
            value: null
          }
        ]
      }
    ]);
  };

  const toggleGlobalOperand = () =>
    setOperand(operand === "and" ? "or" : "and");

  const toggleFilterGroupOperand = e => {
    const filterGroupIndex = e.target.dataset.filterGroupIndex;
    var newFilterGroups = filterGroups.slice(0);
    newFilterGroups[filterGroupIndex].operand =
      filterGroups[filterGroupIndex].operand === "and" ? "or" : "and";
    setFilterGroups(newFilterGroups);
  };

  return [
    filterGroups.map((filterGroup, i) => (
      <div className={filterGroupCss}>
        <FilterGroup
          data={filterGroup}
          filterGroupIndex={i}
          toggleFilterGroupOperand={toggleFilterGroupOperand}
        />
        {i < filterGroups.length - 1 && (
          <button
            className={classList(globalOperandCss, buttonResetCss)}
            onClick={toggleGlobalOperand}
          >
            {operand}
          </button>
        )}
        <AddFilterButton addFilter={addFilter} i={i} />
      </div>
    )),
    <button
      onClick={addFilterGroup}
      className={classList(addFilterGroupCss, buttonResetCss)}
    >
      + Add Filter
    </button>
  ];
};
