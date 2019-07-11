import React, { useState, useEffect } from "react";
import { css } from "glamor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";
// eslint-disable-next-line
import _elementClosest from "element-closest";
import polyfill from "./element-closest-ie-polyfill";

polyfill();

/**
 *
 * setup
 *
 */

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

const textInputCss = css({
  width: "100%",
  boxSizing: "border-box"
});

const TextInput = ({ value, setValue }) => (
  <input
    value={value === null ? "" : value}
    onChange={e => setValue(e.target.value)}
    className={textInputCss}
  />
);

const NumberInput = ({ value, setValue }) => (
  <input
    type="number"
    min="0"
    value={value === null ? "" : value}
    onChange={e => setValue(e.target.value)}
    className={textInputCss}
  />
);

const schema = {
  types: {
    text: {
      input: TextInput
    },
    bool: {
      input: TextInput
    },
    number: {
      input: NumberInput
    },
    options: {
      input: TextInput
    }
  },
  filterTypesIndex: [
    "street",
    "streetNumber",
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
        isEqualTo: { text: "is equal to", type: "number", tail: "" },
        isNotEqualTo: { text: "is not equal to", type: "number", tail: "" },
        isLessThan: { text: "is less than", type: "number", tail: "" },
        isGreaterThan: { text: "is greater than", type: "number", tail: "" },
        isOdd: { text: "is odd", type: "absolute", tail: "" },
        isEven: { text: "is even", type: "absolute", tail: "" }
      },
      icon: "mailbox"
    },
    street: {
      text: "Street",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "map-signs"
    },
    suburb: {
      text: "Suburb",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "map-marked"
    },
    bedrooms: {
      text: "Bedrooms",
      methods: {
        isEqualTo: { text: "is equal to", type: "number", tail: "" },
        isNotEqualTo: { text: "is not equal to", type: "number", tail: "" },
        isLessThan: { text: "is less than", type: "number", tail: "" },
        isGreaterThan: { text: "is greater than", type: "number", tail: "" },
        isOdd: { text: "is odd", type: "absolute", tail: "" },
        isEven: { text: "is even", type: "absolute", tail: "" }
      },
      icon: "bed"
    },
    bathrooms: {
      text: "Bathrooms",
      methods: {
        isEqualTo: { text: "is equal to", type: "number", tail: "" },
        isNotEqualTo: { text: "is not equal to", type: "number", tail: "" },
        isLessThan: { text: "is less than", type: "number", tail: "" },
        isGreaterThan: { text: "is greater than", type: "number", tail: "" },
        isOdd: { text: "is odd", type: "absolute", tail: "" },
        isEven: { text: "is even", type: "absolute", tail: "" }
      },
      icon: "bath"
    },
    postcode: {
      text: "Postcode",
      methods: {
        isEqualTo: { text: "is equal to", type: "number", tail: "" },
        isNotEqualTo: { text: "is not equal to", type: "number", tail: "" },
        isLessThan: { text: "is less than", type: "number", tail: "" },
        isGreaterThan: { text: "is greater than", type: "number", tail: "" },
        isOdd: { text: "is odd", type: "absolute", tail: "" },
        isEven: { text: "is even", type: "absolute", tail: "" }
      },
      icon: "location"
    },
    owner: {
      text: "Owner",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "user-tie"
    },
    tenant: {
      text: "Tenant",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "user"
    },
    tags: {
      text: "Tags",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "tags"
    },
    appraisal: {
      text: "Appraisal",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "clipboard-list-check"
    },
    listing: {
      text: "Listing",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "toggle-on"
    },
    contract: {
      text: "Contract",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "file-signature"
    },
    user: {
      text: "User",
      methods: {
        is: { text: "is", type: "text", tail: "" },
        isNot: { text: "is not", type: "text", tail: "" },
        contains: { text: "contains", type: "text", tail: "" },
        doesNotContain: { text: "does not contain", type: "text", tail: "" },
        startsWith: { text: "starts with", type: "text", tail: "" },
        endsWith: { text: "ends with", type: "text", tail: "" },
        lengthIs: { text: "length is", type: "number", tail: "" }
      },
      icon: "user"
    }
  }
};

const initialState = [
  // {
  //   operand: "or",
  //   filters: [
  //     {
  //       type: "street",
  //       method: "is",
  //       value: ""
  //     }
  //   ]
  // }
];

/**
 *
 * functions
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

const newFilterGroup = type => {
  return {
    operand: "and",
    filters: [
      {
        type: type,
        method: Object.keys(schema.filterTypes[type].methods)[0],
        value: null
      }
    ]
  };
};

const serializeSegment = data => JSON.stringify(data);

/**
 *
 * components
 *
 */

const buttonResetCss = css({
  backgroundColor: "transparent",
  boxShadow: "none",
  cursor: "pointer",
  border: "none",
  fontSize: "0.9rem"
});

const roundedLeft = css({
  borderRadius: `${borderRadius} 0 0 ${borderRadius}`
});

const roundedRight = css({
  borderRadius: `0 ${borderRadius} ${borderRadius} 0`
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
  color: "#333",
  borderRadius,
  border: "1px solid #eee",
  boxShadow: "0.1rem 0.1rem 0.5rem rgba(0,0,0,0.1)",
  zIndex: 900
});

const flyoutOption = css({
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  padding: "0.5rem",
  cursor: "pointer",
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
      <div
        key={type}
        className={flyoutOption}
        onClick={e => {
          e.stopPropagation();
          addFilter(i, type);
        }}
      >
        <FontAwesomeIcon icon={schema.filterTypes[type].icon} />{" "}
        {schema.filterTypes[type].text}
      </div>
    ))}
    <div
      className={flyoutOption}
      onClick={e => {
        e.stopPropagation();
        done();
      }}
    >
      Done
    </div>
  </div>
);

const addFilterButtonCss = css({
  position: "relative",
  cursor: "pointer",
  float: "left",
  marginLeft: "0.1rem"
});

const addFilterButtonButtonCss = css({
  float: "left",
  padding: mainPadding,
  backgroundColor: "#fafafa",
  display: "inline-block"
});

const AddFilterButton = ({
  addFilter,
  i,
  addingFilterFlyoutOpen,
  setAddingFilterFlyoutOpen
}) => {
  return (
    <div className={classList(addFilterButtonCss, roundedRight)}>
      <div
        onClick={() => setAddingFilterFlyoutOpen(true)}
        className={classList(buttonResetCss, addFilterButtonButtonCss)}
      >
        <FontAwesomeIcon style={{ color: "#777" }} icon="plus" />
      </div>
      <div className={baselineCss}>
        {addingFilterFlyoutOpen && (
          <AddFilterFlyout
            addFilter={(i, type) => {
              setAddingFilterFlyoutOpen(false);
              addFilter(i, type);
            }}
            i={i}
            done={() => setAddingFilterFlyoutOpen(false)}
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

const editFilterFlyoutInputAreaCss = css({
  padding: `0 ${mainPadding} ${mainPadding} ${mainPadding}`
});

const EditFilterFlyout = ({ data, done, setValue, setMethod }) => {
  const filterSchema = schema.filterTypes[data.type];
  const { type } = filterSchema.methods[data.method];
  const Input = type !== "absolute" ? schema.types[type].input : null;
  return (
    <div className={classList(flyoutCss, editFilterFlyoutCss)}>
      {Object.keys(filterSchema.methods).map(method => (
        <React.Fragment key={method}>
          <div
            className={flyoutOption}
            data-method={method}
            onClick={e =>
              method !== data.method && setMethod(e.target.dataset.method)
            }
          >
            <input
              name="FiUt3gXEG2zBnuwA39NL"
              type="radio"
              data-method={method}
              checked={method === data.method}
              onChange={() => null}
            />{" "}
            {filterSchema.methods[method].text}
          </div>
          {data.method === method && type !== "absolute" && (
            <div className={editFilterFlyoutInputAreaCss}>
              <Input value={data.value} setValue={setValue} />
              {filterSchema.methods[method].tail}
            </div>
          )}
        </React.Fragment>
      ))}
      <div className={flyoutOption} onClick={done}>
        Done
      </div>
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
  cursor: "pointer",
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const filterButtonCss = css({
  float: "left",
  padding: mainPadding
});

const filterMethodCss = css({
  fontWeight: "400"
});

const filterMissingValueCss = css({
  backgroundColor: colorDangerLight,
  color: colorDanger
});

const FilterValue = ({ value }) => (
  <span>{value !== null ? value : <i>...</i>} </span>
);

const Filter = ({
  data,
  clientClassList,
  deleteFilter,
  setMethod,
  setValue,
  editingFilterFlyoutOpen,
  setEditingFilterFlyoutOpen
}) => {
  const filterSchema = schema.filterTypes[data.type];
  const absoluteMethod = filterSchema.methods[data.method].type === "absolute";
  const classes = [
    filterButtonCss,
    buttonResetCss,
    data.value === null && !absoluteMethod ? filterMissingValueCss : null,
    ...(clientClassList || [])
  ];
  return (
    <div className={filterCss}>
      <div
        className={classList(...classes)}
        onClick={
          !editingFilterFlyoutOpen
            ? () => setEditingFilterFlyoutOpen(true)
            : null
        }
      >
        <FontAwesomeIcon
          icon={filterSchema.icon}
          className={css({ paddingRight: mainPadding }).toString()}
        />
        {filterSchema.text}{" "}
        <span className={filterMethodCss}>
          {filterSchema.methods[data.method].text}
        </span>{" "}
        {!absoluteMethod && <FilterValue value={data.value} />}
        {filterSchema.methods[data.method].tail}
        <span
          className={css({ paddingLeft: mainPadding })}
          onClick={e => {
            e.stopPropagation();
            deleteFilter();
          }}
        >
          <FontAwesomeIcon icon="times" />
        </span>
        {editingFilterFlyoutOpen && (
          <div className={baselineCss}>
            <EditFilterFlyout
              setMethod={setMethod}
              setValue={setValue}
              data={data}
              done={e => {
                e.stopPropagation();
                setEditingFilterFlyoutOpen(false);
              }}
            />
          </div>
        )}
      </div>
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
  cursor: "pointer",
  ":hover": {
    backgroundColor: colorActionLight,
    color: colorAction
  }
});

const actionsCss = css({
  position: "relative",
  float: "left",
  padding: mainPadding,
  display: "inline-block",
  fontWeight: 700,
  cursor: "pointer",
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
  deleteFilter,
  setFilterMethod,
  setFilterValue,
  editingFilterFlyoutOpen,
  setEditingFilterFlyoutOpen
}) =>
  data.filters.map((filter, i) => (
    <React.Fragment key={i}>
      <Filter
        deleteFilter={() => deleteFilter(i)}
        setValue={value => setFilterValue(i, value !== "" ? value : null)}
        setMethod={method => setFilterMethod(i, method)}
        data={filter}
        clientClassList={i === 0 ? [roundedLeft] : null}
        editingFilterFlyoutOpen={editingFilterFlyoutOpen === i}
        setEditingFilterFlyoutOpen={state =>
          setEditingFilterFlyoutOpen(i, state)
        }
      />
      {i < data.filters.length - 1 && (
        <div
          className={classList(filterGroupOperandCss, buttonResetCss)}
          data-filter-group-index={filterGroupIndex}
          onClick={toggleFilterGroupOperand}
        >
          {data.operand}
        </div>
      )}
    </React.Fragment>
  ));

const AddFilter = ({
  setAddingFilterGroup,
  addingFilterGroup,
  addFilterGroup
}) => (
  <div
    onClick={() => setAddingFilterGroup(true)}
    className={classList(actionsCss, buttonResetCss)}
  >
    <FontAwesomeIcon icon="plus" /> Add Filter
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
  </div>
);

const Reset = ({ reset }) => (
  <div onClick={reset} className={classList(actionsCss, buttonResetCss)}>
    <FontAwesomeIcon icon="times-octagon" /> Reset
  </div>
);

const SaveSegment = ({ state }) => (
  <div
    onClick={() => console.log(serializeSegment(state))}
    className={classList(actionsCss, buttonResetCss)}
  >
    <FontAwesomeIcon icon="chart-pie-alt" /> Save Segment
  </div>
);

export default () => {
  const [filterGroups, setFilterGroups] = useState(initialState.slice());
  const [operand, setOperand] = useState("and");
  const [flyout, setFlyout] = useState(false);

  useEffect(() => {
    window.addEventListener("click", e => {
      //eslint-disable-next-line
      if (!e.target.closest("#jFsDjIPELQC8YK7d1QqW"))
        setFlyout({ type: "none" });
    });
  }, []);

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
    if (filterGroups[filterGroupIndex].filters.length === 1)
      setFilterGroup(filterGroupIndex, null);
    else setFilter(filterGroupIndex, filterIndex, null);
  };

  /**
   *
   * takes filter group index
   * if given data will update
   * if given null will delete
   *
   */
  const setFilterGroup = (filterGroupIndex, filterGroup) => {
    if (filterGroup === null)
      setFilterGroups(
        filterGroups.filter((_filterGroup, i) => i !== filterGroupIndex)
      );
    else
      setFilterGroups([
        ...filterGroups.slice(0, filterGroupIndex),
        filterGroup,
        ...filterGroups.slice(filterGroupIndex + 1)
      ]);
  };

  const addFilterGroup = type => {
    setFilterGroups([...filterGroups, newFilterGroup(type)]);
  };

  /**
   *
   * takes filter group index and filter index
   * if given data will update
   * if given null will delete
   *
   */
  const setFilter = (filterGroupIndex, filterIndex, filter) => {
    var filters = filterGroups[filterGroupIndex].filters.slice(0, filterIndex);
    if (filter !== null) filters.push(filter);
    filters = filters.concat(
      filterGroups[filterGroupIndex].filters.slice(filterIndex + 1)
    );
    setFilterGroup(filterGroupIndex, {
      ...filterGroups[filterGroupIndex],
      filters
    });
  };

  const setFilterValue = (filterGroupIndex, filterIndex, value) =>
    setFilter(filterGroupIndex, filterIndex, {
      ...filterGroups[filterGroupIndex].filters[filterIndex],
      value
    });

  const setFilterMethod = (filterGroupIndex, filterIndex, method) =>
    setFilter(filterGroupIndex, filterIndex, {
      ...filterGroups[filterGroupIndex].filters[filterIndex],
      value: null,
      method
    });

  const toggleGlobalOperand = () =>
    setOperand(operand === "and" ? "or" : "and");

  const toggleFilterGroupOperand = e => {
    const filterGroupIndex = e.target.dataset.filterGroupIndex;
    var newFilterGroups = filterGroups.slice(0);
    newFilterGroups[filterGroupIndex].operand =
      filterGroups[filterGroupIndex].operand === "and" ? "or" : "and";
    setFilterGroups(newFilterGroups);
  };

  return (
    <div id="jFsDjIPELQC8YK7d1QqW">
      {filterGroups.map((filterGroup, i) => (
        <div key={i} className={filterGroupCss}>
          <FilterGroup
            data={filterGroup}
            filterGroupIndex={i}
            toggleFilterGroupOperand={toggleFilterGroupOperand}
            setFilterValue={(j, value) => setFilterValue(i, j, value)}
            setFilterMethod={(j, value) => setFilterMethod(i, j, value)}
            deleteFilter={filterIndex => deleteFilter(i, filterIndex)}
            editingFilterFlyoutOpen={
              flyout.type === "editingFilter" && flyout.filterGroupIndex === i
                ? flyout.filterIndex
                : null
            }
            setEditingFilterFlyoutOpen={(j, state) =>
              setFlyout(
                state
                  ? {
                      type: "editingFilter",
                      filterGroupIndex: i,
                      filterIndex: j
                    }
                  : { type: "none" }
              )
            }
          />
          {i < filterGroups.length - 1 && (
            <div
              className={classList(globalOperandCss, buttonResetCss)}
              onClick={toggleGlobalOperand}
            >
              {operand}
            </div>
          )}
          <AddFilterButton
            addingFilterFlyoutOpen={
              flyout.type === "addingFilter" && flyout.filterGroupIndex === i
            }
            setAddingFilterFlyoutOpen={state =>
              setFlyout(
                state
                  ? { type: "addingFilter", filterGroupIndex: i }
                  : { type: "none" }
              )
            }
            addFilter={addFilter}
            i={i}
          />
        </div>
      ))}
      <AddFilter
        setAddingFilterGroup={state =>
          setFlyout(state ? { type: "addingFilterGroup" } : { type: "none" })
        }
        addingFilterGroup={flyout.type === "addingFilterGroup"}
        addFilterGroup={addFilterGroup}
      />
      <Reset reset={() => setFilterGroups(initialState.slice())} />
      <SaveSegment state={{ operand, filterGroups }} />
    </div>
  );
};
