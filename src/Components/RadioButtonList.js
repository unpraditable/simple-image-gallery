export default function RadioButtonList({ optionList }) {
  return (
    <div>
      <h4>{optionList.title}</h4>
      <ul className="settings">
        {optionList.items.length > 0 &&
          optionList.items.map((item) => {
            return (
              <li>
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
