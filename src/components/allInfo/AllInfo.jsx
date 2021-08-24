import "./AllInfo.css";
import { BsArrowsMove, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";

const AllInfo = ({ currentList, setCurrentList }) => {
  // For outdent
  const decrementCount = (id) => {
    currentList.filter((item) => {
      if (item.id === id) {
        const tempCurrentList = [...currentList];
        const tempCurrentItem = { ...tempCurrentList[id] };
        if (tempCurrentItem.count > 0) {
          tempCurrentItem.count -= 1;
        }
        tempCurrentList[id] = tempCurrentItem;
        setCurrentList(tempCurrentList);
        return item;
      }
      return item;
    });
  };

  // For indent
  const incrementCount = (id) => {
    currentList.filter((item) => {
      if (item.id === id) {
        const tempCurrentList = [...currentList];
        const tempCurrentItem = { ...tempCurrentList[id] };
        if (tempCurrentItem.count < 2) {
          tempCurrentItem.count += 1;
        }
        tempCurrentList[id] = tempCurrentItem;
        setCurrentList(tempCurrentList);
        return item;
      }
      return item;
    });
  };

  // For deletion
  const deleteSection = (id) => {};

  // For edit
  const editSection = (id) => {
    const description = prompt("Enter section's description");
    if (!description) {
      return;
    }
    currentList.filter((item) => {
      if (item.id === id) {
        const tempCurrentList = [...currentList];
        const tempCurrentItem = { ...tempCurrentList[id] };
        tempCurrentItem.description = description;
        tempCurrentList[id] = tempCurrentItem;
        setCurrentList(tempCurrentList);
        return item;
      }
      return item;
    });
  };

  return (
    <div className="curriculum__lists">
      {currentList.map((data) => (
        <div key={data.id} className="curriculum__list">
          <div className="curriculum__list__buttons">
            <BsArrowsMove className="curriculum__list_icons" />
            <BsArrowLeft
              onClick={(e) => {
                e.preventDefault();
                decrementCount(data.id);
              }}
              className="curriculum__list_icons"
            />
            <BsArrowRight
              onClick={(e) => {
                e.preventDefault();
                incrementCount(data.id);
              }}
              className="curriculum__list_icons"
            />
            <CgTrash
              onClick={(e) => {
                e.preventDefault();
                deleteSection(data.id);
              }}
              className="curriculum__list_icons"
            />
            <AiFillEdit
              onClick={(e) => {
                e.preventDefault();
                editSection(data.id);
              }}
              className="curriculum__list_icons"
            />
          </div>
          <div
            className={`curriculum__list__description ${
              data.count === 0
                ? "main"
                : data.count === 1
                ? "first__child"
                : "second__child"
            }`}
          >
            {data.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllInfo;
