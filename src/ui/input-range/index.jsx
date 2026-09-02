import { getTrackBackground, Range } from "react-range";

const InputRange = ({ STEP = 1, MIN = 0, MAX = 3000, values = [0, 3000], handleChanges }) => {
  const safeMin = Number(MIN) || 0;
  const rawMax = Number(MAX) || 3000;
  const safeMax = Math.max(rawMax, (values && values[1]) ? Number(values[1]) : 3000, safeMin + 10);
  
  const val0 = (values && values[0] !== undefined) ? Math.max(safeMin, Math.min(Number(values[0]), safeMax)) : safeMin;
  const val1 = (values && values[1] !== undefined) ? Math.max(val0, Math.min(Number(values[1]), safeMax)) : safeMax;
  const safeValues = [val0, val1];

  return (
    <>
      <Range
        step={STEP || 1}
        min={safeMin}
        max={safeMax}
        values={safeValues}
        onChange={(vals) => handleChanges && handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '3px',
              width: '100%',
              background: getTrackBackground({
                values: safeValues,
                colors: ["#EDEDED", "#0989FF", "#EDEDED"],
                min: safeMin,
                max: safeMax
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '17px',
              width: '5px',
              backgroundColor: '#0989FF'
            }}
          />
        )}
      />
    </>
  );
};


export default InputRange;
