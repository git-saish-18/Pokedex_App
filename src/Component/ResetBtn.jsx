import "../CSS/Resetbtn.css";

const ResetButton = (props) => {
  return (
    <>
      <button onClick={props.reset} className="reset-button">
        <span> &#x21bb;</span>
      </button>
    </>
  );
};

export default ResetButton;
