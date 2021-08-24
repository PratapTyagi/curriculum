import "./AllInfo.css";
const AllInfo = ({ currentList }) => {
  return (
    <div className="curriculum__lists">
      {currentList.map((data) => (
        <div className="curriculum__list">
          <div className="curriculum__list__buttons"></div>
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
