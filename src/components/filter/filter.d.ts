import { EqualityCheck } from "../../utils/utils";

type FilterProps = {
  rule: any[];
  layer?: string;
} & EqualityCheck;

export function Filter(props: FilterProps): JSX.Element;
