type Props = {
  children: React.ReactNode;
  x?: number;
  y?: number;
  className?: string;
};

function ShiftBy({ children, x = 0, y = 0, className }: Props) {
  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default ShiftBy;
