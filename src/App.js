import React, { useState } from "react";
import { css } from "glamor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";

library.add(fas);

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
  filterTypesIndex: [
    "street",
    "suburb",
    "bedrooms",
    "bathrooms",
    "postcode",
    "owner",
    "tenant",
    "tags",
    "appraisal",
    "listing",
    "contract",
    "user"
  ],
  filterTypes: {
    streetNumber: {
      text: "Street Number",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "mailbox"
    },
    street: {
      text: "Street",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "map-signs"
    },
    suburb: {
      text: "Suburb",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "map-marked"
    },
    bedrooms: {
      text: "Bedrooms",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "bed"
    },
    bathrooms: {
      text: "Bathrooms",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "bath"
    },
    postcode: {
      text: "Postcode",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "location"
    },
    owner: {
      text: "Owner",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "user-tie"
    },
    tenant: {
      text: "Tenant",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "user"
    },
    tags: {
      text: "Tags",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "tags"
    },
    appraisal: {
      text: "Appraisal",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "clipboard-list-check"
    },
    listing: {
      text: "Listing",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "toggle-on"
    },
    contract: {
      text: "Contract",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "file-signature"
    },
    user: {
      text: "User",
      methods: {
        is: { text: "is", type: "text" },
        isNot: { text: "is not", type: "text" },
        length: { text: "length", type: "number" }
      },
      icon: "user"
    }
  }
};

const initialState = [
  {
    operand: "or",
    filters: [
      {
        type: "street",
        method: "is",
        value: "test address"
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
  return classes.join(" ");
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

const filterMissingValueCss = css({
  backgroundColor: colorDangerLight,
  color: colorDanger
});

const baselineCss = css({
  position: "absolute",
  height: 0,
  bottom: 0,
  left: 0,
  right: 0
});

const flyoutCss = css({
  backgroundColor: "#fafafa",
  borderRadius,
  border: "1px solid #eee",
  boxShadow: "0.1rem 0.1rem 0.5rem rgba(0,0,0,0.1)"
});

const flyoutOption = css({
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  padding: "0.5rem",
  ":hover": {
    backgroundColor: "#eee"
  }
});

const addFilterFlyoutCss = css({
  position: "relative",
  float: "left",
  width: 200,
  top: "0.5rem",
  left: 0
});

const AddFilterFlyout = ({ addFilter, i, done }) => (
  <div className={classList(flyoutCss, addFilterFlyoutCss)}>
    {schema.filterTypesIndex.map(type => (
      <button
        className={classList(buttonResetCss, flyoutOption)}
        onClick={() => addFilter(i, type)}
      >
        <FontAwesomeIcon icon={schema.filterTypes[type].icon} />{" "}
        {schema.filterTypes[type].text}
      </button>
    ))}
    <button className={classList(buttonResetCss, flyoutOption)} onClick={done}>
      Done
    </button>
  </div>
);

const addFilterButtonCss = css({
  position: "relative",
  float: "left"
});

const addFilterButtonButtonCss = css({
  float: "left",
  padding: mainPadding,
  backgroundColor: "#fafafa",
  display: "inline-block",
  marginLeft: "0.1rem"
});

const AddFilterButton = ({ addFilter, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={addFilterButtonCss}>
      <button
        onClick={() => setOpen(true)}
        className={classList(buttonResetCss, addFilterButtonButtonCss)}
      >
        +
      </button>
      <div className={baselineCss}>
        {open && (
          <AddFilterFlyout
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

const editFilterFlyoutCss = css({
  textAlign: "left",
  width: 200,
  position: "absolute",
  top: "0.5rem",
  left: 0
});

const EditFilterFlyout = ({ data, done }) => {
  return (
    <div className={classList(flyoutCss, editFilterFlyoutCss)}>
      {Object.keys(schema.filterTypes[data.type].methods).map(method => (
        <div className={flyoutOption}>
          <input type="radio" />{" "}
          {schema.filterTypes[data.type].methods[method].text}
        </div>
      ))}
      <button
        className={classList(buttonResetCss, flyoutOption)}
        onClick={done}
      >
        Done
      </button>
    </div>
  );
};

const filterCss = css({
  position: "relative",
  float: "left",
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

const filterButtonCss = css({
  float: "left",
  padding: mainPadding
});

const Filter = ({ data, clientClassList, deleteFilter }) => {
  const [editing, setEditing] = useState(false);
  const filterSchema = schema.filterTypes[data.type];
  const classes = [
    filterButtonCss,
    buttonResetCss,
    data.value === null ? filterMissingValueCss : null,
    ...(clientClassList || [])
  ];
  return (
    <div className={filterCss}>
      <button
        className={classList(...classes)}
        onClick={() => setEditing(true)}
      >
        <FontAwesomeIcon
          icon={filterSchema.icon}
          className={css({ paddingRight: mainPadding }).toString()}
        />
        {filterSchema.text}{" "}
        <span className={filterMethodCss}>
          {filterSchema.methods[data.method].text}
        </span>{" "}
        {data.value !== null ? data.value : <u>missing value</u>}
        <span
          className={css({ paddingLeft: mainPadding })}
          onClick={e => {
            e.stopPropagation();
            deleteFilter();
          }}
        >
          <FontAwesomeIcon icon="times" />
        </span>
        {editing && (
          <div className={baselineCss}>
            <EditFilterFlyout
              data={data}
              done={() => {
                console.log("wraar", setEditing);
                setEditing(false);
              }}
            />
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

const FilterGroup = ({
  data,
  filterGroupIndex,
  toggleFilterGroupOperand,
  deleteFilter
}) =>
  data.filters.map((filter, i) => (
    <React.Fragment>
      <Filter
        deleteFilter={() => deleteFilter(i)}
        data={filter}
        clientClassList={i === 0 ? [roundedLeft] : null}
      />
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

const saveSegment = state => console.log(JSON.stringify(state));

export default () => {
  const [filterGroups, setFilterGroups] = useState(initialState);
  const [operand, setOperand] = useState("and");
  const [addingFilterGroup, setAddingFilterGroup] = useState(false);

  const addFilter = (filterGroupIndex, type) => {
    var newFilterGroups = filterGroups.slice(0);
    newFilterGroups[filterGroupIndex].filters.push({
      type: type,
      method: Object.keys(schema.filterTypes[type].methods)[0],
      value: null
    });
    setFilterGroups(newFilterGroups);
  };

  const deleteFilter = (filterGroupIndex, filterIndex) => {
    setFilterGroups([
      ...filterGroups.slice(0, filterGroupIndex),
      ...(filterGroups[filterGroupIndex].filters.length === 1
        ? []
        : [
            {
              ...filterGroups[filterGroupIndex],
              filters: filterGroups[filterGroupIndex].filters.filter(
                (filter, i) => i !== filterIndex
              )
            }
          ]),
      ...filterGroups.slice(filterGroupIndex + 1)
    ]);
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
          deleteFilter={filterIndex => deleteFilter(i, filterIndex)}
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
      onClick={() => setAddingFilterGroup(true)}
      className={classList(addFilterGroupCss, buttonResetCss)}
    >
      + Add Filter
      {addingFilterGroup && (
        <div className={baselineCss}>
          <AddFilterFlyout
            addFilter={(_i, type) => {
              setAddingFilterGroup(false);
              addFilterGroup(type);
            }}
            done={() => setAddingFilterGroup(false)}
          />
        </div>
      )}
    </button>,
    <button
      onClick={() => saveSegment({ filterGroups, operand })}
      className={classList(addFilterGroupCss, buttonResetCss)}
    >
      <FontAwesomeIcon icon="chart-pie" /> Save Segment
    </button>
  ];
};
