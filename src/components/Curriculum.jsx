import { useEffect, useState } from "react";

import "./Curriculum.css";
import AllInfo from "./allInfo/AllInfo";
import { AiFillFolderAdd } from "react-icons/ai";

import { getList, setList } from "./data";

const Curriculum = () => {
  const [currentList, setCurrentList] = useState([]);

  // For initial render on screen
  useEffect(() => {
    setCurrentList(getList());
  }, []);

  // For setting current list on change
  useEffect(() => {
    return setList(currentList);
  }, [currentList]);

  // Add section event
  const addSection = () => {
    const description = prompt("Description");
    if (!description) {
      return;
    }
    const newObject = {
      id:
        currentList.length <= 0
          ? 0
          : currentList[currentList.length - 1]?.id + 1,
      description: description,
      count: 0,
    };
    currentList
      ? setCurrentList([...currentList, newObject])
      : setCurrentList([newObject]);
  };

  return (
    <div className="curriculum">
      <h4>Mathematics</h4>
      <hr />
      <div className="curriculum__static">
        <div className="curriculum__static__left">
          <h5>Actions</h5>
          <p>Move, Indent</p>
          <p>Outdent, Delete</p>
        </div>
        <div className="curriculum__static__right">
          <h5>Standard</h5>
          <p>The text of the standard</p>
        </div>
      </div>
      <hr style={{ marginBottom: "0px" }} />
      <AllInfo currentList={currentList} setCurrentList={setCurrentList} />
      <button onClick={addSection}>
        <AiFillFolderAdd
          style={{
            fontSize: "15px",
            marginTop: "2px",
            marginBottom: 0,
            marginRight: "10px",
          }}
        />
        Add Section
      </button>
    </div>
  );
};

export default Curriculum;
