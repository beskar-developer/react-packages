export interface Props {
  count: number;
  min?: number;
  max?: number;
  onCountChange: React.Dispatch<React.SetStateAction<number>>;
}
