
interface Service {
  id: number;
  name: string;
}

interface Props {
  services: Service[];
  value: number[];
  onChange: (ids: number[]) => void;
}

export default function MultiSelect({ services, value, onChange }: Props) {
  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter(x => x !== id)); // удалить
    } else {
      onChange([...value, id]); // добавить
    }
  };

  return (
    <div style={styles.container}>
      {services.map((s) => (
        <div
          key={s.id}
          style={{
            ...styles.item,
            ...(value.includes(s.id) ? styles.selected : {}),
          }}
          onClick={() => toggle(s.id)}
        >
          <input
            type="checkbox"
            checked={value.includes(s.id)}
            readOnly
            style={{ marginRight: 8 }}
          />
          {s.name}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: 6,
    padding: 8,
    maxHeight: 200,
    overflowY: "auto",
    cursor: "pointer",
  },
  item: {
    padding: "6px 10px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  selected: {
    background: "#e7f3ff",
  },
} as const;