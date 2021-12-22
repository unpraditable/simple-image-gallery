import "./RadioButtonList.scss";

export default function RadioButtonList({ optionList }) {
  return (
    <div className="radio">
      <h4>{optionList.title}</h4>
      <ul className="radio__list">
        {optionList.items.length > 0 &&
          optionList.items.map((item, i) => {
            return (
              <li key={i}>
                <label>
                  <input
                    onChange={() => optionList.handleClick(item.value)}
                    type="radio"
                    name={optionList.title}
                    value={item.value}
                  />
                  {item.title}
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
