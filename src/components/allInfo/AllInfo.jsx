import React from "react";
import "./AllInfo.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  // Maintain Indexes
  const maintainIndex = (updatedList) => {
    return updatedList.map((item, i) => ({ ...item, id: i }));
  };

  // For deletion
  const deleteSection = (id, count) => {
    // Child sections to be deleted
    // Example: [0, 1] => [id, id]

    let output = currentList.filter(
      (item) => item.id === id || (item.id > id && item.count > count)
    );
    output = output.map((item) => item.id);

    // Removing those ids
    const tempCurrentList = [...currentList];
    let updatedList = tempCurrentList.filter(
      (item) => !output.includes(item.id)
    );

    // Maintain remaining one's id's

    updatedList = maintainIndex(updatedList);
    setCurrentList(updatedList);
  };

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
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          let tempCurrentList = [...currentList];
          tempCurrentList.splice(
            destination.index,
            0,
            tempCurrentList.splice(source.index, 1)[0]
          );
          tempCurrentList = maintainIndex(tempCurrentList);
          setCurrentList(tempCurrentList);
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {currentList.map((data, i) => (
                <Draggable
                  draggableId={`draggable-${data.id}`}
                  key={data.id}
                  index={i}
                >
                  {(provided, _) => (
                    <div
                      className="curriculum__list"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="curriculum__list__buttons">
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
                            deleteSection(data.id, data.count);
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AllInfo;
