const Pagination = (props) => {
  return (
    <>
      <div className="paginationBtn">
        <button
          type="button"
          onClick={() => {
            props.Count === 0
              ? props.setCount(0)
              : props.setCount(props.Count - 20);
          }}
          className="pagination-btn"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => {
            props.setCount(props.Count + 20);
          }}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
