
const SelectMode = ({ onChange, selectedMode, selectModeMap }) => (
    <select value={selectedMode} onChange={ e => onChange(e.target.value)}>
        {
            Object.keys(selectModeMap).map((key) => (
                <option value={key}>{selectModeMap[key]}</option>
            ))
        }
    </select>
)

export default SelectMode;
